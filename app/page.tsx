"use client"

import { useEffect, useState } from "react"
import { getFeaturedBlogPosts, getAllProjects, type BlogPost, type Project } from "@/lib/content"
import { HeroCodeThemed } from "@/components/hero-code-themed"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { ParallaxBackground } from "@/components/parallax/parallax-background"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { ModernCard } from "@/components/ui/modern-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ParallaxFloatingElements } from "@/components/parallax/parallax-floating-elements"
import { defaultFloatingElements } from "@/lib/floating-elements"

// Static image imports - add your actual images here
const staticImages = [
  "/data-pipeline-architecture.png",
  "/data-mesh-architecture.png",
  "/data-transformation-workflow.png",
  "/kubernetes-cluster-diagram.png",
  "/data-quality-dashboard.png",
  "/streaming-analytics-architecture.png",
  "/professional-headshot.png",
  "/tech-innovations-logo.png",
  "/data-systems-logo.png",
  "/analytics-edge-logo.png",
  "/data-insights-logo.png",
]

// Client-side image utility function
function getSafeImagePath(imagePath: string | undefined, fallback: string): string {
  if (!imagePath || imagePath.trim() === "") {
    return fallback
  }
  return imagePath
}

// Check if image exists by trying to load it
function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [posts, allProjects] = await Promise.all([getFeaturedBlogPosts(), getAllProjects()])
        setFeaturedPosts(posts)
        setProjects(allProjects.filter((p) => p.featured).slice(0, 3))
      } catch (error) {
        console.error("Error loading home data:", error)
      } finally {
        setLoading(false)
      }
    }

    async function loadStaticImages() {
      try {
        // Check which static images actually exist
        const imageChecks = await Promise.all(
          staticImages.map(async (imagePath) => {
            const exists = await checkImageExists(imagePath)
            return exists ? imagePath : null
          }),
        )

        const existingImages = imageChecks.filter((img): img is string => img !== null)
        setAvailableImages(existingImages)
      } catch (error) {
        console.warn("Error checking static images:", error)
        setAvailableImages([])
      } finally {
        setImagesLoaded(true)
      }
    }

    loadHomeData()
    loadStaticImages()
  }, [])

  return (
    <div className="min-h-screen">
      <ParallaxContainer>
        <ParallaxBackground />
        <ParallaxFloatingElements elements={defaultFloatingElements} />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <HeroCodeThemed />
        </section>

        {/* Stats Section */}
        <ScrollAnimation>
          <StatsSection />
        </ScrollAnimation>

        {/* Featured Blog Posts */}
        <Section className="py-20">
          <div className="container">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <Heading level={2} className="mb-4">
                  Latest Insights
                </Heading>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore my latest thoughts on data engineering, architecture, and technology trends.
                </p>
              </div>
            </ScrollAnimation>

            {loading ? (
              <div className="text-center">Loading featured posts...</div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, index) => {
                  const imageUrl = getSafeImagePath(
                    post.coverImage,
                    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(post.title)}`,
                  )

                  return (
                    <ScrollAnimation key={post.slug} delay={index * 0.1}>
                      <ModernCard className="group h-full">
                        {imageUrl && (
                          <div className="relative aspect-video overflow-hidden rounded-t-lg">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <ModernButton variant="ghost" className="p-0 h-auto font-medium group/btn">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </ModernButton>
                          </Link>
                        </div>
                      </ModernCard>
                    </ScrollAnimation>
                  )
                })}
              </div>
            )}

            <ScrollAnimation delay={0.3}>
              <div className="text-center mt-12">
                <Link href="/blog">
                  <ModernButton size="lg">
                    View All Posts
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ModernButton>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </Section>

        {/* Featured Projects */}
        <Section className="py-20 bg-muted/30">
          <div className="container">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <Heading level={2} className="mb-4">
                  Featured Projects
                </Heading>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  A showcase of data engineering solutions and platforms I've architected and built.
                </p>
              </div>
            </ScrollAnimation>

            {loading ? (
              <div className="text-center">Loading featured projects...</div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => {
                  const imageUrl = getSafeImagePath(
                    project.imageUrl,
                    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(project.title)}`,
                  )

                  return (
                    <ScrollAnimation key={project.slug} delay={index * 0.1}>
                      <ModernCard className="group h-full">
                        {imageUrl && (
                          <div className="relative aspect-video overflow-hidden rounded-t-lg">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {project.githubUrl && (
                              <ModernButton size="sm" variant="outline" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 h-4 w-4" />
                                  Code
                                </a>
                              </ModernButton>
                            )}
                            {project.demoUrl && (
                              <ModernButton size="sm" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Demo
                                </a>
                              </ModernButton>
                            )}
                          </div>
                        </div>
                      </ModernCard>
                    </ScrollAnimation>
                  )
                })}
              </div>
            )}

            <ScrollAnimation delay={0.3}>
              <div className="text-center mt-12">
                <Link href="/projects">
                  <ModernButton size="lg">
                    View All Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ModernButton>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </Section>

        {/* Static Image Gallery Section */}
        {imagesLoaded && availableImages.length > 0 && (
          <Section className="py-20">
            <div className="container">
              <ScrollAnimation>
                <div className="text-center mb-12">
                  <Heading level={2} className="mb-4">
                    Project Gallery
                  </Heading>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Visual showcase of data engineering projects and architectures.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableImages.map((imagePath, index) => {
                  // Extract filename for alt text
                  const filename =
                    imagePath
                      .split("/")
                      .pop()
                      ?.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, "") || "Project image"
                  const altText = filename.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

                  return (
                    <ScrollAnimation key={imagePath} delay={index * 0.1}>
                      <ModernCard className="group overflow-hidden">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={imagePath || "/placeholder.svg"}
                            alt={altText}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-sm text-center">{altText}</h3>
                        </div>
                      </ModernCard>
                    </ScrollAnimation>
                  )
                })}
              </div>
            </div>
          </Section>
        )}

        {/* Testimonials */}
        <ScrollAnimation>
          <TestimonialsSection />
        </ScrollAnimation>
      </ParallaxContainer>
    </div>
  )
}
