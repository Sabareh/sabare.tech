export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  coverImage: string
  tags: string[]
  featured?: boolean
  content: string
}

// In a real application, this would fetch from an API, CMS, or file system
// For demo purposes, we're using mock data
export async function getAllPosts(): Promise<BlogPost[]> {
  // This would typically fetch from an API or read from the file system
  return []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // This would typically fetch from an API or read from the file system
  return null
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}
