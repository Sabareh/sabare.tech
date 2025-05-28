import fs from "fs"
import path from "path"

/**
 * Safely check if an image file exists in the public directory
 */
export function imageExists(imagePath: string): boolean {
  try {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath
    const fullPath = path.join(process.cwd(), "public", cleanPath)

    if (!fs.existsSync(fullPath)) {
      return false
    }

    const stats = fs.statSync(fullPath)
    return stats.isFile()
  } catch (error) {
    console.error(`Error checking image existence for ${imagePath}:`, error)
    return false
  }
}

/**
 * Get a safe image path with fallback
 */
export function getSafeImagePath(
  imagePath: string | undefined | null,
  fallback = "/placeholder.svg?height=400&width=400&query=image",
): string {
  if (!imagePath) {
    return fallback
  }

  if (imageExists(imagePath)) {
    return imagePath
  }

  // If the path is for a specific type of image, create a more specific fallback
  if (imagePath.includes("data") || imagePath.includes("pipeline") || imagePath.includes("workflow")) {
    return `/placeholder.svg?height=800&width=1200&query=${encodeURIComponent("data pipeline diagram")}`
  }

  if (imagePath.includes("architecture")) {
    return `/placeholder.svg?height=800&width=1200&query=${encodeURIComponent("system architecture diagram")}`
  }

  console.warn(`Image not found: ${imagePath}, using fallback: ${fallback}`)
  return fallback
}

/**
 * Validate that a path points to a file, not a directory
 */
export function validateFilePath(filePath: string): boolean {
  try {
    const fullPath = path.join(process.cwd(), filePath)

    if (!fs.existsSync(fullPath)) {
      return false
    }

    const stats = fs.statSync(fullPath)
    return stats.isFile()
  } catch (error) {
    console.error(`Error validating file path ${filePath}:`, error)
    return false
  }
}
