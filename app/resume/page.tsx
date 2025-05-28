"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Printer } from "lucide-react"
import Link from "next/link"

// Victor's resume data
const resumeData = {
  personalInfo: {
    name: "Victor Oketch Sabare",
    title: "Data Engineer & Analytics Specialist",
    email: "sabarevictor@gmail.com",
    phone: "+254 113193473",
    location: "Nairobi, Kenya",
    website: "https://sabare.tech",
    linkedin: "https://www.linkedin.com/in/victorsabare",
    github: "https://github.com/Sabareh",
  },
  summary:
    "Passionate Data Engineer with expertise in Data Science and Analytics. Experienced in developing Power Apps, designing Power BI dashboards, and implementing cloud data solutions. Proven track record of delivering 100+ technical articles with 4.4/5 client satisfaction rating and successfully digitizing manual processes through innovative data solutions.",
  experience: [
    {
      title: "Independent Contractor",
      company: "Upwork",
      location: "Remote",
      period: "March 2022 - Present",
      achievements: [
        "Designed Microsoft Power Apps, Power Pages, and Power BI dashboards using PowerFX, Power Automate, DAX, SQL, and M Code",
        "Delivered 100+ SEO-optimized landing pages on hiring remote developers, achieving consistent client praise",
        "Provided technical consulting for Vercel portfolio projects and deployment optimization",
        "Authored technical blog series with 4.4/5 client satisfaction rating for quality and creativity",
      ],
      technologies: ["Power BI", "Power Apps", "PowerFX", "DAX", "SQL", "M Code", "Power Automate"],
    },
    {
      title: "Data Engineer",
      company: "HFC Kenya",
      location: "Nairobi, Kenya",
      period: "June 2024 - September 2024",
      achievements: [
        "Developed and deployed 5 Power Apps, digitizing manual processes in the bank",
        "Participated in migration team for new data warehouse using AWS Data Warehousing with Amazon Redshift",
        "Utilized SOAPUI for regulatory reporting to the Central Bank of Kenya",
        "Improved operational efficiency through automated data processing solutions",
      ],
      technologies: ["Power Apps", "AWS", "Amazon Redshift", "SOAPUI", "Data Warehousing"],
    },
    {
      title: "Microsoft Learn Student Ambassador",
      company: "Microsoft",
      location: "Nairobi, Kenya",
      period: "April 2022 - April 2025",
      achievements: [
        "Organized and executed engaging workshops, webinars, and events on Microsoft technologies",
        "Mentored fellow students interested in pursuing careers in technology",
        "Provided insights into industry trends and opportunities",
        "Built community around Microsoft technologies and tools",
      ],
      technologies: ["Microsoft Technologies", "Azure", "Power Platform", "Community Building"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Data Science and Analytics",
      school: "Jomo Kenyatta University of Agriculture and Technology",
      location: "Karen, Kenya",
      period: "2020 - Present",
      details: "Relevant Coursework: Machine Learning I & II, Probability & Statistics",
      activities: "Microsoft Learn Student Ambassador, Kenya Model United Nations",
    },
    {
      degree: "High School Diploma",
      school: "Alliance High School",
      location: "Kikuyu, Kenya",
      period: "2016 - 2019",
      details: "Activities: MIT Launch X Club, Junior Economic Club, Chess Club, World Scholars Club",
    },
  ],
  skills: {
    "Programming Languages": ["Python", "Java", "R", "Scala", "SQL"],
    "Big Data Tools": [
      "Hadoop Ecosystem",
      "Apache Spark",
      "Apache Kafka",
      "Apache Flume",
      "Apache Pig",
      "Apache Oozie",
      "Apache HBase",
      "Apache Sqoop",
    ],
    "Analytics & ML": [
      "TensorFlow",
      "Machine Learning",
      "Natural Language Processing",
      "Support Vector Machines",
      "Clustering",
      "Dimensionality Reduction",
    ],
    "Business Intelligence": ["Power BI", "Power Apps", "Tableau", "DAX", "PowerFX", "Power Automate"],
    "Cloud Platforms": ["AWS", "Amazon Redshift", "Azure"],
    Databases: ["MongoDB", "Elastic Search"],
  },
  certifications: [
    "Associate Big Data Engineer (ABDE™) - Data Science Council of America",
    "Data Engineer Associate - DataCamp",
    "Data Scientist Associate - DataCamp",
    "Data Analyst Associate - DataCamp",
  ],
  projects: [
    {
      name: "Retail Recommender System",
      description: "Shiny-based web application recommending cross-sell opportunities using association rule mining",
      technologies: ["R", "Shiny", "Association Rule Mining", "Data Mining"],
      date: "November 2024",
    },
    {
      name: "Product Network Analysis Using R",
      description:
        "Shiny web application analyzing product transactions using Apriori algorithm and community detection",
      technologies: ["R", "Shiny", "Apriori Algorithm", "Network Analysis"],
      date: "October 2024",
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
            Download or view my professional resume highlighting my experience in data engineering, analytics, and
            business intelligence solutions.
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
          <div key={index} className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-primary">{edu.school}</p>
                <p className="text-sm text-muted-foreground">{edu.details}</p>
                {edu.activities && <p className="text-sm text-muted-foreground">Activities: {edu.activities}</p>}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{edu.period}</p>
                <p>{edu.location}</p>
              </div>
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
        <div className="grid grid-cols-1 gap-2">
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
        <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{project.name}</h4>
                <span className="text-xs text-muted-foreground">{project.date}</span>
              </div>
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
