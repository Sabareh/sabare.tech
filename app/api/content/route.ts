import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"
import { z } from "zod"

const createContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  type: z.enum(["blog", "project", "experience", "testimonial", "page"]),
  status: z.enum(["draft", "published", "scheduled", "archived"]).default("draft"),
  featuredImageUrl: z.string().optional(),
  metadata: z.record(z.any()).default({}),
  publishedAt: z.string().optional(),
  scheduledAt: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let query = `
      SELECT c.*, u.name as author_name, u.email as author_email
      FROM content c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE 1=1
    `
    const params: any[] = []

    if (type) {
      query += ` AND c.type = $${params.length + 1}`
      params.push(type)
    }

    if (status) {
      query += ` AND c.status = $${params.length + 1}`
      params.push(status)
    }

    query += ` ORDER BY c.updated_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const content = await sql(query, params)

    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM content WHERE 1=1`
    const countParams: any[] = []

    if (type) {
      countQuery += ` AND type = $${countParams.length + 1}`
      countParams.push(type)
    }

    if (status) {
      countQuery += ` AND status = $${countParams.length + 1}`
      countParams.push(status)
    }

    const countResult = await sql(countQuery, countParams)
    const total = Number.parseInt(countResult[0]?.total || "0")

    return NextResponse.json({
      content,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createContentSchema.parse(body)

    // Get user ID
    const users = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `
    const userId = users[0]?.id

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const result = await sql`
      INSERT INTO content (
        title, slug, content, excerpt, type, status, 
        featured_image_url, metadata, author_id, 
        published_at, scheduled_at
      ) VALUES (
        ${validatedData.title},
        ${validatedData.slug},
        ${validatedData.content || ""},
        ${validatedData.excerpt || ""},
        ${validatedData.type},
        ${validatedData.status},
        ${validatedData.featuredImageUrl || null},
        ${JSON.stringify(validatedData.metadata)},
        ${userId},
        ${validatedData.publishedAt ? new Date(validatedData.publishedAt).toISOString() : null},
        ${validatedData.scheduledAt ? new Date(validatedData.scheduledAt).toISOString() : null}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
