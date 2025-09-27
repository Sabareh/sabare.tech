export const dynamic = "force-dynamic"

import BlogPageClient from "./BlogPageClient"
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/content"
import { fetchMediumPosts } from "@/lib/medium"

const MEDIUM_PROFILE_URL = "https://medium.com/@sabarevictor"

export default async function BlogPage() {
  try {
    const mediumPosts = await fetchMediumPosts(12)

    if (mediumPosts.length > 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <BlogPageClient
            posts={mediumPosts}
            featuredPosts={mediumPosts.slice(0, 3)}
            mediumProfileUrl={MEDIUM_PROFILE_URL}
          />
        </div>
      )
    }

    const [allPosts, featuredPosts] = await Promise.all([getAllBlogPosts(), getFeaturedBlogPosts()])

    return (
      <div className="container mx-auto px-4 py-8">
        <BlogPageClient posts={allPosts} featuredPosts={featuredPosts} />
      </div>
    )
  } catch (error) {
    console.error("Error loading blog data:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <BlogPageClient posts={[]} featuredPosts={[]} error="Failed to load blog posts" />
      </div>
    )
  }
}
