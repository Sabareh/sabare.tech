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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <TestimonialCard key={t.slug} {...t} />
      ))}
    </div>
  )
}
