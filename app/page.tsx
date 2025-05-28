"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { TestimonialsSection } from "@/components/testimonials-section"
import { QuickActions } from "@/components/quick-actions"
import { HeroSection } from "@/components/hero-section"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { ModernCard } from "@/components/ui/modern-card"
import { ModernButton } from "@/components/ui/modern-button"

const skills = [
  { name: "Python", level: 95, icon: "🐍" },
  { name: "SQL", level: 90, icon: "🗃️" },
  { name: "Apache Spark", level: 85, icon: "⚡" },
  { name: "AWS", level: 88, icon: "☁️" },
  { name: "Docker", level: 82, icon: "🐳" },
  { name: "Kubernetes", level: 78, icon: "⚙️" },
]

const stats = [
  { label: "Data Pipelines Built", value: "50+" },
  { label: "TB of Data Processed", value: "100+" },
  { label: "Years Experience", value: "5+" },
  { label: "Cloud Platforms", value: "3" },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        title="Data Engineer"
        subtitle="Building scalable data infrastructure and pipelines that transform raw data into actionable insights"
        primaryAction={{
          text: "View My Work",
          href: "/projects",
        }}
        secondaryAction={{
          text: "Download Resume",
          href: "/resume",
        }}
      />

      {/* Stats Section */}
      <Section className="py-20 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Quick Actions Section */}
      <Section className="py-20">
        <Heading title="Quick Actions" description="Get started quickly with these common actions" align="center" />

        <QuickActions />
      </Section>

      {/* Skills Section */}
      <Section className="py-20 bg-muted/30">
        <Heading
          title="Technical Expertise"
          description="Specialized in modern data engineering tools and cloud platforms"
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ModernCard
                title={skill.name}
                icon={<span className="text-2xl">{skill.icon}</span>}
                badges={[`${skill.level}%`]}
              >
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                  />
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <Section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 font-playfair">Let's Build Something Amazing</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to transform your data infrastructure? Let's discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ModernButton size="lg" withArrow asChild>
              <Link href="/contact">Get In Touch</Link>
            </ModernButton>
            <ModernButton size="lg" variant="outline" asChild>
              <Link href="/blog">Read My Blog</Link>
            </ModernButton>
          </div>
        </motion.div>
      </Section>

      {/* Floating Quick Actions */}
      <QuickActions compact className="lg:hidden" />
    </div>
  )
}
