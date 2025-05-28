"use client"

import React from "react"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import type { Testimonial } from "@/lib/content"

interface TestimonialPageClientProps {
  testimonials: Testimonial[]
  error?: string
}

export default function TestimonialPageClient({
  testimonials,
  error,
}: TestimonialPageClientProps) {
  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }
  
  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Client Testimonials</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Hear what clients and colleagues have to say about working with me. These testimonials reflect the impact of our collaborative efforts in delivering data-driven solutions.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.slug} {...t} />
        ))}
      </div>
    </>
  )
}
