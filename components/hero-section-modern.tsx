"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Linkedin, Mail, Code, Database, Cloud } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ParallaxBackground } from "@/components/parallax/parallax-background"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { ParallaxFloatingElements } from "@/components/parallax/parallax-floating-elements"
import { ScrollAnimation } from "@/components/scroll-animation"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { MagneticCard } from "@/components/ui/magnetic-card"

const floatingElements = [
  {
    id: "code-1",
    icon: <Code className="w-8 h-8 text-blue-400/30" />,
    initialX: "10%",
    initialY: "20%",
    speed: 0.3,
    rotation: 45,
    opacity: 0.4,
  },
  {
    id: "database-1",
    icon: <Database className="w-12 h-12 text-green-400/20" />,
    initialX: "80%",
    initialY: "15%",
    speed: 0.5,
    rotation: -30,
    opacity: 0.3,
  },
  {
    id: "cloud-1",
    icon: <Cloud className="w-10 h-10 text-purple-400/25" />,
    initialX: "15%",
    initialY: "70%",
    speed: 0.4,
    rotation: 60,
    opacity: 0.35,
  },
  {
    id: "code-2",
    icon: <Code className="w-6 h-6 text-cyan-400/40" />,
    initialX: "85%",
    initialY: "60%",
    speed: 0.6,
    rotation: -45,
    opacity: 0.5,
  },
  {
    id: "database-2",
    icon: <Database className="w-8 h-8 text-orange-400/30" />,
    initialX: "5%",
    initialY: "45%",
    speed: 0.35,
    rotation: 90,
    opacity: 0.4,
  },
  {
    id: "cloud-2",
    icon: <Cloud className="w-14 h-14 text-pink-400/20" />,
    initialX: "90%",
    initialY: "35%",
    speed: 0.25,
    rotation: -60,
    opacity: 0.25,
  },
]

export function HeroSectionModern() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background - Independent of magnetic effects */}
      <ParallaxBackground speed={0.5} className="absolute inset-0 -z-10" overlay overlayOpacity={0.1}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
      </ParallaxBackground>

      {/* Floating Elements - Parallax only, no magnetic scroll */}
      <ParallaxFloatingElements elements={floatingElements} />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content with Scroll Animations */}
          <div className="space-y-8">
            <ScrollAnimation direction="fade" delay={0.1}>
              <Badge variant="outline" className="mb-4 glass-effect">
                Available for new opportunities
              </Badge>
            </ScrollAnimation>

            <div className="space-y-6">
              <ScrollAnimation direction="up" delay={0.2} stagger staggerDelay={0.1}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">Victor Oketch</span>
                  <span className="block gradient-text">Sabare</span>
                </h1>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={0.4}>
                <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
                  Data Engineer & Analytics Specialist
                </p>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={0.6}>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Transforming raw data into actionable insights through scalable pipelines, advanced analytics, and
                  innovative solutions. Specialized in cloud-native architectures and real-time processing systems.
                </p>
              </ScrollAnimation>
            </div>

            <ScrollAnimation direction="up" delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  size="lg"
                  strength={25}
                  radius={150}
                  scale={1.05}
                  enableRotation={true}
                  rotationStrength={3}
                  glowOnHover={true}
                  asChild
                >
                  <Link href="/contact">
                    Let's Work Together
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </MagneticButton>

                <MagneticButton
                  size="lg"
                  variant="outline"
                  strength={25}
                  radius={150}
                  scale={1.05}
                  enableRotation={true}
                  rotationStrength={3}
                  asChild
                >
                  <Link href="/resume">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Link>
                </MagneticButton>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={1.0}>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Connect with me:</span>
                <div className="flex gap-3">
                  <Link
                    href="https://github.com/victorokech"
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/victor-sabare"
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="mailto:victor@example.com"
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column - Image/Visual with Parallax */}
          <div className="relative">
            <ParallaxContainer speed={0.2} scale rotate className="relative">
              <ScrollAnimation direction="scale" delay={0.5}>
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative z-10">
                    <Image
                      src="/lightbulb-wooden-surface.png"
                      alt="Innovation and Ideas - Lightbulb on Wooden Surface"
                      width={600}
                      height={600}
                      className="w-full h-auto rounded-2xl shadow-2xl"
                      priority
                    />
                  </div>

                  {/* Decorative Elements with Parallax */}
                  <ParallaxContainer speed={0.4} direction="down" className="absolute -top-8 -right-8 z-20">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-xl" />
                  </ParallaxContainer>

                  <ParallaxContainer speed={0.3} direction="up" className="absolute -bottom-8 -left-8 z-20">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-600 rounded-full opacity-15 blur-xl" />
                  </ParallaxContainer>
                </div>
              </ScrollAnimation>
            </ParallaxContainer>

            {/* Stats Cards with Magnetic Effects (not scroll-based) */}
            <ScrollAnimation direction="left" delay={0.8}>
              <MagneticCard
                className="absolute -bottom-6 -left-6 z-30 glass-effect rounded-xl p-4 backdrop-blur-sm"
                strength={15}
                radius={200}
                enableRotation={true}
                rotationStrength={3}
                glowOnHover={true}
              >
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </MagneticCard>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={1.0}>
              <MagneticCard
                className="absolute -top-6 -right-6 z-30 glass-effect rounded-xl p-4 backdrop-blur-sm"
                strength={15}
                radius={200}
                enableRotation={true}
                rotationStrength={3}
                glowOnHover={true}
              >
                <div className="text-2xl font-bold gradient-text">100TB+</div>
                <div className="text-sm text-muted-foreground">Data Processed</div>
              </MagneticCard>
            </ScrollAnimation>
          </div>
        </div>

        {/* Scroll Indicator with Parallax */}
        <ParallaxContainer speed={0.1} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </ParallaxContainer>
      </div>
    </section>
  )
}
