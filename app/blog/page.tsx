"use client"

import { Suspense, useEffect, useState } from "react"
import { getAllBlogPosts, getFeaturedBlogPosts, type BlogPost } from "@/lib/content"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogList } from "@/components/blog/blog-list"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBlogData() {
      try {
        setLoading(true)
        const [allPosts, featured] = await Promise.all([getAllBlogPosts(), getFeaturedBlogPosts()])
        setPosts(allPosts)
        setFeaturedPosts(featured)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog posts")
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
  }, [])

  if (loading) {
    return (
      <div className="container py-10 space-y-10">
        <div className="text-center">Loading blog posts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10 space-y-10">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

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
