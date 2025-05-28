import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

// Define the content types
export type ContentType = "blog" | "project" | "experience" | "testimonial" | "page" | "config"

// Define the content item interface
export interface ContentItem {
  id: string
  slug: string
  title: string
  description?: string
  content: string
  date?: string
  author?: string
  type: ContentType
  featured?: boolean
  coverImage?: string
  readingTime?: string
  tags?: string[]
  metadata?: Record<string, any>
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  coverImage?: string
  tags: string[]
  featured?: boolean
  content: string
  author?: string
  metadata?: Record<string, any>
}

export interface Project {
  slug: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  featured?: boolean
  content: string
  metadata?: Record<string, any>
}

export interface Experience {
  slug: string
  title: string
  company: string
  position: string
  startDate: string
  endDate?: string
  location: string
  description: string
  technologies: string[]
  content: string
  metadata?: Record<string, any>
}

export interface Testimonial {
  slug: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  imageUrl?: string
  metadata?: Record<string, any>
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Process markdown content
export async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark().use(html, { sanitize: false }).process(content)
  return processedContent.toString()
}

// Parse markdown string with frontmatter
export function parseMarkdownWithFrontmatter(markdown: string, slug: string, type: ContentType): ContentItem {
  const { data, content } = matter(markdown)

  // Calculate reading time
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200) + " min read"

  // Handle date parsing
  let dateString = new Date().toISOString()
  if (data.date) {
    if (data.date instanceof Date) {
      dateString = data.date.toISOString()
    } else if (typeof data.date === "string") {
      const parsedDate = new Date(data.date)
      if (!isNaN(parsedDate.getTime())) {
        dateString = parsedDate.toISOString()
      }
    }
  }

  return {
    id: slug,
    slug,
    title: data.title || slug,
    description: data.description || data.excerpt || "",
    content: content,
    date: dateString,
    author: data.author || "Admin",
    type,
    featured: data.featured || false,
    coverImage: data.coverImage,
    readingTime,
    tags: data.tags || [],
    metadata: { ...data },
  }
}
