import { NextResponse } from "next/server"
import { readdir, access } from "fs/promises"
import { join } from "path"
import { constants } from "fs"

export async function GET() {
  try {
    const imagesPath = join(process.cwd(), "public", "images")

    // Check if the images directory exists
    try {
      await access(imagesPath, constants.F_OK)
    } catch {
      // Directory doesn't exist, return empty array
      console.log("Images directory doesn't exist, returning empty array")
      return NextResponse.json([])
    }

    const files = await readdir(imagesPath)

    // Filter for image files only
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))

    return NextResponse.json(imageFiles)
  } catch (error) {
    console.error("Error reading images directory:", error)
    return NextResponse.json([])
  }
}
