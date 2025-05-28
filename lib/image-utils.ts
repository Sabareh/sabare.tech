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
