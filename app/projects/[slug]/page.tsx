import { getAllProjects, getProjectBySlug } from "@/lib/content"
import { notFound } from "next/navigation"
import ProjectDetailClient from "./project-detail-client"

// Add this function for static generation
export async function generateStaticParams() {
  try {
    const projects = await getAllProjects()
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error("Error generating static params for projects:", error)
    return []
  }
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const project = await getProjectBySlug(params.slug)
    
    if (!project) {
      notFound()
    }

    return <ProjectDetailClient project={project} />
  } catch (error) {
    console.error("Error loading project:", error)
    notFound()
  }
}
