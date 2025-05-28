import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"
import sharp from "sharp"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const contentId = formData.get("contentId") as string | null
    const alt = formData.get("alt") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileType = file.type

    // Determine media type
    let mediaType: "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO"

    if (fileType.startsWith("image/")) {
      mediaType = "IMAGE"
    } else if (fileType.startsWith("video/")) {
      mediaType = "VIDEO"
    } else if (fileType.startsWith("audio/")) {
      mediaType = "AUDIO"
    } else {
      mediaType = "DOCUMENT"
    }

    // Get dimensions for images
    let width: number | undefined
    let height: number | undefined

    if (mediaType === "IMAGE") {
      try {
        const metadata = await sharp(buffer).metadata()
        width = metadata.width
        height = metadata.height
      } catch (error) {
        console.error("Error getting image dimensions:", error)
      }
    }

    // Generate a unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    const path = `media/${mediaType.toLowerCase()}s/${fileName}`

    // Upload to Vercel Blob
    const blob = await put(path, buffer, {
      contentType: file.type,
      access: "public",
    })

    // Create media record in database
    const media = await prisma.media.create({
      data: {
        name: file.name,
        url: blob.url,
        type: mediaType,
        size: file.size,
        width,
        height,
        alt: alt || undefined,
        ...(contentId ? { contentId } : {}),
      },
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error("Error uploading media:", error)
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type") as "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO" | null
  const contentId = searchParams.get("contentId")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const skip = (page - 1) * limit

  const where: any = {}

  if (type) where.type = type
  if (contentId) where.contentId = contentId

  try {
    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.media.count({ where }),
    ])

    return NextResponse.json({
      media,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}
