import { BlogPostPageClient } from "./BlogPostPageClient"

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Define the available blog post slugs for static generation
  const blogSlugs = [
    "building-real-time-data-pipelines",
    "data-mesh-architecture",
    "optimizing-spark-performance",
    "kubernetes-data-workloads",
  ]

  return blogSlugs.map((slug) => ({
    slug: slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostPageClient params={params} />
}
