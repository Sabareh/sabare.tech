import { getFeaturedBlogPosts, getAllProjects } from "@/lib/content"
import HomePageClient from "./HomePageClient"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [posts, projects] = await Promise.all([
    getFeaturedBlogPosts(),
    getAllProjects(),
  ])

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return <HomePageClient featuredPosts={posts} projects={featuredProjects} />
}
