"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { GlassCard } from "@/components/ui/glass-card"
import { TiltCard } from "@/components/ui/tilt-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getSafeImagePath } from "@/lib/image-utils"

interface HeroAction {
  text: string
  href: string
}

interface HeroSectionProps {
  title: string
  subtitle: string
  primaryAction: HeroAction
  secondaryAction: HeroAction
}

export function HeroSection({ title, subtitle, primaryAction, secondaryAction }: HeroSectionProps) {
  const profileImage = getSafeImagePath(
    "/victor-sabare-headshot.png",
    "/placeholder.svg?height=300&width=300&query=Victor Oketch Sabare professional headshot",
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-gradient-x" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-16 h-16 bg-secondary/10 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <ScrollReveal direction="up" delay={0.2}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Available for new projects</span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-6 leading-tight">
                <span className="gradient-text">{title}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  size="lg"
                  className="group magnetic ripple neu-raised hover:neu-inset transition-all duration-300"
                  asChild
                >
                  <Link href={primaryAction.href}>
                    {primaryAction.text}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group magnetic glass-card hover:bg-primary/5" asChild>
                  <Link href={secondaryAction.href}>
                    <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    {secondaryAction.text}
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal direction="up" delay={1.0}>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                {[
                  { value: "100+", label: "Articles Written" },
                  { value: "5+", label: "Power Apps Built" },
                  { value: "4.4/5", label: "Client Rating" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Image/Card */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <ScrollReveal direction="right" delay={0.6}>
              <TiltCard className="w-full max-w-sm lg:max-w-md">
                <GlassCard hover tilt glow className="p-6 lg:p-8">
                  <div className="relative">
                    {/* Profile Image Container */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto mb-6">
                      <motion.div
                        className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Image
                          src={profileImage || "/placeholder.svg"}
                          alt="Victor Oketch Sabare - Data Engineer & Analytics Specialist"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                          priority
                        />
                      </motion.div>

                      {/* Floating status indicator */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-background flex items-center justify-center shadow-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2">Victor Oketch Sabare</h3>
                      <p className="text-muted-foreground mb-6">Data Engineer & Analytics Specialist</p>

                      {/* Tech stack icons */}
                      <div className="flex justify-center gap-3">
                        {[
                          { icon: "🐍", label: "Python" },
                          { icon: "📊", label: "Power BI" },
                          { icon: "☁️", label: "AWS" },
                          { icon: "🤖", label: "Machine Learning" },
                        ].map((tech, index) => (
                          <motion.div
                            key={index}
                            className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl cursor-pointer"
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            title={tech.label}
                          >
                            {tech.icon}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
