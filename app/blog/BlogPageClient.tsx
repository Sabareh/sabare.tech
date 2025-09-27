"use client"

import { Suspense } from "react"
import { type BlogPost } from "@/lib/content"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogList } from "@/components/blog/blog-list"

interface BlogPageClientProps {
  posts: BlogPost[]
  featuredPosts: BlogPost[]
  error?: string
  mediumProfileUrl?: string
}

export default function BlogPageClient({ posts, featuredPosts, error, mediumProfileUrl }: BlogPageClientProps) {
  if (error) {
    return (
      <div className="container py-10 space-y-10">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  const isMediumFeed = Boolean(mediumProfileUrl) && posts.every((post) => post.source === "medium")
  const note = isMediumFeed ? "All articles open on Medium in a new tab." : undefined
  const cta = mediumProfileUrl
    ? {
        label: "Read on Medium",
        href: mediumProfileUrl,
        external: true,
      }
    : undefined

  return (
    <div className="container py-10 space-y-10">
      <BlogHeader
        title="Data Engineering Insights"
        description="Explore articles on data engineering, big data, and analytics."
        postCount={posts.length}
        note={note}
        cta={cta}
      />

      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogList posts={posts} featuredPosts={featuredPosts} />
      </Suspense>
    </div>
  )
}
