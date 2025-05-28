"use client"

import { useEffect, useState } from "react"
import { getAllTestimonials, type Testimonial } from "@/lib/content"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { Star, Building2, Users, TrendingUp } from "lucide-react"

const stats = [
  { label: "Client Satisfaction", value: "100%", icon: Star },
  { label: "Projects Delivered", value: "50+", icon: Building2 },
  { label: "Team Members Trained", value: "200+", icon: Users },
  { label: "Performance Improvement", value: "75%", icon: TrendingUp },
]

const companies = [
  { name: "TechFlow Solutions", logo: "/techflow-logo.png" },
  { name: "DataDriven Corp", logo: "/datadriven-logo.png" },
  { name: "InsightTech", logo: "/insighttech-logo.png" },
  { name: "Analytics Pro", logo: "/analyticspro-logo.png" },
  { name: "CloudScale Systems", logo: "/cloudscale-logo.png" },
  { name: "StreamFlow Inc", logo: "/streamflow-logo.png" },
  { name: "DataVault", logo: "/datavault-logo.png" },
  { name: "PipelineWorks", logo: "/pipelineworks-logo.png" },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true)
        const allTestimonials = await getAllTestimonials()
        setTestimonials(allTestimonials)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load testimonials")
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="text-center">Loading testimonials...</div>
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Testimonials</h1>
        <p className="text-xl text-muted-foreground">What colleagues and clients say about working with me.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.slug}
            name={testimonial.name}
            position={testimonial.position}
            company={testimonial.company}
            content={testimonial.content}
            rating={testimonial.rating}
            imageUrl={testimonial.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
