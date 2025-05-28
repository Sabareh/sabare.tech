"use client"

import { useEffect, useState } from "react"
import { getAllExperience, type Experience } from "@/lib/content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadExperience() {
      try {
        setLoading(true)
        const allExperience = await getAllExperience()
        setExperiences(allExperience)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load experience")
      } finally {
        setLoading(false)
      }
    }

    loadExperience()
  }, [])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="text-center">Loading experience...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="text-center text-red-500">Error: {error}</div>
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
              <p className="text-muted-foreground mb-4">{experience.description}</p>

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
