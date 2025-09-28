import { getFeaturedBlogPosts, getAllProjects } from "@/lib/content"
import { fetchMediumPosts, MEDIUM_PROFILE_URL } from "@/lib/medium"
import HomePageClient from "./HomePageClient"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [mediumPosts, localFeaturedPosts, projects] = await Promise.all([
    fetchMediumPosts(6),
    getFeaturedBlogPosts(),
    getAllProjects(),
  ])

  const postsToShow = mediumPosts.length > 0 ? mediumPosts.slice(0, 3) : localFeaturedPosts.slice(0, 3)
  const mediumMeta = mediumPosts.length > 0 ? { url: MEDIUM_PROFILE_URL, total: mediumPosts.length } : null

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <HomePageClient
      featuredPosts={postsToShow}
      projects={featuredProjects}
      mediumProfileUrl={mediumMeta?.url}
      mediumPostCount={mediumMeta?.total}
    />
  )
}
