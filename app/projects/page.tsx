import { getAllProjects } from "@/lib/content"
import ProjectsClient from "./projects-client"

export default async function ProjectsPage() {
  try {
    const projects = await getAllProjects()
    return <ProjectsClient projects={projects} />
  } catch (error) {
    console.error("Error loading projects:", error)
    return <ProjectsClient projects={[]} error="Failed to load projects" />
  }
}
