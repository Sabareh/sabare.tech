import type { ContentType } from "./content-client"

// Utility to get content file path
export function getContentPath(type: ContentType, slug: string): string {
  return `/content/${type}/${slug}.md`
}

// Utility to validate content type
export function isValidContentType(type: string): type is ContentType {
  return ["blog", "project", "experience", "testimonial", "page", "config"].includes(type)
}

// Utility to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Utility to extract excerpt from content
export function extractExcerpt(content: string, maxLength = 160): string {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, "")

  if (plainText.length <= maxLength) {
    return plainText
  }

  return plainText.substring(0, maxLength).trim() + "..."
}

// Utility to generate reading time
export function generateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Utility to slugify text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
