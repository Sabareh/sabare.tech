"use client"

import { getAllTestimonials } from "@/lib/content"
import TestimonialPageClient from "./TestimonialPageClient"

export default async function TestimonialsPage() {
  try {
    const testimonials = await getAllTestimonials()
    return (
      <div className="container mx-auto px-4 py-8">
        <TestimonialPageClient testimonials={testimonials} />
      </div>
    )
  } catch (error) {
    console.error("Error loading testimonials:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <TestimonialPageClient
          testimonials={[]}
          error="Failed to load testimonials"
        />
      </div>
    )
  }
}
