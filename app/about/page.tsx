"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react"
import Image from "next/image"

const timeline = [
  {
    year: "2024",
    title: "Senior Data Engineer",
    company: "Tech Corp",
    description: "Leading data infrastructure initiatives and mentoring junior engineers",
    technologies: ["Apache Spark", "Kubernetes", "AWS", "Python"],
  },
  {
    year: "2022",
    title: "Data Engineer",
    company: "Data Solutions Inc",
    description: "Built real-time data pipelines processing millions of events daily",
    technologies: ["Apache Kafka", "Docker", "PostgreSQL", "Python"],
  },
  {
    year: "2020",
    title: "Junior Data Engineer",
    company: "StartupXYZ",
    description: "Developed ETL processes and data warehouse solutions",
    technologies: ["SQL", "Python", "AWS", "Airflow"],
  },
  {
    year: "2019",
    title: "Computer Science Graduate",
    company: "University Name",
    description: "Bachelor's degree with focus on databases and distributed systems",
    technologies: ["Java", "SQL", "Machine Learning", "Statistics"],
  },
]

const certifications = [
  "AWS Certified Data Engineer",
  "Google Cloud Professional Data Engineer",
  "Apache Spark Developer Certification",
  "Kubernetes Application Developer",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate data engineer with 5+ years of experience building scalable data infrastructure that powers
            data-driven decisions across organizations.
          </p>
        </motion.div>

        {/* Personal Info */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="glass-effect">
              <CardContent className="p-8 text-center">
                <Image
                  src="/placeholder.svg?height=200&width=200&query=professional headshot"
                  alt="Profile"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-6 border-4 border-primary/20"
                />
                <h2 className="text-2xl font-bold mb-4">Your Name</h2>
                <p className="text-muted-foreground mb-6">Senior Data Engineer</p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">5+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm">BS Computer Science</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="glass-effect">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">My Story</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    My journey into data engineering began during my computer science studies, where I was fascinated by
                    the challenge of making sense of large, complex datasets. What started as curiosity about databases
                    evolved into a passion for building the infrastructure that powers modern data-driven organizations.
                  </p>
                  <p>
                    Over the past 5 years, I've had the privilege of working with companies ranging from early-stage
                    startups to large enterprises, helping them transform their data chaos into organized, actionable
                    insights. I specialize in building scalable data pipelines, optimizing data warehouses, and
                    implementing real-time analytics solutions.
                  </p>
                  <p>
                    When I'm not architecting data solutions, you'll find me contributing to open-source projects,
                    writing about data engineering best practices, or exploring the latest developments in cloud
                    computing and distributed systems.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-20 flex-shrink-0">
                        <Badge variant="outline" className="text-lg font-bold">
                          {item.year}
                        </Badge>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-primary font-medium mb-2">{item.company}</p>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
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
