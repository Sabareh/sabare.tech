"use client"

import { Suspense } from "react"
import { type BlogPost } from "@/lib/content"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogList } from "@/components/blog/blog-list"
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/content"
import BlogPageClient from "./BlogPageClient" // New client component

export default async function BlogPage() {
  try {
    const [allPosts, featuredPosts] = await Promise.all([
      getAllBlogPosts(),
      getFeaturedBlogPosts(),
    ])
    return (
      <div className="container mx-auto px-4 py-8">
        <BlogPageClient
          allPosts={allPosts}
          featuredPosts={featuredPosts}
        />
      </div>
    )
  } catch (error) {
    console.error("Error loading blog data:", error)
    // Render client component with error state
    return (
      <div className="container mx-auto px-4 py-8">
        <BlogPageClient posts={[]} featuredPosts={[]} error="Failed to load blog posts" />
      </div>
    )
  }
}
