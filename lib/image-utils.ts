/**
 * Client-side image utilities without fs dependencies
 */

/**
 * Returns a safe image path with a fallback if the original path is undefined or empty
 */
export function getSafeImagePath(imagePath: string | undefined, fallback: string): string {
  if (!imagePath || imagePath.trim() === "") {
    return fallback
  }
  return imagePath
}

/**
 * Generate a placeholder image URL with query parameters
 */
export function getPlaceholderImage(width: number, height: number, query?: string): string {
  const baseUrl = `/placeholder.svg?height=${height}&width=${width}`
  return query ? `${baseUrl}&query=${encodeURIComponent(query)}` : baseUrl
}

/**
 * Check if an image URL is valid (client-side check)
 */
export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url, window.location.origin)
    return true
  } catch {
    return false
  }
}

/**
 * Get optimized image props for Next.js Image component
 */
export function getImageProps(src: string, alt: string, fallback?: string) {
  return {
    src: src || fallback || "/placeholder.svg",
    alt: alt || "Image",
    loading: "lazy" as const,
    className: "object-cover transition-transform duration-300",
  }
}

/**
 * Check if image exists by trying to load it (client-side)
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

/**
 * Preload images for better performance
 */
export function preloadImages(imagePaths: string[]): Promise<void[]> {
  return Promise.all(
    imagePaths.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve() // Still resolve to not block other images
        img.src = src
      })
    }),
  )
}

/**
 * Generate alt text from filename
 */
export function generateAltText(filename: string): string {
  return filename
    .replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
}
