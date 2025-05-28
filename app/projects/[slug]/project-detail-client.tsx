"use client"

import { type Project } from "@/lib/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getSafeImagePath } from "@/lib/image-utils"

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const imageUrl = getSafeImagePath(
    project.imageUrl,
    `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(project.title)}`,
  )

  return (
    <div className="container py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {project.githubUrl && (
              <Button asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="outline" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </header>

        {imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </CardContent>
        </Card>
      </article>
    </div>
  )
}
