import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { z } from "zod"

const contentSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  content: z.string(),
  type: z.enum(["BLOG", "PROJECT", "EXPERIENCE", "TESTIMONIAL", "PAGE", "CONFIG"]),
  status: z.enum(["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  metadata: z.record(z.any()).optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  publishedAt: z.string().datetime().optional(),
})

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")
  const status = searchParams.get("status")
  const featured = searchParams.get("featured")
  const categoryId = searchParams.get("categoryId")
  const authorId = searchParams.get("authorId")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit

  const where: any = {}

  if (type) where.type = type
  if (status) where.status = status
  if (featured === "true") where.featured = true
  if (categoryId) where.categoryId = categoryId
  if (authorId) where.authorId = authorId

  try {
    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where,
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
          media: {
            where: {
              type: "IMAGE",
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.content.count({ where }),
    ])

    return NextResponse.json({
      contents,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching contents:", error)
    return NextResponse.json({ error: "Failed to fetch contents" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "EDITOR") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
  }

  try {
    const json = await req.json()
    const body = contentSchema.parse(json)

    const existingContent = await prisma.content.findUnique({
      where: {
        slug: body.slug,
      },
    })

    if (existingContent) {
      return NextResponse.json({ error: "Content with this slug already exists" }, { status: 400 })
    }

    const content = await prisma.content.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        type: body.type,
        status: body.status,
        featured: body.featured,
        metadata: body.metadata || {},
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        ...(body.categoryId
          ? {
              category: {
                connect: {
                  id: body.categoryId,
                },
              },
            }
          : {}),
        ...(body.tags && body.tags.length > 0
          ? {
              tags: {
                connectOrCreate: body.tags.map((tag) => ({
                  where: { name: tag },
                  create: {
                    name: tag,
                    slug: tag.toLowerCase().replace(/\s+/g, "-"),
                  },
                })),
              },
            }
          : {}),
      },
    })

    // Create initial version
    await prisma.version.create({
      data: {
        contentId: content.id,
        data: {
          title: body.title,
          slug: body.slug,
          description: body.description,
          content: body.content,
          type: body.type,
          status: body.status,
          featured: body.featured,
          metadata: body.metadata || {},
        },
        note: "Initial version",
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        action: "CREATE",
        details: `Created ${body.type.toLowerCase()}: ${body.title}`,
        userId: session.user.id,
        contentId: content.id,
      },
    })

    return NextResponse.json(content)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating content:", error)
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}
