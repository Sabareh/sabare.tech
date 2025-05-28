"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Printer } from "lucide-react"
import Link from "next/link"

// Resume data structure
const resumeData = {
  personalInfo: {
    name: "Your Name",
    title: "Senior Data Engineer",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://yourwebsite.com",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
  },
  summary:
    "Experienced Data Engineer with 5+ years of expertise in designing and implementing scalable data infrastructure, real-time processing systems, and cloud-based analytics solutions. Proven track record of reducing costs by 40% and improving system performance by 300% through innovative data pipeline optimization.",
  experience: [
    {
      title: "Senior Data Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "Jan 2022 - Present",
      achievements: [
        "Led a team of 5 data engineers in designing scalable data pipelines processing 10TB+ daily",
        "Reduced data processing costs by 40% through pipeline optimization and infrastructure improvements",
        "Implemented streaming architecture with Kafka and Spark, reducing latency by 95%",
        "Migrated on-premise data warehouse to cloud, improving query performance by 300%",
      ],
      technologies: ["Apache Spark", "Kafka", "AWS", "Python", "Airflow", "Terraform", "Docker", "Kubernetes"],
    },
    {
      title: "Data Engineer",
      company: "Data Systems Co.",
      location: "Seattle, WA",
      period: "Mar 2020 - Dec 2021",
      achievements: [
        "Built real-time analytics platform processing 1M+ events per minute",
        "Implemented data catalog solution improving data discovery by 70%",
        "Reduced ETL job failures by 80% through improved error handling and monitoring",
        "Developed dashboards and visualizations for business stakeholders",
      ],
      technologies: ["Python", "Apache Spark", "Google Cloud Platform", "BigQuery", "Airflow", "Kafka"],
    },
    {
      title: "Junior Data Engineer",
      company: "Analytics Edge",
      location: "Boston, MA",
      period: "Jun 2018 - Feb 2020",
      achievements: [
        "Automated manual reporting processes, saving 20+ hours per week",
        "Improved data pipeline reliability from 85% to 99.5%",
        "Contributed to customer segmentation project increasing conversion by 35%",
        "Developed ETL pipelines using Python and SQL",
      ],
      technologies: ["Python", "SQL", "PostgreSQL", "Tableau", "PowerBI", "AWS"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Boston, MA",
      period: "2014 - 2018",
      details: "Concentration in Database Systems and Distributed Computing",
    },
  ],
  skills: {
    "Programming Languages": ["Python", "SQL", "Scala", "Java", "JavaScript"],
    "Data Processing": ["Apache Spark", "Apache Kafka", "Apache Airflow", "dbt", "Apache Flink"],
    "Cloud Platforms": ["AWS", "Google Cloud Platform", "Azure"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Snowflake", "BigQuery"],
    "Tools & Technologies": ["Docker", "Kubernetes", "Terraform", "Git", "Jenkins", "Grafana"],
  },
  certifications: [
    "AWS Certified Data Engineer - Associate",
    "Google Cloud Professional Data Engineer",
    "Apache Spark Developer Certification",
    "Kubernetes Application Developer (CKAD)",
  ],
  projects: [
    {
      name: "Real-time Analytics Platform",
      description: "Built platform processing 10M+ events/day using Kafka, Spark Streaming, and ClickHouse",
      technologies: ["Kafka", "Spark Streaming", "ClickHouse", "Python"],
    },
    {
      name: "Multi-Cloud Data Lake",
      description: "Designed data lake architecture supporting AWS, GCP, and Azure with automated ingestion",
      technologies: ["AWS S3", "Google Cloud Storage", "Terraform", "Airflow"],
    },
  ],
}

export default function ResumePage() {
  const handleDownloadPDF = () => {
    // Create a new window with the resume content for printing
    const printWindow = window.open("/resume/print", "_blank")
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  const handleViewPDF = () => {
    window.open("/resume/print", "_blank")
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Resume</h1>
          <p className="text-muted-foreground mb-6">
            Download or view my professional resume highlighting my experience in data engineering and cloud
            infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownloadPDF} size="lg" className="group">
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download PDF
            </Button>
            <Button onClick={handleViewPDF} variant="outline" size="lg">
              <ExternalLink className="mr-2 h-5 w-5" />
              View in New Tab
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/resume/print">
                <Printer className="mr-2 h-5 w-5" />
                Print Version
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect">
            <CardContent className="p-8">
              <ResumeContent data={resumeData} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

interface ResumeContentProps {
  data: typeof resumeData
}

function ResumeContent({ data }: ResumeContentProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
        <h2 className="text-xl text-primary mb-4">{data.personalInfo.title}</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{data.personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>{data.personalInfo.website}</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Professional Summary</h3>
        <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
      </div>

      <Separator />

      {/* Experience */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-primary">{exp.company}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        {data.education.map((edu, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <h4 className="font-semibold">{edu.degree}</h4>
              <p className="text-primary">{edu.school}</p>
              <p className="text-sm text-muted-foreground">{edu.details}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{edu.period}</p>
              <p>{edu.location}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.skills).map(([category, skills]) => (
            <div key={category}>
              <h4 className="font-medium mb-2">{category}</h4>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Key Projects */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Key Projects</h3>
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index}>
              <h4 className="font-medium">{project.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
