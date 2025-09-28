"use client"
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
import NextImage from "next/image"
import { ParallaxFloatingElements } from "@/components/parallax/parallax-floating-elements"
import { defaultFloatingElements } from "@/lib/floating-elements"
import { ALL_STATIC_IMAGES } from "@/lib/static-images"

interface HomePageClientProps {
        {/* Featured Blog Posts */}
        <Section className="py-20">
          <div className="container">
            <ScrollAnimation>
              <div className="text-center mb-12 space-y-4">
                {isMediumFeed && (
                  <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                    {typeof displayMediumCount === "number" && (
                      <span className="font-semibold text-foreground">{displayMediumCount} articles</span>
                    )}
                    <p className="max-w-xl text-balance">
                      These featured posts launch on Medium so you can read the full story where they were originally
                      published.
                    </p>
                    {mediumProfileUrl && (
                      <ModernButton variant="outline" size="sm" asChild>
                        <a href={mediumProfileUrl} target="_blank" rel="noopener noreferrer">
                          Read on Medium
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </ModernButton>
                    )}
                  </div>
                )}

                <Heading level={2} className="mb-2">
                  {isMediumFeed ? "Featured Posts" : "Latest Insights"}
                </Heading>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {isMediumFeed
                    ? "Fresh writing on data engineering, analytics, and architecture from my Medium publications."
                    : "Explore my latest thoughts on data engineering, architecture, and technology trends."}
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post, index) => {
                const imageUrl = getSafeImagePath(
                  post.coverImage,
                  "/placeholder.svg?height=400&width=600&query=" + encodeURIComponent(post.title || ""),
                )

                const isExternalPost = Boolean(post.externalUrl)
                const postHref = isExternalPost ? post.externalUrl! : "/blog/" + post.slug
                const actionLabel = isExternalPost ? "Read on Medium" : "Read More"

                return (
                  <ScrollAnimation key={post.slug} delay={index * 0.1}>
                    <ModernCard className="group h-full">
                      {imageUrl && (
                        <div className="relative aspect-video overflow-hidden rounded-t-lg">
                          <NextImage
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
                          <span className="text-muted-foreground">|</span>
                          <span>{post.readingTime}</span>
                        </div>
                        {post.source === "medium" && (
                          <Badge variant="outline" className="text-[11px] uppercase tracking-wide mb-2">
                            Medium
                          </Badge>
                        )}
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
                        <ModernButton variant="ghost" className="p-0 h-auto font-medium group/btn" asChild>
                          <Link
                            href={postHref}
                            target={isExternalPost ? "_blank" : undefined}
                            rel={isExternalPost ? "noopener noreferrer" : undefined}
                          >
                            {actionLabel}
                            {isExternalPost ? (
                              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1" />
                            ) : (
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            )}
                          </Link>
                        </ModernButton>
                      </div>
                    </ModernCard>
                  </ScrollAnimation>
                )
              })}
            </div>

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
                return (
                  <ScrollAnimation key={post.slug} delay={index * 0.1}>
                    <ModernCard className="group h-full">
                      {imageUrl && (
                        <div className="relative aspect-video overflow-hidden rounded-t-lg">
                          <NextImage
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
                          <span className="text-muted-foreground">|</span>
                          <span>{post.readingTime}</span>
                        </div>
                        {post.source === "medium" && (
                          <Badge variant="outline" className="text-[11px] uppercase tracking-wide mb-2">
                            Medium
                          </Badge>
                        )}
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
                        <ModernButton variant="ghost" className="p-0 h-auto font-medium group/btn" asChild>
                          <Link
                            href={postHref}
                            target={isExternalPost ? "_blank" : undefined}
                            rel={isExternalPost ? "noopener noreferrer" : undefined}
                          >
                            {actionLabel}
                            {isExternalPost ? (
                              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1" />
                            ) : (
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            )}
                          </Link>
                        </ModernButton>
                      </div>
                      </ModernCard>
                    </ScrollAnimation>
                  )
                })}
                })}
            </div>

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
                          <NextImage
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
                            <ModernButton size="default" variant="outline" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                Code
                              </a>
                            </ModernButton>
                          )}
                          {project.demoUrl && (
                            <ModernButton size="default" asChild>
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
                          <NextImage
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
