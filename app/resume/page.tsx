"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  Printer,
  Link2,
} from "lucide-react"
import Link from "next/link"

type ResumeProject = {
  name: string
  description: string
  technologies: string[]
  date?: string
}

type ResumePublication = {
  title: string
  description?: string
}

type ResumeLanguage = {
  name: string
  proficiency: string
}

type ResumeHonor = {
  title: string
  description?: string
}

const resumeData = {
  personalInfo: {
    name: "Victor Sabare",
    title: "Data Engineer @ Stanbic Bank Kenya",
    email: "sabarevictor@gmail.com",
    phone: "+254 113193473",
    location: "Ngong Road, Nairobi County, Kenya",
    website: "https://sabare.tech",
    linkedin: "https://www.linkedin.com/in/victorsabare",
    github: "https://github.com/Sabareh",
    blog: "https://sabare.me",
  },
  summary:
    "Data engineer specializing in modernizing legacy banking workloads into resilient, observable Python + Airflow pipelines. I build repeatable data loading patterns with Polars, Delta Lake, and SQL so Finance, Risk, and Operations teams can trust the data products they ship.",
  experience: [
    {
      title: "Data Engineer",
      company: "Stanbic Bank Kenya",
      location: "Nairobi County, Kenya",
      period: "June 2025 - Present",
      achievements: [
        "Re-platform legacy Oracle/EDW workloads into Python + Airflow DAGs, simplifying orchestration and deployment.",
        "Designed validation-first GL integrity pipelines with alerting, protecting downstream regulatory reporting.",
        "Introduced reusable query → read_sql → to_sql patterns that accelerate new data product onboarding.",
        "Enabled Finance, Risk, and Ops stakeholders with runbooks, metrics, and Power BI dashboards for faster decisions.",
      ],
      technologies: ["Python", "Apache Airflow", "Polars", "Pandas", "Oracle", "SQL", "Delta Lake", "Kafka", "dbt"],
    },
    {
      title: "Data Engineer",
      company: "HFC Kenya",
      location: "Nairobi County, Kenya",
      period: "July 2024 - September 2024",
      achievements: [
        "Digitized manual banking processes by delivering production Power Apps and Power Automate workflows.",
        "Partnered on AWS Redshift migration efforts, shaping dimensional models and data loading playbooks.",
        "Delivered SOAPUI automation that streamlined regulatory submissions to the Central Bank of Kenya.",
      ],
      technologies: ["Power Apps", "Power Automate", "AWS", "Amazon Redshift", "SQL", "SOAPUI"],
    },
    {
      title: "Freelance Data Analytics Engineer",
      company: "Upwork",
      location: "Remote",
      period: "March 2023 - July 2024",
      achievements: [
        "Produced 150+ long-form landing page sections covering remote hiring, interview processes, and FAQs.",
        "Lifted employer blog traffic by 16% with editorial content grounded in data engineering best practices.",
        "Consulted on portfolio deployments and analytics instrumentation for distributed client teams.",
      ],
      technologies: ["Technical Writing", "SEO", "Analytics Strategy", "Power BI", "Next.js", "Content Operations"],
    },
  ],
  education: [
    {
      degree: "Associate Big Data Engineer (ABDE™)",
      school: "Data Science Council of America",
      location: "Remote",
      period: "2025",
      details: "Professional certification focused on large-scale data engineering design patterns.",
    },
    {
      degree: "Bachelor of Science in Data Science and Analytics",
      school: "Jomo Kenyatta University of Agriculture and Technology",
      location: "Kenya",
      period: "2020 - 2024",
      details: "Machine Learning I & II, Probability & Statistics, Data Mining.",
      activities: "Microsoft Learn Student Ambassador, Kenya Model United Nations",
    },
    {
      degree: "Data Science and Analytics Track",
      school: "DataCamp",
      location: "Remote",
      period: "2021 - 2023",
      details: "Associate-level programs in data engineering and analytics.",
    },
  ],
  topSkills: ["Data Architecture", "Data Loading", "Amazon Elastic MapReduce (EMR)"],
  skills: {
    "Data Engineering": ["Python", "Polars", "Pandas", "Apache Airflow", "dbt", "Kafka", "Delta Lake", "Spark"],
    "Cloud & Platforms": ["Amazon EMR", "AWS Redshift", "Microsoft Fabric", "Azure", "Oracle Data Warehouse"],
    "Data Reliability": ["Data Contracts", "SLA Design", "Data Quality Monitoring", "Observability", "Backfill Playbooks"],
    "Analytics & Power Platform": ["Power BI", "Power Apps", "Power Automate", "PowerFX", "DAX"],
    "Collaboration": ["Stakeholder Runbooks", "Technical Writing", "Cross-functional Workshops", "Mentorship"],
  },
  languages: [
    { name: "English", proficiency: "Full Professional" },
    { name: "Swahili", proficiency: "Limited Working" },
  ] as ResumeLanguage[],
  certifications: [
    "Associate Big Data Engineer (ABDE™)",
    "BCG - Data Science Job Simulation",
    "Spatial Data Science: The New Frontier in Analytics (MOOC)",
    "Data Engineer Associate",
    "Data Analyst Associate",
  ],
  honors: [
    { title: "World Scholars Award" },
    { title: "Microsoft Learn Student Ambassador" },
  ] as ResumeHonor[],
  publications: [
    {
      title: "Data Engineering Technologies",
      description: "A practical guide to selecting and orchestrating modern data tooling for scale.",
    },
    {
      title: "Building and Optimizing Data Pipelines for High-Volume Data Processing",
      description: "Patterns for resilient ingestion, validation, and monitoring in regulated environments.",
    },
    {
      title: "Creating a Data Pipeline Using Apache Airflow",
      description: "Step-by-step workflow automation playbook with lessons learned from production deployments.",
    },
    {
      title: "Stock Price Prediction with Apache Spark and Apache Cassandra",
      description: "Exploring streaming-first architectures for financial signal processing.",
    },
  ] as ResumePublication[],
  projects: [
    {
      name: "GL Integrity Modernization",
      description:
        "Bank-grade Airflow pipelines with validation contracts and automated rollback ensuring accurate GL snapshots.",
      technologies: ["Python", "Apache Airflow", "Oracle", "Delta Lake", "Power BI"],
      date: "2025",
    },
    {
      name: "Regulatory Reporting Automation",
      description: "SOAPUI-driven submission framework reducing manual prep for Central Bank reporting by 60%.",
      technologies: ["Power Apps", "SOAPUI", "AWS Redshift", "SQL"],
      date: "2024",
    },
  ] as ResumeProject[],
}

type ResumeContentProps = {
  data: typeof resumeData
}

export default function ResumePage() {
  const handleDownloadPDF = () => {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Resume</h1>
          <p className="text-muted-foreground mb-6">
            Download or view my professional resume featuring bank-grade data engineering, Power Platform delivery, and
            analytics leadership.
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
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

function ResumeContent({ data }: ResumeContentProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
          <h2 className="text-xl text-primary mb-2">{data.personalInfo.title}</h2>
        </div>
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
        <div className="flex justify-center gap-4 text-sm">
          {data.personalInfo.linkedin && (
            <Link
              href={data.personalInfo.linkedin}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          )}
          {data.personalInfo.github && (
            <Link
              href={data.personalInfo.github}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          )}
          {data.personalInfo.blog && (
            <Link
              href={data.personalInfo.blog}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link2 className="h-4 w-4" />
              Blog
            </Link>
          )}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-3">Professional Summary</h3>
        <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
      </div>

      {data.topSkills?.length ? (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-3">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={`${exp.company}-${index}`}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-primary">{exp.company}</p>
                </div>
                <div className="text-sm text-muted-foreground text-left sm:text-right">
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

      <div>
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        {data.education.map((edu, index) => (
          <div key={`${edu.school}-${index}`} className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-primary">{edu.school}</p>
                <p className="text-sm text-muted-foreground">{edu.details}</p>
                {edu.activities && <p className="text-sm text-muted-foreground">Activities: {edu.activities}</p>}
              </div>
              <div className="text-sm text-muted-foreground text-left sm:text-right">
                <p>{edu.period}</p>
                <p>{edu.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

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

      {data.languages?.length ? (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language) => (
                <Badge key={language.name} variant="secondary" className="text-xs">
                  {language.name} • {language.proficiency}
                </Badge>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        <div className="grid grid-cols-1 gap-2">
          {data.certifications.map((cert, index) => (
            <div key={`${cert}-${index}`} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {data.honors?.length ? (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">Honors & Awards</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {data.honors.map((honor, index) => (
                <li key={`${honor.title}-${index}`}>{honor.title}</li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {data.publications?.length ? (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">Publications</h3>
            <div className="space-y-3">
              {data.publications.map((publication, index) => (
                <div key={`${publication.title}-${index}`}>
                  <h4 className="font-medium text-sm">{publication.title}</h4>
                  {publication.description && (
                    <p className="text-sm text-muted-foreground">{publication.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {data.projects?.length ? (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={`${project.name}-${index}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{project.name}</h4>
                    {project.date && <span className="text-xs text-muted-foreground">{project.date}</span>}
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
        </>
      ) : null}
    </div>
  )
}
