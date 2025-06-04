export const dynamic = "force-dynamic"

import { getBlogPostBySlug } from "@/lib/content"
import { BlogPostPageClient } from "./BlogPostPageClient" // Existing client component
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
      notFound()
    }
    // Pass the fetched post directly to the client component
    return <BlogPostPageClient post={post} />
  } catch (error) {
    console.error(`Error loading blog post ${params.slug}:`, error)
    notFound() // Or render an error page
  }
}
