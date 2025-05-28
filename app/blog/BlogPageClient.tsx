"use client"

import { Suspense } from "react"
import { type BlogPost } from "@/lib/content"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogList } from "@/components/blog/blog-list"

interface BlogPageClientProps {
  posts: BlogPost[]
  featuredPosts: BlogPost[]
  error?: string
}

export default function BlogPageClient({ posts, featuredPosts, error }: BlogPageClientProps) {
  if (error) {
    return (
      <div className="container py-10 space-y-10">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  // You can add a loading state here if initial props are empty and an error isn't present,
  // though with server fetching, data should be available or an error thrown.
  // For simplicity, direct rendering or error display is shown.

  return (
    <div className="container py-10 space-y-10">
      <BlogHeader
        title="Data Engineering Insights"
        description="Explore articles on data engineering, big data, and analytics."
        postCount={posts.length}
      />

      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogList posts={posts} featuredPosts={featuredPosts} />
      </Suspense>
    </div>
  )
}
