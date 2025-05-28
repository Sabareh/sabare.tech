import ProjectClientPage from "./ProjectClientPage"

// Generate static params for all projects
export async function generateStaticParams() {
  // Define the available project slugs for static generation
  const projectSlugs = ["real-time-analytics-platform"]

  return projectSlugs.map((slug) => ({
    slug: slug,
  }))
}

export default function ProjectPage() {
  return <ProjectClientPage />
}
