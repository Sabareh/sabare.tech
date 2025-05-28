"use client"

import { type Experience } from "@/lib/content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

interface ExperiencePageClientProps {
  experiences: Experience[]
  error?: string
}

export default function ExperiencePageClient({ experiences, error }: ExperiencePageClientProps) {
  if (error) {
    return (
      <div className="container py-10">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }
  
  if (experiences.length === 0 && !error) {
     return (
      <div className="container py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Experience</h1>
          <p className="text-xl text-muted-foreground">My professional journey in data engineering and technology.</p>
        </div>
        <div className="text-center text-muted-foreground p-8 border border-dashed rounded-lg">
          <p className="text-lg">No experience found yet.</p>
          <p className="text-sm mt-2">Please check back later!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Experience</h1>
        <p className="text-xl text-muted-foreground">My professional journey in data engineering and technology.</p>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <Card key={experience.slug}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>{experience.position}</CardTitle>
                  <CardDescription className="text-lg font-medium text-foreground">
                    {experience.company}
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(experience.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Present"}
                    </span>
                  </div>
                  {experience.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Use dangerouslySetInnerHTML for HTML content from markdown */}
              <div 
                className="prose prose-gray dark:prose-invert max-w-none mb-4"
                dangerouslySetInnerHTML={{ __html: experience.content }}
              />

              {experience.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
