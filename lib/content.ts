import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"

const contentDirectory = path.join(process.cwd(), "content")

export interface ContentItem {
  slug: string
  content: string
  data: Record<string, any>
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  updated?: string
  readingTime: string
  coverImage: string
  author: string
  featured: boolean
  published: boolean
  tags: string[]
  category: string
  content: string
  seo?: {
    title: string
    description: string
    keywords: string
  }
}

export interface Project {
  slug: string
  title: string
  description: string
  category: string
  featured: boolean
  status: string
  startDate: string
  endDate?: string
  client: string
  role: string
  team: number
  technologies: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  images: string[]
  links: Array<{
    name: string
    url: string
    type: string
  }>
  content: string
}

export interface Experience {
  slug: string
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  type: string
  logo: string
  website: string
  description: string
  team: number
  technologies: string[]
  achievements: Array<{
    title: string
    description: string
    impact: string
    metrics: string[]
  }>
  projects: string[]
  content: string
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  bio: string
  location: string
  email: string
  phone: string
  website: string
  avatar: string
  resume_url: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  primary: boolean
}

// Generic function to read and parse markdown files
export async function getContentItems(directory: string): Promise<ContentItem[]> {
  const fullPath = path.join(contentDirectory, directory)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  const fileNames = fs.readdirSync(fullPath)
  const items = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".md"))
      .map(async (name) => {
        const slug = name.replace(/\.md$/, "")
        const fullPath = path.join(contentDirectory, directory, name)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // Process markdown content
        const processedContent = await remark().use(remarkGfm).use(remarkHtml).process(content)

        return {
          slug,
          content: processedContent.toString(),
          data,
        }
      }),
  )

  return items
}

// Specific functions for different content types
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const items = await getContentItems("blog")
  return items
    .map((item) => ({
      slug: item.slug,
      content: item.content,
      ...item.data,
    }))
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(contentDirectory, "blog", `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(remarkGfm).use(remarkHtml).process(content)

    return {
      slug,
      content: processedContent.toString(),
      ...data,
    }
  } catch (error) {
    return null
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const items = await getContentItems("projects")
  return items
    .map((item) => ({
      slug: item.slug,
      content: item.content,
      ...item.data,
    }))
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(contentDirectory, "projects", `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(remarkGfm).use(remarkHtml).process(content)

    return {
      slug,
      content: processedContent.toString(),
      ...data,
    }
  } catch (error) {
    return null
  }
}

export async function getAllExperience(): Promise<Experience[]> {
  const items = await getContentItems("experience")
  return items
    .map((item) => ({
      slug: item.slug,
      content: item.content,
      ...item.data,
    }))
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
}

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  try {
    const fullPath = path.join(contentDirectory, "config", "personal-info.md")
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)
    return data as PersonalInfo
  } catch (error) {
    return null
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const fullPath = path.join(contentDirectory, "config", "social-links.md")
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)
    return data.links || []
  } catch (error) {
    return []
  }
}

// Utility function to calculate reading time
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Search function across all content
export async function searchContent(query: string): Promise<{
  blogs: BlogPost[]
  projects: Project[]
  experience: Experience[]
}> {
  const [blogs, projects, experience] = await Promise.all([getAllBlogPosts(), getAllProjects(), getAllExperience()])

  const searchTerm = query.toLowerCase()

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  )

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm)),
  )

  const filteredExperience = experience.filter(
    (exp) =>
      exp.company.toLowerCase().includes(searchTerm) ||
      exp.position.toLowerCase().includes(searchTerm) ||
      exp.technologies.some((tech) => tech.toLowerCase().includes(searchTerm)),
  )

  return {
    blogs: filteredBlogs,
    projects: filteredProjects,
    experience: filteredExperience,
  }
}
