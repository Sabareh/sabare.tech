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
 * Returns a safe image path with a fallback if the original path is undefined or empty
 */
export function getSafeImagePath(path: string | undefined, fallback: string): string {
  if (!path || path.trim() === "") {
    return fallback
  }
  return path
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
