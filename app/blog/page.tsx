"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAllBlogPosts } from "@/lib/content"

// This would normally come from your data fetching function
// For demo purposes, we're defining it here
// const blogPosts = [
//   {
//     slug: "building-real-time-data-pipelines",
//     title: "Building Real-Time Data Pipelines with Kafka and Spark",
//     excerpt:
//       "Learn how to design and implement scalable real-time data pipelines using Apache Kafka and Spark Streaming for high-throughput event processing.",
//     date: "2023-11-15",
//     readingTime: "12 min read",
//     coverImage: "/data-pipeline-architecture.png",
//     tags: ["Apache Kafka", "Spark Streaming", "Real-time Processing", "Data Engineering"],
//     featured: true,
//   },
//   {
//     slug: "data-mesh-architecture",
//     title: "Implementing a Data Mesh Architecture for Enterprise Scale",
//     excerpt:
//       "Explore how data mesh architecture can transform your organization's approach to data, enabling domain-oriented ownership and self-service analytics.",
//     date: "2023-10-22",
//     readingTime: "15 min read",
//     coverImage: "/data-mesh-architecture.png",
//     tags: ["Data Mesh", "Data Architecture", "Domain-Driven Design", "Data Governance"],
//     featured: true,
//   },
//   {
//     slug: "dbt-for-analytics-engineering",
//     title: "Transforming Your Data Warehouse with dbt",
//     excerpt:
//       "A comprehensive guide to using dbt (data build tool) to transform your data warehouse into a reliable, well-tested, and documented analytics environment.",
//     date: "2023-09-18",
//     readingTime: "10 min read",
//     coverImage: "/data-transformation-workflow.png",
//     tags: ["dbt", "Analytics Engineering", "Data Warehouse", "SQL"],
//   },
//   {
//     slug: "kubernetes-for-data-engineers",
//     title: "Kubernetes for Data Engineers: A Practical Guide",
//     excerpt:
//       "Learn how to leverage Kubernetes to orchestrate your data infrastructure, from deploying data processing jobs to managing stateful applications.",
//     date: "2023-08-05",
//     readingTime: "14 min read",
//     coverImage: "/kubernetes-cluster-diagram.png",
//     tags: ["Kubernetes", "Container Orchestration", "Infrastructure", "DevOps"],
//   },
//   {
//     slug: "data-quality-monitoring",
//     title: "Building a Robust Data Quality Monitoring System",
//     excerpt:
//       "Discover how to implement automated data quality monitoring to catch issues before they impact your analytics and machine learning models.",
//     date: "2023-07-12",
//     readingTime: "11 min read",
//     coverImage: "/data-quality-dashboard.png",
//     tags: ["Data Quality", "Monitoring", "Great Expectations", "Data Testing"],
//   },
//   {
//     slug: "streaming-analytics-architecture",
//     title: "Designing a Streaming Analytics Architecture",
//     excerpt:
//       "A deep dive into building a streaming analytics platform that can process and analyze data in real-time for immediate insights and actions.",
//     date: "2023-06-20",
//     readingTime: "13 min read",
//     coverImage: "/streaming-analytics-architecture.png",
//     tags: ["Streaming Analytics", "Real-time Processing", "Apache Flink", "Event-Driven"],
//   },
// ]

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  // Filter posts based on search query and selected tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

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
          <h1 className="text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technical articles, tutorials, and insights on data engineering, cloud infrastructure, and analytics.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Badge
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {selectedTag === null && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {blogPosts
                .filter((post) => post.featured)
                .map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="glass-effect hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                        <div className="relative overflow-hidden">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{post.readingTime}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">
            {selectedTag ? `Articles tagged with "${selectedTag}"` : searchQuery ? "Search Results" : "All Articles"}
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found. Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="glass-effect hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
                      <div className="relative overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          width={800}
                          height={400}
                          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readingTime}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
