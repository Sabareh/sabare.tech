"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProjectBySlug, type Project } from "@/lib/content"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { getSafeImagePath } from "@/lib/image-utils"

export default function ProjectClientPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true)
        const projectData = await getProjectBySlug(slug)
        setProject(projectData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadProject()
    }
  }, [slug])

  if (loading) {
    return (
      <article className="container max-w-4xl py-10">
        <div className="text-center">Loading project...</div>
      </article>
    )
  }

  if (error || !project) {
    return (
      <article className="container max-w-4xl py-10">
        <div className="text-center text-red-500">{error || "Project not found"}</div>
      </article>
    )
  }

  // Get safe image path with appropriate fallback
  const projectImage = getSafeImagePath(
    project.imageUrl,
    `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(project.title)}`,
  )

  return (
    <article className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all projects
          </Button>
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>

        {project.description && <p className="text-xl text-muted-foreground mb-6">{project.description}</p>}

        <div className="flex flex-wrap gap-4 mb-6">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Button>
            </Link>
          )}

          {project.demoUrl && (
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </Link>
          )}
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {projectImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
            <Image
              src={projectImage || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <MarkdownRenderer content={project.content} />
      </div>
    </article>
  )
}
