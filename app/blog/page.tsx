import { Suspense } from "react"
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/content"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogList } from "@/components/blog/blog-list"

export const metadata = {
  title: "Blog | Data Engineering Insights",
  description: "Explore articles on data engineering, big data, and analytics.",
}

export default async function BlogPage() {
  // Fetch blog posts
  const posts = await getAllBlogPosts()
  const featuredPosts = await getFeaturedBlogPosts()

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
