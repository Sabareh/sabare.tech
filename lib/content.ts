"use client"

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

// Client-side cache for content
const contentCache = new Map<string, any>()

// Helper function to calculate reading time
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Process markdown content to HTML (client-side only)
async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark().use(html, { sanitize: false }).process(content)
  return processedContent.toString()
}

// Fetch markdown file from public directory (client-side only)
async function fetchMarkdownFile(path: string): Promise<string | null> {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      console.warn(`Failed to fetch ${path}: ${response.status}`)
      return null
    }
    return await response.text()
  } catch (error) {
    console.warn(`Error fetching ${path}:`, error)
    return null
  }
}

// Parse markdown with frontmatter (client-side only)
function parseMarkdownWithFrontmatter(markdown: string, slug: string, type: ContentType): ContentItem {
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

// Content manifest for available files (client-side discovery)
const contentManifest: Record<ContentType, string[]> = {
  blog: [
    "building-real-time-data-pipelines",
    "data-mesh-architecture",
    "optimizing-spark-performance",
    "kubernetes-data-workloads",
  ],
  project: ["real-time-analytics-platform"],
  experience: [],
  testimonial: [],
  page: [],
  config: ["personal-info", "social-links"],
}

// Fetch and process a single content item (client-side only)
async function fetchContentItem(type: ContentType, slug: string): Promise<ContentItem | null> {
  const cacheKey = `${type}:${slug}`

  // Check cache first
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  const filePath = `/content/${type}/${slug}.md`
  const markdown = await fetchMarkdownFile(filePath)

  if (!markdown) {
    return null
  }

  const contentItem = parseMarkdownWithFrontmatter(markdown, slug, type)
  const htmlContent = await processMarkdown(contentItem.content)

  const processedItem = {
    ...contentItem,
    content: htmlContent,
  }

  // Cache the result
  contentCache.set(cacheKey, processedItem)

  return processedItem
}

// Get all content items of a specific type (client-side only)
export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  const cacheKey = `all:${type}`

  // Check cache first
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  const files = contentManifest[type] || []
  const contentPromises = files.map((slug) => fetchContentItem(type, slug))
  const contentItems = await Promise.all(contentPromises)

  const validItems = contentItems
    .filter((item): item is ContentItem => item !== null)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })

  // Cache the result
  contentCache.set(cacheKey, validItems)

  return validItems
}

// Get all blog posts (client-side only)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllContent("blog")

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description || "",
    date: post.date || new Date().toISOString(),
    readingTime: post.readingTime || "5 min read",
    coverImage: post.coverImage,
    tags: post.tags || [],
    featured: post.featured || false,
    content: post.content,
    author: post.author,
    metadata: post.metadata,
  }))
}

// Get single blog post by slug (client-side only)
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await fetchContentItem("blog", slug)

  if (!post) {
    return null
  }

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.description || "",
    date: post.date || new Date().toISOString(),
    readingTime: post.readingTime || "5 min read",
    coverImage: post.coverImage,
    tags: post.tags || [],
    featured: post.featured || false,
    content: post.content,
    author: post.author,
    metadata: post.metadata,
  }
}

// Get featured blog posts (client-side only)
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.featured).slice(0, 3)
}

// Get all projects (client-side only)
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getAllContent("project")

  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    description: project.description || "",
    technologies: project.metadata?.technologies || [],
    githubUrl: project.metadata?.githubUrl,
    demoUrl: project.metadata?.demoUrl,
    imageUrl: project.metadata?.imageUrl || project.coverImage,
    featured: project.featured || false,
    content: project.content,
    metadata: project.metadata,
  }))
}

// Get project by slug (client-side only)
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await fetchContentItem("project", slug)

  if (!project) {
    return null
  }

  return {
    slug: project.slug,
    title: project.title,
    description: project.description || "",
    technologies: project.metadata?.technologies || [],
    githubUrl: project.metadata?.githubUrl,
    demoUrl: project.metadata?.demoUrl,
    imageUrl: project.metadata?.imageUrl || project.coverImage,
    featured: project.featured || false,
    content: project.content,
    metadata: project.metadata,
  }
}

// Search blog posts (client-side only)
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  const searchTerm = query.toLowerCase()

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      post.content.toLowerCase().includes(searchTerm),
  )
}

// Get blog posts by tag (client-side only)
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

// Get all unique tags from blog posts (client-side only)
export async function getAllTagsFromBlogPosts(): Promise<string[]> {
  const allPosts = await getAllBlogPosts()
  const tags = new Set<string>()

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

// Get single content item by slug (client-side only)
export async function getContentBySlug(type: ContentType, slug: string): Promise<ContentItem | null> {
  return await fetchContentItem(type, slug)
}

// Get featured content items (client-side only)
export async function getFeaturedContent(type: ContentType, limit = 3): Promise<ContentItem[]> {
  const allContent = await getAllContent(type)
  return allContent.filter((item) => item.featured).slice(0, limit)
}

// Search content items (client-side only)
export async function searchContent(query: string, types: ContentType[] = ["blog", "project"]): Promise<ContentItem[]> {
  const contentPromises = types.map((type) => getAllContent(type))
  const contentByType = await Promise.all(contentPromises)
  const allContent = contentByType.flat()

  if (!query) return allContent

  const lowerQuery = query.toLowerCase()
  return allContent.filter((item) => {
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
      (item.content && item.content.toLowerCase().includes(lowerQuery)) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
  })
}

// Get content by tag (client-side only)
export async function getContentByTag(tag: string, types: ContentType[] = ["blog", "project"]): Promise<ContentItem[]> {
  const contentPromises = types.map((type) => getAllContent(type))
  const contentByType = await Promise.all(contentPromises)
  const allContent = contentByType.flat()

  const lowerTag = tag.toLowerCase()
  return allContent.filter((item) => item.tags?.some((contentTag) => contentTag.toLowerCase() === lowerTag))
}

// Get all unique tags from content (client-side only)
export async function getAllTags(types: ContentType[] = ["blog", "project"]): Promise<string[]> {
  const contentPromises = types.map((type) => getAllContent(type))
  const contentByType = await Promise.all(contentPromises)
  const allContent = contentByType.flat()

  const tags = new Set<string>()
  allContent.forEach((item) => {
    item.tags?.forEach((tag) => {
      tags.add(tag)
    })
  })

  return Array.from(tags).sort()
}

// Get configuration from markdown (client-side only)
export async function getConfig(configName: string): Promise<Record<string, any> | null> {
  const configItem = await fetchContentItem("config", configName)
  if (!configItem) {
    // Return static fallback config
    const staticConfigs: Record<string, any> = {
      "personal-info": {
        name: "Victor Oketch Sabare",
        title: "Senior Data Engineer",
        email: "victor@victorsabare.com",
        location: "San Francisco, CA",
        bio: "Passionate data engineer with 5+ years of experience building scalable data infrastructure and real-time analytics solutions.",
      },
      "social-links": {
        github: "https://github.com/victor-sabare",
        linkedin: "https://linkedin.com/in/victor-sabare",
        twitter: "https://twitter.com/victor_sabare",
        email: "victor@victorsabare.com",
      },
    }
    return staticConfigs[configName] || null
  }
  return configItem.metadata || {}
}

// Experience and testimonials functions (client-side only)
export async function getAllExperience(): Promise<Experience[]> {
  const experiences = await getAllContent("experience")

  return experiences.map((exp) => ({
    slug: exp.slug,
    title: exp.title,
    company: exp.metadata?.company || "",
    position: exp.metadata?.position || "",
    startDate: exp.metadata?.startDate || "",
    endDate: exp.metadata?.endDate,
    location: exp.metadata?.location || "",
    description: exp.description || "",
    technologies: exp.metadata?.technologies || [],
    content: exp.content,
    metadata: exp.metadata,
  }))
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getAllContent("testimonial")

  return testimonials.map((testimonial) => ({
    slug: testimonial.slug,
    name: testimonial.metadata?.name || testimonial.title,
    position: testimonial.metadata?.position || "",
    company: testimonial.metadata?.company || "",
    content: testimonial.content,
    rating: testimonial.metadata?.rating || 5,
    imageUrl: testimonial.metadata?.imageUrl || testimonial.coverImage,
    metadata: testimonial.metadata,
  }))
}
