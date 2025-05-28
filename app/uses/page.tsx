"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ExternalLink,
  Code,
  Cloud,
  Palette,
  Monitor,
  Zap,
  Shield,
  Settings,
  Package,
  Terminal,
  Layers,
} from "lucide-react"
import Link from "next/link"

interface Technology {
  name: string
  version?: string
  description: string
  website: string
  icon?: string
  category: string
  featured?: boolean
  reason: string
}

interface Category {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  technologies: Technology[]
}

const categories: Category[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Technologies and frameworks used for building the user interface and user experience",
    icon: Code,
    technologies: [
      {
        name: "Next.js",
        version: "14.0.3",
        description:
          "React framework with App Router for server-side rendering, static site generation, and full-stack capabilities",
        website: "https://nextjs.org",
        category: "Framework",
        featured: true,
        reason: "Provides excellent developer experience with built-in optimization, routing, and deployment features",
      },
      {
        name: "React",
        version: "18.x",
        description: "JavaScript library for building user interfaces with component-based architecture",
        website: "https://react.dev",
        category: "Library",
        featured: true,
        reason: "Industry standard for building modern, interactive web applications",
      },
      {
        name: "TypeScript",
        version: "5.x",
        description: "Typed superset of JavaScript that compiles to plain JavaScript for better development experience",
        website: "https://www.typescriptlang.org",
        category: "Language",
        featured: true,
        reason: "Provides type safety, better IDE support, and improved code maintainability",
      },
      {
        name: "Tailwind CSS",
        version: "3.3.0",
        description: "Utility-first CSS framework for rapidly building custom user interfaces",
        website: "https://tailwindcss.com",
        category: "Styling",
        featured: true,
        reason: "Enables rapid prototyping and consistent design system implementation",
      },
      {
        name: "Framer Motion",
        version: "10.16.4",
        description: "Production-ready motion library for React with declarative animations",
        website: "https://www.framer.com/motion",
        category: "Animation",
        reason: "Provides smooth, performant animations that enhance user experience",
      },
      {
        name: "Radix UI",
        version: "1.0.2",
        description: "Low-level UI primitives with accessibility, customization and developer experience in mind",
        website: "https://www.radix-ui.com",
        category: "Components",
        reason: "Ensures accessibility compliance and provides unstyled, customizable components",
      },
      {
        name: "shadcn/ui",
        description: "Beautifully designed components built on top of Radix UI and Tailwind CSS",
        website: "https://ui.shadcn.com",
        category: "Components",
        reason: "Accelerates development with pre-built, customizable components",
      },
      {
        name: "Lucide React",
        version: "0.292.0",
        description: "Beautiful & consistent icon toolkit made by the community",
        website: "https://lucide.dev",
        category: "Icons",
        reason: "Provides consistent, high-quality icons with React components",
      },
    ],
  },
  {
    id: "content",
    name: "Content Management",
    description: "Tools and libraries for handling content creation, parsing, and rendering",
    icon: Package,
    technologies: [
      {
        name: "React Markdown",
        version: "9.0.1",
        description: "Markdown component for React that safely renders markdown as React components",
        website: "https://github.com/remarkjs/react-markdown",
        category: "Content",
        featured: true,
        reason: "Enables writing blog posts and documentation in Markdown format",
      },
      {
        name: "remark-gfm",
        version: "4.0.0",
        description: "Plugin to support GitHub Flavored Markdown in remark",
        website: "https://github.com/remarkjs/remark-gfm",
        category: "Content",
        reason: "Adds support for tables, strikethrough, task lists, and other GitHub features",
      },
      {
        name: "rehype-slug",
        version: "6.0.0",
        description: "Plugin to add id attributes to headings for anchor links",
        website: "https://github.com/rehypejs/rehype-slug",
        category: "Content",
        reason: "Automatically generates anchor links for headings in blog posts",
      },
      {
        name: "rehype-raw",
        version: "7.0.0",
        description: "Plugin to parse the tree again with raw HTML support",
        website: "https://github.com/rehypejs/rehype-raw",
        category: "Content",
        reason: "Allows embedding HTML within Markdown content when needed",
      },
      {
        name: "gray-matter",
        version: "4.0.3",
        description: "Parse front-matter from strings or files",
        website: "https://github.com/jonschlinkert/gray-matter",
        category: "Content",
        reason: "Parses YAML front matter from Markdown files for metadata",
      },
    ],
  },
  {
    id: "styling",
    name: "Styling & Design",
    description: "Tools and utilities for creating beautiful, responsive designs",
    icon: Palette,
    technologies: [
      {
        name: "Tailwind CSS Typography",
        version: "0.5.10",
        description: "Plugin that provides a set of prose classes for beautiful typographic defaults",
        website: "https://tailwindcss.com/docs/typography-plugin",
        category: "Styling",
        reason: "Provides beautiful typography styles for blog content and documentation",
      },
      {
        name: "tailwindcss-animate",
        version: "1.0.7",
        description: "Plugin that adds animation utilities to Tailwind CSS",
        website: "https://github.com/jamiebuilds/tailwindcss-animate",
        category: "Animation",
        reason: "Adds pre-built animation classes for common UI animations",
      },
      {
        name: "class-variance-authority",
        version: "0.7.0",
        description: "CVA helps you create a consistent, reusable, and atomic design system",
        website: "https://cva.style",
        category: "Utilities",
        reason: "Manages component variants and ensures consistent styling patterns",
      },
      {
        name: "clsx",
        version: "2.0.0",
        description: "Tiny utility for constructing className strings conditionally",
        website: "https://github.com/lukeed/clsx",
        category: "Utilities",
        reason: "Simplifies conditional CSS class application",
      },
      {
        name: "tailwind-merge",
        version: "2.0.0",
        description: "Utility function to efficiently merge Tailwind CSS classes",
        website: "https://github.com/dcastil/tailwind-merge",
        category: "Utilities",
        reason: "Prevents CSS class conflicts when merging Tailwind classes",
      },
    ],
  },
  {
    id: "theming",
    name: "Theming & Accessibility",
    description: "Tools for managing themes, dark mode, and accessibility features",
    icon: Settings,
    technologies: [
      {
        name: "next-themes",
        version: "0.2.1",
        description: "Perfect dark mode in 2 lines of code. Support System preference and any other theme!",
        website: "https://github.com/pacocoursey/next-themes",
        category: "Theming",
        featured: true,
        reason: "Provides seamless dark/light mode switching with system preference detection",
      },
      {
        name: "CSS Custom Properties",
        description: "Native CSS variables for dynamic theming and consistent design tokens",
        website: "https://developer.mozilla.org/en-US/docs/Web/CSS/--*",
        category: "Theming",
        reason: "Enables dynamic theme switching and maintains design consistency",
      },
    ],
  },
  {
    id: "deployment",
    name: "Deployment & Hosting",
    description: "Platforms and services used for deploying and hosting the website",
    icon: Cloud,
    technologies: [
      {
        name: "Vercel",
        description: "Frontend cloud platform for static sites and serverless functions with global CDN",
        website: "https://vercel.com",
        category: "Hosting",
        featured: true,
        reason: "Provides seamless deployment, excellent performance, and built-in analytics",
      },
      {
        name: "Vercel Analytics",
        description: "Privacy-friendly analytics built for the modern web",
        website: "https://vercel.com/analytics",
        category: "Analytics",
        reason: "Tracks website performance and user engagement without compromising privacy",
      },
      {
        name: "Vercel Edge Network",
        description: "Global CDN that serves content from the edge closest to users",
        website: "https://vercel.com/docs/concepts/edge-network",
        category: "CDN",
        reason: "Ensures fast loading times worldwide through edge caching",
      },
    ],
  },
  {
    id: "development",
    name: "Development Tools",
    description: "Tools and utilities that enhance the development workflow",
    icon: Terminal,
    technologies: [
      {
        name: "ESLint",
        version: "8.x",
        description: "Pluggable JavaScript linter for identifying and reporting patterns in code",
        website: "https://eslint.org",
        category: "Linting",
        reason: "Maintains code quality and consistency across the project",
      },
      {
        name: "Prettier",
        description: "Opinionated code formatter that enforces consistent style",
        website: "https://prettier.io",
        category: "Formatting",
        reason: "Automatically formats code to maintain consistent styling",
      },
      {
        name: "Git",
        description: "Distributed version control system for tracking changes in source code",
        website: "https://git-scm.com",
        category: "Version Control",
        featured: true,
        reason: "Essential for version control and collaboration",
      },
      {
        name: "GitHub",
        description: "Web-based hosting service for version control using Git",
        website: "https://github.com",
        category: "Repository",
        reason: "Hosts the source code and enables collaboration",
      },
      {
        name: "VS Code",
        description: "Lightweight but powerful source code editor with extensive extension support",
        website: "https://code.visualstudio.com",
        category: "Editor",
        featured: true,
        reason: "Primary development environment with excellent TypeScript and React support",
      },
    ],
  },
  {
    id: "performance",
    name: "Performance & SEO",
    description: "Tools and techniques for optimizing website performance and search engine visibility",
    icon: Zap,
    technologies: [
      {
        name: "Next.js Image Optimization",
        description: "Built-in image optimization with automatic WebP conversion and lazy loading",
        website: "https://nextjs.org/docs/basic-features/image-optimization",
        category: "Performance",
        featured: true,
        reason: "Automatically optimizes images for better performance and user experience",
      },
      {
        name: "Next.js Font Optimization",
        description: "Automatic font optimization with zero layout shift",
        website: "https://nextjs.org/docs/basic-features/font-optimization",
        category: "Performance",
        reason: "Optimizes font loading to prevent layout shifts and improve Core Web Vitals",
      },
      {
        name: "Open Graph Protocol",
        description: "Protocol that enables any web page to become a rich object in a social graph",
        website: "https://ogp.me",
        category: "SEO",
        reason: "Improves social media sharing with rich previews",
      },
      {
        name: "JSON-LD",
        description: "Method of encoding linked data using JSON for structured data",
        website: "https://json-ld.org",
        category: "SEO",
        reason: "Provides structured data for better search engine understanding",
      },
      {
        name: "Sitemap.xml",
        description: "XML file that lists website URLs for search engine crawlers",
        website: "https://www.sitemaps.org",
        category: "SEO",
        reason: "Helps search engines discover and index website content",
      },
    ],
  },
  {
    id: "hardware",
    name: "Hardware & Setup",
    description: "Physical hardware and equipment used for development",
    icon: Monitor,
    technologies: [
      {
        name: "MacBook Pro M2",
        version: "16-inch, 2023",
        description: "Primary development machine with Apple Silicon for excellent performance and battery life",
        website: "https://www.apple.com/macbook-pro",
        category: "Computer",
        featured: true,
        reason: "Provides excellent performance for development with great battery life",
      },
      {
        name: "Dell UltraSharp U2720Q",
        version: "27-inch 4K",
        description: "4K monitor for detailed design work and code editing",
        website: "https://www.dell.com/en-us/work/shop/dell-ultrasharp-27-4k-usb-c-monitor-u2720q",
        category: "Display",
        reason: "High resolution display for detailed work and multiple windows",
      },
      {
        name: "Magic Keyboard",
        description: "Apple's wireless keyboard with scissor mechanism",
        website: "https://www.apple.com/magic-keyboard",
        category: "Input",
        reason: "Comfortable typing experience for long coding sessions",
      },
      {
        name: "Magic Mouse",
        description: "Apple's wireless mouse with Multi-Touch surface",
        website: "https://www.apple.com/magic-mouse",
        category: "Input",
        reason: "Seamless integration with macOS gestures and workflows",
      },
    ],
  },
  {
    id: "software",
    name: "Software & Applications",
    description: "Applications and software tools used for development and productivity",
    icon: Layers,
    technologies: [
      {
        name: "Figma",
        description: "Collaborative interface design tool for creating mockups and prototypes",
        website: "https://www.figma.com",
        category: "Design",
        featured: true,
        reason: "Primary tool for UI/UX design and prototyping",
      },
      {
        name: "Arc Browser",
        description: "Modern web browser with innovative tab management and developer tools",
        website: "https://arc.net",
        category: "Browser",
        reason: "Excellent developer tools and modern browsing experience",
      },
      {
        name: "iTerm2",
        description: "Terminal emulator for macOS with advanced features",
        website: "https://iterm2.com",
        category: "Terminal",
        reason: "Enhanced terminal experience with split panes and customization",
      },
      {
        name: "Oh My Zsh",
        description: "Framework for managing Zsh configuration with themes and plugins",
        website: "https://ohmyz.sh",
        category: "Shell",
        reason: "Improves command line productivity with useful plugins and themes",
      },
      {
        name: "Notion",
        description: "All-in-one workspace for notes, docs, and project management",
        website: "https://www.notion.so",
        category: "Productivity",
        reason: "Organizes project documentation, ideas, and planning",
      },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">Uses</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of the technologies, tools, and hardware I use to build modern web applications and
            manage my development workflow.
          </p>
        </motion.div>

        {/* Featured Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Core Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories
              .flatMap((cat) => cat.technologies)
              .filter((tech) => tech.featured)
              .slice(0, 8)
              .map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="glass-effect hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {tech.name}
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={tech.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardTitle>
                      {tech.version && <Badge variant="outline">{tech.version}</Badge>}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Detailed Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">{category.name.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  {category.technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="glass-effect">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {tech.name}
                                {tech.featured && <Badge variant="secondary">Featured</Badge>}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                {tech.version && <Badge variant="outline">{tech.version}</Badge>}
                                <Badge variant="outline">{tech.category}</Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={tech.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Website
                              </Link>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base mb-3">{tech.description}</CardDescription>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-sm">
                              <strong>Why I use it:</strong> {tech.reason}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Tech Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack Overview</h2>
          <Card className="glass-effect">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Code className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <p className="text-sm text-muted-foreground">
                    Next.js 14 with React 18, TypeScript, and Tailwind CSS for modern, type-safe development
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimized images, fonts, and animations with Framer Motion for smooth user experience
                  </p>
                </div>
                <div className="text-center">
                  <Cloud className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Deployment</h3>
                  <p className="text-sm text-muted-foreground">
                    Vercel hosting with global CDN, automatic deployments, and built-in analytics
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    ESLint, Prettier, and TypeScript for code quality, consistency, and type safety
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Questions About My Setup?</h2>
          <p className="text-muted-foreground mb-6">
            Feel free to reach out if you have questions about any of the tools or technologies I use.
          </p>
          <Button asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
