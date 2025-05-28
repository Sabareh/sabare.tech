"use client"

import { type Project } from "@/lib/content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getSafeImagePath } from "@/lib/image-utils"

interface ProjectsClientProps {
  projects: Project[]
  error?: string
}

export default function ProjectsClient({ projects, error }: ProjectsClientProps) {
  if (error) {
    return (
      <div className="container py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">
            A collection of data engineering projects and solutions I've built.
          </p>
        </div>
        <div className="text-center text-red-500 p-8 border border-red-200 rounded-lg bg-red-50">
          <p className="text-lg font-medium">Unable to load projects</p>
          <p className="text-sm text-red-600 mt-2">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="container py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">
            A collection of data engineering projects and solutions I've built.
          </p>
        </div>
        <div className="text-center text-muted-foreground p-8 border border-dashed rounded-lg">
          <p className="text-lg">No projects found</p>
          <p className="text-sm mt-2">Check back later for new projects!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground">
          A collection of data engineering projects and solutions I've built.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const imageUrl = getSafeImagePath(
            project.imageUrl,
            `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(project.title)}`,
          )

          return (
            <Card key={project.slug} className="overflow-hidden group hover:shadow-lg transition-shadow">
              {imageUrl && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/projects/${project.slug}`}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                  
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  
                  {project.demoUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
