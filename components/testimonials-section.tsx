"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { ModernButton } from "@/components/ui/modern-button"

const featuredTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechFlow Solutions",
    companyLogo: "/techflow-logo.png",
    avatar: "/sarah-chen-avatar.png",
    rating: 5,
    content:
      "Working with this data engineer transformed our entire data infrastructure. They built a scalable pipeline that processes 10TB+ daily and reduced our processing time by 75%.",
    project: "Real-time Data Pipeline",
    results: ["75% faster processing", "10TB+ daily capacity", "99.9% uptime"],
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO",
    company: "DataDriven Corp",
    companyLogo: "/datadriven-logo.png",
    avatar: "/michael-rodriguez-avatar.png",
    rating: 5,
    content:
      "Exceptional work on our data warehouse migration to AWS. The new architecture handles our growing data needs perfectly, and the cost optimization strategies saved us 40% on cloud expenses.",
    project: "AWS Data Warehouse Migration",
    results: ["40% cost reduction", "5x better performance", "Zero downtime migration"],
  },
]

interface TestimonialsSectionProps {
  showAll?: boolean
  className?: string
}

export function TestimonialsSection({ showAll = false, className = "" }: TestimonialsSectionProps) {
  const testimonials = showAll ? featuredTestimonials : featuredTestimonials.slice(0, 2)

  return (
    <Section className={className}>
      <Heading
        title="Trusted by Industry Leaders"
        description="See how I've helped companies transform their data infrastructure and drive business growth"
        badge="Client Success"
        align="center"
      />

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TestimonialCard
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              companyLogo={testimonial.companyLogo}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              content={testimonial.content}
              project={testimonial.project}
              results={testimonial.results}
            />
          </motion.div>
        ))}
      </div>

      {!showAll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <ModernButton variant="outline" size="lg" withArrow asChild>
            <Link href="/testimonials">View All Testimonials</Link>
          </ModernButton>
        </motion.div>
      )}
    </Section>
  )
}
