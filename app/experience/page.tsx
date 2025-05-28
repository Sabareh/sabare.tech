"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import { getAllExperience } from "@/lib/content"
import ExperiencePageClient from "./ExperiencePageClient" // New client component

export default async function ExperiencePage() {
  try {
    const experiences = await getAllExperience()
    return (
      <div className="container mx-auto px-4 py-8">
        <ExperiencePageClient experiences={experiences} />
      </div>
    )
  } catch (error) {
    console.error("Error loading experience data:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <ExperiencePageClient experiences={[]} error="Failed to load experience" />
      </div>
    )
  }
}
