import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { z } from "zod"

const contentUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  type: z.enum(["BLOG", "PROJECT", "EXPERIENCE", "TESTIMONIAL", "PAGE", "CONFIG"]).optional(),
  status: z.enum(["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED", "ARCHIVED"]).optional(),
  featured: z.boolean().optional(),
  metadata: z.record(z.any()).optional(),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  versionNote: z.string().optional(),
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const content = await prisma.content.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        tags: true,
        media: true,
        versions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const content = await prisma.content.findUnique({
      where: {
        id: params.id,
      },
      include: {
        tags: true,
      },
    })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Check permissions
    if (content.authorId !== session.user.id && session.user.role !== "ADMIN" && session.user.role !== "EDITOR") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const json = await req.json()
    const body = contentUpdateSchema.parse(json)

    // Check if slug is being changed and if it's already in use
    if (body.slug && body.slug !== content.slug) {
      const existingContent = await prisma.content.findUnique({
        where: {
          slug: body.slug,
        },
      })

      if (existingContent && existingContent.id !== params.id) {
        return NextResponse.json({ error: "Content with this slug already exists" }, { status: 400 })
      }
    }

    // Create a version before updating
    await prisma.version.create({
      data: {
        contentId: content.id,
        data: {
          title: content.title,
          slug: content.slug,
          description: content.description,
          content: content.content,
          type: content.type,
          status: content.status,
          featured: content.featured,
          metadata: content.metadata,
        },
        note: body.versionNote || "Update",
      },
    })

    // Handle status change to PUBLISHED
    const isPublishing = body.status === "PUBLISHED" && content.status !== "PUBLISHED"

    // Update the content
    const updatedContent = await prisma.content.update({
      where: {
        id: params.id,
      },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.content && { content: body.content }),
        ...(body.type && { type: body.type }),
        ...(body.status && { status: body.status }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.metadata && { metadata: body.metadata }),
        ...(body.categoryId !== undefined && {
          category: body.categoryId
            ? {
                connect: {
                  id: body.categoryId,
                },
              }
            : {
                disconnect: true,
              },
        }),
        ...(isPublishing && { publishedAt: new Date() }),
        ...(body.publishedAt !== undefined && {
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        }),
      },
      include: {
        tags: true,
      },
    })

    // Handle tags update if provided
    if (body.tags) {
      // Get current tag names
      const currentTags = content.tags.map((tag) => tag.name)

      // Determine tags to disconnect (removed tags)
      const tagsToDisconnect = currentTags.filter((tag) => !body.tags?.includes(tag))

      // Determine tags to connect (new tags)
      const tagsToConnect = body.tags.filter((tag) => !currentTags.includes(tag))

      // Disconnect removed tags
      if (tagsToDisconnect.length > 0) {
        await prisma.content.update({
          where: {
            id: params.id,
          },
          data: {
            tags: {
              disconnect: tagsToDisconnect.map((tag) => ({ name: tag })),
            },
          },
        })
      }

      // Connect new tags
      if (tagsToConnect.length > 0) {
        await prisma.content.update({
          where: {
            id: params.id,
          },
          data: {
            tags: {
              connectOrCreate: tagsToConnect.map((tag) => ({
                where: { name: tag },
                create: {
                  name: tag,
                  slug: tag.toLowerCase().replace(/\s+/g, "-"),
                },
              })),
            },
          },
        })
      }
    }

    // Log activity
    await prisma.activity.create({
      data: {
        action: isPublishing ? "PUBLISH" : "UPDATE",
        details: isPublishing
          ? `Published ${content.type.toLowerCase()}: ${content.title}`
          : `Updated ${content.type.toLowerCase()}: ${content.title}`,
        userId: session.user.id,
        contentId: content.id,
      },
    })

    return NextResponse.json(updatedContent)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const content = await prisma.content.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Check permissions
    if (content.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Delete the content
    await prisma.content.delete({
      where: {
        id: params.id,
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        action: "DELETE",
        details: `Deleted ${content.type.toLowerCase()}: ${content.title}`,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 })
  }
}
