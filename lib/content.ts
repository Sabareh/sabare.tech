import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import fs from "fs"
import path from "path"

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
  externalUrl?: string
  coverImage?: string
  tags: string[]
  featured?: boolean
  content: string
  author?: string
  source?: 'local' | 'medium'
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
  images?: string[]
  links?: { name: string; url: string; type: string }[]
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

// Process markdown content to HTML
async function processMarkdown(content: string): Promise<string> {
  try {
    const processedContent = await remark().use(html, { sanitize: false }).process(content)
    return processedContent.toString()
  } catch (error) {
    console.warn("Error processing markdown:", error)
    return content
  }
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
  try {
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
  } catch (error) {
    console.warn(`Error parsing markdown for ${slug}:`, error)
    return {
      id: slug,
      slug,
      title: slug,
      description: "",
      content: "",
      date: new Date().toISOString(),
      author: "Admin",
      type,
      featured: false,
      readingTime: "1 min read",
      tags: [],
      metadata: {},
    }
  }
}

// Content manifest for available files (client-side discovery)
// These must match the slugs in generateStaticParams()
const contentManifest: Record<ContentType, string[]> = {
  blog: [
    "building-real-time-data-pipelines",
    "data-mesh-architecture",
    "advanced-lstm-forecasting",
    "kubernetes-operators-data-pipelines",
  ],
  project: ["real-time-analytics-platform"],
  experience: ["tech-innovations", "hfc-kenya", "upwork"],
  testimonial: [
    // add your testimonial markdown filenames (without .md)
    "sarah-johnson",
  ],
  page: [],
  config: ["personal-info", "social-links"],
}

// Export the content manifest for use in generateStaticParams
export const CONTENT_MANIFEST = contentManifest

// Fetch and process a single content item (client-side only)
async function fetchContentItem(type: ContentType, slug: string): Promise<ContentItem | null> {
  const cacheKey = `${type}:${slug}`

  // Check cache first
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  // map singular type -> plural folder
  const folder = type === "testimonial" ? "testimonials" : type
  const filePath = `/content/${folder}/${slug}.md`
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

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (typeof window === "undefined") {
    try {
      const blogDirectory = path.join(process.cwd(), "content/blog")
      if (!fs.existsSync(blogDirectory)) {
        console.warn("Blog directory not found:", blogDirectory)
        return []
      }
      const filenames = fs.readdirSync(blogDirectory)
      const postsPromises = filenames
        .filter((name) => name.endsWith(".md"))
        .map(async (name) => {
          const filePath = path.join(blogDirectory, name)
          const fileContents = fs.readFileSync(filePath, "utf8")
          const { data, content: rawContent } = matter(fileContents)
          const htmlContent = await processMarkdown(rawContent)
          const readingTime = calculateReadingTime(rawContent)

          return {
            slug: name.replace(/\.md$/, ""),
            title: data.title || name.replace(/\.md$/, ""),
            excerpt: data.excerpt || data.description || "",
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            readingTime,
            externalUrl: data.externalUrl || data.url,
            coverImage: data.coverImage,
            tags: data.tags || [],
            featured: data.featured || false,
            content: htmlContent,
            author: data.author,
            source: data.source || "local",
            metadata: data,
          } as BlogPost
        })
      
      const posts = await Promise.all(postsPromises)
      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
      console.error("Error reading blog posts on server:", error)
      return []
    }
  }

  // Client-side implementation
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

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (typeof window === "undefined") {
    try {
      const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`)
      if (!fs.existsSync(filePath)) {
        return null
      }
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content: rawContent } = matter(fileContents)
      const htmlContent = await processMarkdown(rawContent)
      const readingTime = calculateReadingTime(rawContent)

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || data.description || "",
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        readingTime,
        externalUrl: data.externalUrl || data.url,
        coverImage: data.coverImage,
        tags: data.tags || [],
        featured: data.featured || false,
        content: htmlContent,
        author: data.author,
        source: data.source || "local",
        metadata: data,
      } as BlogPost
    } catch (error) {
      console.error(`Error reading blog post ${slug} on server:`, error)
      return null
    }
  }

  // Client-side implementation
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
    externalUrl: (post.metadata?.externalUrl as string) || (post.metadata?.url as string) || undefined,
    coverImage: post.coverImage,
    tags: post.tags || [],
    featured: post.featured || false,
    content: post.content,
    author: post.author,
    source: (post.metadata?.source as string) || "local",
    metadata: post.metadata,
  }
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts() // This will now use server/client logic appropriately
  return allPosts.filter((post) => post.featured).slice(0, 3)
}

// Update getAllProjects to work in both client and server contexts
export async function getAllProjects(): Promise<Project[]> {
  // Check if we're in a server context
  if (typeof window === "undefined") {
    try {
      const projectsDirectory = path.join(process.cwd(), "content/projects")

      // Check if directory exists
      if (!fs.existsSync(projectsDirectory)) {
        console.warn("Projects directory not found:", projectsDirectory)
        return []
      }

      const filenames = fs.readdirSync(projectsDirectory)
      const projectsPromises = filenames
        .filter((name) => name.endsWith(".md"))
        .map(async (name) => {
          const filePath = path.join(projectsDirectory, name)
          const fileContents = fs.readFileSync(filePath, "utf8")
          const { data, content: rawContent } = matter(fileContents)
          const htmlContent = await processMarkdown(rawContent)

          // pull arrays from frontmatter
          const imgs = Array.isArray(data.images) ? data.images : []
          const lks = Array.isArray(data.links) ? data.links : []

          // helpers
          const findLink = (type: string) => lks.find((x) => x.type === type)?.url

          return {
            slug: name.replace(/\.md$/, ""),
            title: data.title || name.replace(/\.md$/, ""),
            description: data.description || "",
            technologies: data.technologies || [],
            githubUrl: data.githubUrl || findLink("code"),
            demoUrl: data.demoUrl || findLink("demo"),
            imageUrl: data.imageUrl || imgs[0],
            images: imgs,
            links: lks,
            featured: data.featured || false,
            content: htmlContent,
            metadata: data,
          } as Project
        })

      const projects = await Promise.all(projectsPromises)

      return projects.sort(
        (a, b) =>
          new Date(b.date || b.startDate || 0).getTime() -
          new Date(a.date || a.startDate || 0).getTime(),
      )
    } catch (error) {
      console.error("Error reading projects:", error)
      return []
    }
  }

  // Client-side implementation remains the same
  const projects = await getAllContent("project")

  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    description: project.description || "",
    technologies: project.metadata?.technologies || [],
    githubUrl: project.metadata?.githubUrl,
    demoUrl: project.metadata?.demoUrl,
    imageUrl: project.metadata?.imageUrl || project.coverImage,
    images: project.metadata?.images || [],
    links: project.metadata?.links || [],
    featured: project.featured || false,
    content: project.content,
    metadata: project.metadata,
  }))
}

// Update getProjectBySlug to work in both contexts
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (typeof window === "undefined") {
    try {
      const projectsDirectory = path.join(process.cwd(), "content/projects")
      const filePath = path.join(projectsDirectory, `${slug}.md`)

      if (!fs.existsSync(filePath)) {
        return null
      }

      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content: rawContent } = matter(fileContents)
      const htmlContent = await processMarkdown(rawContent)

      return {
        ...data,
        slug,
        content: htmlContent,
        title: data.title || slug,
        description: data.description || "",
        technologies: data.technologies || [],
      } as Project
    } catch (error) {
      console.error("Error reading project:", error)
      return null
    }
  }

  // Client-side implementation
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
    images: project.metadata?.images || [],
    links: project.metadata?.links || [],
    featured: project.featured || false,
    content: project.content,
    metadata: project.metadata,
  }
}

// Add similar functions for experience if needed
export async function getAllExperience(): Promise<Experience[]> {
  if (typeof window === "undefined") {
    try {
      const experienceDirectory = path.join(process.cwd(), "content/experience")

      if (!fs.existsSync(experienceDirectory)) {
        console.warn("Experience directory not found:", experienceDirectory)
        return []
      }

      const filenames = fs.readdirSync(experienceDirectory)
      const experiencesPromises = filenames
        .filter((name) => name.endsWith(".md"))
        .map(async (name) => {
          const filePath = path.join(experienceDirectory, name)
          const fileContents = fs.readFileSync(filePath, "utf8")
          const { data, content: rawContent } = matter(fileContents)
          const htmlContent = await processMarkdown(rawContent)

          return {
            ...data,
            slug: name.replace(/\.md$/, ""),
            content: htmlContent,
            title: data.title || name.replace(/\.md$/, ""),
            company: data.company || "",
            position: data.position || "",
            startDate: data.startDate || new Date().toISOString(),
            location: data.location || "",
            description: data.description || "",
            technologies: data.technologies || [],
          } as Experience
        })

      const experiences = await Promise.all(experiencesPromises)

      return experiences.sort(
        (a, b) =>
          new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime(),
      )
    } catch (error) {
      console.error("Error reading experience:", error)
      return []
    }
  }

  // Client-side implementation
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

// Get all testimonials
export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (typeof window === "undefined") {
    try {
      const testimonialsDirectory = path.join(process.cwd(), "content/testimonials")

      if (!fs.existsSync(testimonialsDirectory)) {
        console.warn("Testimonials directory not found:", testimonialsDirectory)
        return []
      }

      const filenames = fs.readdirSync(testimonialsDirectory)
      const testimonialsPromises = filenames
        .filter((name) => name.endsWith(".md"))
        .map(async (name) => {
          const filePath = path.join(testimonialsDirectory, name)
          const fileContents = fs.readFileSync(filePath, "utf8")
          const { data, content: rawContent } = matter(fileContents)
          const htmlContent = await processMarkdown(rawContent)

          return {
            slug: name.replace(/\.md$/, ""),
            name: data.name || name.replace(/\.md$/, ""),
            position: data.position || "",
            company: data.company || "",
            content: htmlContent,
            rating: data.rating || 5,
            imageUrl: data.imageUrl || data.avatar,
            metadata: data,
          } as Testimonial
        })

      return await Promise.all(testimonialsPromises)
    } catch (error) {
      console.error("Error reading testimonials:", error)
      return []
    }
  }

  // Client-side implementation
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
