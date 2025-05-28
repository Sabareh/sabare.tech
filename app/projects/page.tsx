"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Database, Cloud, BarChart3, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    title: "Real-time Analytics Platform",
    description:
      "Built a real-time analytics platform processing 10M+ events per day using Apache Kafka, Spark Streaming, and ClickHouse. Reduced query response time by 90%.",
    image: "/placeholder.svg?height=300&width=500&query=analytics dashboard",
    technologies: ["Apache Kafka", "Spark Streaming", "ClickHouse", "Python", "Docker"],
    category: "Real-time Processing",
    icon: Zap,
    github: "https://github.com/yourusername/analytics-platform",
    demo: "https://analytics-demo.com",
    featured: true,
  },
  {
    title: "Multi-Cloud Data Lake",
    description:
      "Designed and implemented a multi-cloud data lake architecture supporting AWS, GCP, and Azure. Automated data ingestion from 50+ sources.",
    image: "/placeholder.svg?height=300&width=500&query=cloud architecture diagram",
    technologies: ["AWS S3", "Google Cloud Storage", "Azure Data Lake", "Terraform", "Apache Airflow"],
    category: "Cloud Infrastructure",
    icon: Cloud,
    github: "https://github.com/yourusername/multi-cloud-lake",
    featured: true,
  },
  {
    title: "ML Feature Store",
    description:
      "Developed a centralized feature store for ML teams, reducing feature development time by 60% and ensuring consistency across models.",
    image: "/placeholder.svg?height=300&width=500&query=machine learning pipeline",
    technologies: ["Python", "Redis", "PostgreSQL", "FastAPI", "MLflow"],
    category: "Machine Learning",
    icon: Database,
    github: "https://github.com/yourusername/ml-feature-store",
    demo: "https://feature-store-demo.com",
  },
  {
    title: "Data Quality Framework",
    description:
      "Created a comprehensive data quality framework with automated testing, monitoring, and alerting for data pipelines.",
    image: "/placeholder.svg?height=300&width=500&query=data quality dashboard",
    technologies: ["Python", "Great Expectations", "Apache Airflow", "Grafana", "Slack API"],
    category: "Data Quality",
    icon: BarChart3,
    github: "https://github.com/yourusername/data-quality-framework",
  },
  {
    title: "Stream Processing Engine",
    description:
      "Built a custom stream processing engine for financial data, handling millions of transactions with sub-second latency requirements.",
    image: "/placeholder.svg?height=300&width=500&query=stream processing architecture",
    technologies: ["Apache Flink", "Kubernetes", "Redis", "PostgreSQL", "Prometheus"],
    category: "Stream Processing",
    icon: Zap,
    github: "https://github.com/yourusername/stream-engine",
  },
  {
    title: "Data Catalog & Lineage",
    description:
      "Implemented an automated data catalog with lineage tracking, making it easy for teams to discover and understand data assets.",
    image: "/placeholder.svg?height=300&width=500&query=data catalog interface",
    technologies: ["Apache Atlas", "Neo4j", "React", "Python", "Apache Spark"],
    category: "Data Governance",
    icon: Database,
    github: "https://github.com/yourusername/data-catalog",
  },
]

const categories = [
  "All",
  "Real-time Processing",
  "Cloud Infrastructure",
  "Machine Learning",
  "Data Quality",
  "Stream Processing",
  "Data Governance",
]

export default function ProjectsPage() {
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
          <h1 className="text-5xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of data engineering projects showcasing scalable infrastructure, real-time processing, and
            innovative solutions to complex data challenges.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="glass-effect hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/90 text-primary-foreground">
                          <project.icon className="w-3 h-3 mr-1" />
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" asChild>
                          <Link href={project.github} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                        {project.demo && (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={project.demo} target="_blank">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-effect hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs">
                        <project.icon className="w-3 h-3 mr-1" />
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.github} target="_blank">
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Link>
                      </Button>
                      {project.demo && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={project.demo} target="_blank">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
