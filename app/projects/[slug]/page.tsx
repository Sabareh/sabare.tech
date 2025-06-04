export const dynamic = "force-dynamic"

import { getProjectBySlug } from "@/lib/content"
import { notFound } from "next/navigation"
import ProjectDetailClient from "./project-detail-client"

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
