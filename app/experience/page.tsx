"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Award,
  BarChart,
  Code,
  Users,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Define the work experience data structure
interface Achievement {
  text: string
  metrics?: string
}

interface WorkExperience {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Contract" | "Freelance" | "Part-time"
  startDate: string
  endDate: string | "Present"
  duration: string
  logo: string
  companyDescription: string
  companyIndustry: string
  companySize: string
  companyWebsite: string
  responsibilities: string[]
  achievements: Achievement[]
  technologies: string[]
  teamSize: number
  featured: boolean
}

// Sample work experience data
const workExperiences: WorkExperience[] = [
  {
    id: "tech-innovations",
    title: "Senior Data Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    startDate: "Jan 2022",
    endDate: "Present",
    duration: "2 years",
    logo: "/tech-innovations-logo.png",
    companyDescription:
      "Tech Innovations Inc. is a leading technology company specializing in AI-driven solutions for enterprise clients across finance, healthcare, and retail sectors.",
    companyIndustry: "Technology / Artificial Intelligence",
    companySize: "500-1000 employees",
    companyWebsite: "https://techinnovations.example.com",
    responsibilities: [
      "Lead a team of 5 data engineers in designing and implementing scalable data pipelines processing 10TB+ daily",
      "Architect and maintain cloud-based data infrastructure on AWS, including S3, Redshift, EMR, and Lambda",
      "Collaborate with data science teams to productionize ML models and implement feature stores",
      "Establish data governance practices and ensure compliance with industry regulations",
      "Mentor junior engineers and conduct technical interviews for new hires",
    ],
    achievements: [
      {
        text: "Reduced data processing costs by 40% through pipeline optimization and infrastructure improvements",
        metrics: "40% cost reduction",
      },
      {
        text: "Decreased pipeline latency from hours to minutes by implementing streaming architecture with Kafka and Spark Streaming",
        metrics: "95% latency reduction",
      },
      {
        text: "Led migration from on-premise data warehouse to cloud-based solution, improving query performance by 300%",
        metrics: "300% performance improvement",
      },
      {
        text: "Implemented automated data quality monitoring, reducing data incidents by 60%",
        metrics: "60% incident reduction",
      },
    ],
    technologies: [
      "Apache Spark",
      "Kafka",
      "AWS",
      "Python",
      "Airflow",
      "Terraform",
      "Docker",
      "Kubernetes",
      "dbt",
      "Snowflake",
    ],
    teamSize: 12,
    featured: true,
  },
  {
    id: "data-systems",
    title: "Data Engineer",
    company: "Data Systems Co.",
    location: "Seattle, WA",
    type: "Full-time",
    startDate: "Mar 2020",
    endDate: "Dec 2021",
    duration: "1 year 10 months",
    logo: "/data-systems-logo.png",
    companyDescription:
      "Data Systems Co. provides data infrastructure and analytics solutions to Fortune 500 companies, helping them leverage their data assets for competitive advantage.",
    companyIndustry: "Data Infrastructure / Analytics",
    companySize: "100-500 employees",
    companyWebsite: "https://datasystems.example.com",
    responsibilities: [
      "Designed and implemented ETL processes using Python, Spark, and Airflow",
      "Built and maintained data warehousing solutions on Google Cloud Platform",
      "Developed real-time data processing pipelines for customer analytics",
      "Created dashboards and visualizations for business stakeholders",
      "Participated in on-call rotations for production data systems",
    ],
    achievements: [
      {
        text: "Implemented a data catalog solution that improved data discovery across the organization",
        metrics: "70% faster data discovery",
      },
      {
        text: "Built a real-time analytics platform processing 1M+ events per minute",
        metrics: "1M+ events/minute",
      },
      {
        text: "Reduced ETL job failures by 80% through improved error handling and monitoring",
        metrics: "80% failure reduction",
      },
    ],
    technologies: [
      "Python",
      "Apache Spark",
      "Google Cloud Platform",
      "BigQuery",
      "Airflow",
      "Kafka",
      "Looker",
      "SQL",
      "dbt",
    ],
    teamSize: 8,
    featured: true,
  },
  {
    id: "analytics-edge",
    title: "Junior Data Engineer",
    company: "Analytics Edge",
    location: "Boston, MA",
    type: "Full-time",
    startDate: "Jun 2018",
    endDate: "Feb 2020",
    duration: "1 year 9 months",
    logo: "/analytics-edge-logo.png",
    companyDescription:
      "Analytics Edge is a data analytics startup focused on providing insights and recommendations to e-commerce and retail businesses.",
    companyIndustry: "Data Analytics / E-commerce",
    companySize: "50-100 employees",
    companyWebsite: "https://analyticsedge.example.com",
    responsibilities: [
      "Developed and maintained ETL pipelines using Python and SQL",
      "Implemented data models and schemas for analytical databases",
      "Created automated reports and dashboards using Tableau and PowerBI",
      "Assisted in database administration and optimization",
      "Collaborated with analysts to understand data requirements",
    ],
    achievements: [
      {
        text: "Automated manual reporting processes, saving 20+ hours per week across the analytics team",
        metrics: "20+ hours saved weekly",
      },
      {
        text: "Improved data pipeline reliability from 85% to 99.5% through better error handling and monitoring",
        metrics: "99.5% reliability",
      },
      {
        text: "Contributed to a customer segmentation project that increased marketing campaign conversion by 35%",
        metrics: "35% conversion increase",
      },
    ],
    technologies: ["Python", "SQL", "PostgreSQL", "Tableau", "PowerBI", "AWS", "Git", "Jenkins", "Airflow"],
    teamSize: 5,
    featured: false,
  },
  {
    id: "data-insights",
    title: "Data Analyst Intern",
    company: "Data Insights Ltd.",
    location: "Chicago, IL",
    type: "Internship",
    startDate: "Jan 2018",
    endDate: "May 2018",
    duration: "5 months",
    logo: "/data-insights-logo.png",
    companyDescription:
      "Data Insights Ltd. specializes in providing data-driven consulting services to mid-size businesses across various industries.",
    companyIndustry: "Data Consulting",
    companySize: "10-50 employees",
    companyWebsite: "https://datainsights.example.com",
    responsibilities: [
      "Assisted in data collection, cleaning, and preparation for analysis",
      "Created SQL queries to extract data from relational databases",
      "Developed visualizations and reports using Excel and Tableau",
      "Participated in client meetings to understand business requirements",
      "Documented data processes and analysis methodologies",
    ],
    achievements: [
      {
        text: "Developed a customer churn analysis model that helped identify at-risk customers",
        metrics: "15% churn reduction",
      },
      {
        text: "Created an automated reporting dashboard that was adopted as a standard tool by the analytics team",
      },
    ],
    technologies: ["SQL", "Excel", "Tableau", "Python", "R", "Git"],
    teamSize: 3,
    featured: false,
  },
]

export default function ExperiencePage() {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedCompany(expandedCompany === id ? null : id)
  }

  const featuredExperiences = workExperiences.filter((exp) => exp.featured)
  const allExperiences = workExperiences

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
          <h1 className="text-5xl font-bold mb-6">Work Experience</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional journey building data infrastructure, pipelines, and analytics solutions across various
            industries.
          </p>
        </motion.div>

        {/* Experience Tabs */}
        <Tabs defaultValue="featured" className="mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="featured">Featured Roles</TabsTrigger>
            <TabsTrigger value="all">All Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="featured" className="mt-8">
            <div className="space-y-12">
              {featuredExperiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isExpanded={expandedCompany === experience.id}
                  toggleExpand={() => toggleExpand(experience.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="all" className="mt-8">
            <div className="space-y-12">
              {allExperiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isExpanded={expandedCompany === experience.id}
                  toggleExpand={() => toggleExpand(experience.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Skills Summary</h2>
          <SkillsSummary experiences={workExperiences} />
        </motion.div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Career Timeline</h2>
          <CareerTimeline experiences={workExperiences} />
        </motion.div>
      </div>
    </div>
  )
}

interface ExperienceCardProps {
  experience: WorkExperience
  isExpanded: boolean
  toggleExpand: () => void
}

function ExperienceCard({ experience, isExpanded, toggleExpand }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="glass-effect overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                <Image
                  src={experience.logo || "/placeholder.svg"}
                  alt={`${experience.company} logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-2xl">{experience.title}</CardTitle>
                <CardDescription className="text-lg font-medium text-primary">{experience.company}</CardDescription>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {experience.startDate} - {experience.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{experience.type}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:self-start"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Less Details
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> More Details
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-wrap gap-1 mb-4">
            {experience.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
            {experience.technologies.length > 5 && (
              <Badge variant="outline">+{experience.technologies.length - 5} more</Badge>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 pt-2"
              >
                {/* Company Information */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" /> About {experience.company}
                  </h4>
                  <p className="text-muted-foreground mb-3">{experience.companyDescription}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Industry:</span> {experience.companyIndustry}
                    </div>
                    <div>
                      <span className="font-medium">Company Size:</span> {experience.companySize}
                    </div>
                    <div>
                      <span className="font-medium">Team Size:</span> {experience.teamSize} people
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                      <Link href={experience.companyWebsite} target="_blank" rel="noopener noreferrer">
                        Visit Company Website <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" /> Key Responsibilities
                  </h4>
                  <ul className="space-y-2 pl-6 list-disc marker:text-primary">
                    {experience.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-muted-foreground">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2" /> Key Achievements
                  </h4>
                  <div className="space-y-3">
                    {experience.achievements.map((achievement, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-1 bg-primary rounded-full"></div>
                        <div>
                          <p className="text-muted-foreground">{achievement.text}</p>
                          {achievement.metrics && (
                            <Badge variant="outline" className="mt-1">
                              <BarChart className="h-3 w-3 mr-1" />
                              {achievement.metrics}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Code className="h-4 w-4 mr-2" /> Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="pt-0">
          {!isExpanded && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {experience.responsibilities[0]} {experience.responsibilities.length > 1 ? "..." : ""}
            </p>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface SkillsSummaryProps {
  experiences: WorkExperience[]
}

function SkillsSummary({ experiences }: SkillsSummaryProps) {
  // Extract and count all technologies from experiences
  const techCount: Record<string, number> = {}
  experiences.forEach((exp) => {
    exp.technologies.forEach((tech) => {
      techCount[tech] = (techCount[tech] || 0) + 1
    })
  })

  // Sort technologies by frequency
  const sortedTech = Object.entries(techCount).sort((a, b) => b[1] - a[1])

  // Group technologies by category
  const categories = {
    "Data Processing": ["Apache Spark", "Hadoop", "Flink", "Beam", "Kafka", "RabbitMQ", "NiFi", "Storm"],
    "Cloud Platforms": ["AWS", "Google Cloud Platform", "Azure", "IBM Cloud", "Oracle Cloud"],
    "Databases & Storage": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Cassandra",
      "Redis",
      "Elasticsearch",
      "S3",
      "HDFS",
      "Redshift",
      "BigQuery",
      "Snowflake",
    ],
    "Languages & Frameworks": ["Python", "Java", "Scala", "SQL", "R", "JavaScript", "Go", "Rust", "C++"],
    "Orchestration & DevOps": [
      "Airflow",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Jenkins",
      "GitLab CI",
      "GitHub Actions",
      "Ansible",
    ],
    "Analytics & Visualization": ["Tableau", "PowerBI", "Looker", "Grafana", "Kibana", "Excel", "D3.js"],
    "Data Transformation": ["dbt", "Informatica", "Talend", "SSIS", "DataStage"],
  }

  // Categorize technologies
  const categorizedTech: Record<string, Array<[string, number]>> = {}
  for (const category in categories) {
    categorizedTech[category] = sortedTech.filter(([tech]) =>
      categories[category as keyof typeof categories].includes(tech),
    )
  }

  // Add "Other" category for uncategorized technologies
  const allCategorizedTech = Object.values(categories).flat()
  categorizedTech["Other"] = sortedTech.filter(([tech]) => !allCategorizedTech.includes(tech))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(categorizedTech)
        .filter(([_, techs]) => techs.length > 0)
        .map(([category, techs]) => (
          <Card key={category} className="glass-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techs.map(([tech, count]) => (
                  <Badge key={tech} variant={count >= 2 ? "default" : "secondary"} className="flex items-center gap-1">
                    {tech}
                    <span className="bg-primary-foreground text-primary rounded-full px-1.5 text-xs ml-1">{count}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

interface CareerTimelineProps {
  experiences: WorkExperience[]
}

function CareerTimeline({ experiences }: CareerTimelineProps) {
  // Sort experiences by start date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime()
    const dateB = new Date(b.startDate).getTime()
    return dateB - dateA
  })

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted"></div>

      <div className="space-y-12">
        {sortedExperiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>

            {/* Date */}
            <div
              className={`w-full md:w-1/2 pb-8 md:pb-0 ${
                index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12 text-left"
              }`}
            >
              <div className="md:hidden text-center mb-4">
                <Badge variant="outline" className="text-lg font-semibold">
                  {experience.startDate} - {experience.endDate}
                </Badge>
              </div>
              <div className="hidden md:block">
                <Badge variant="outline" className="text-lg font-semibold">
                  {experience.startDate} - {experience.endDate}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-12 text-left" : "md:pr-12 text-right"}`}>
              <Card className="glass-effect">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                      <Image
                        src={experience.logo || "/placeholder.svg"}
                        alt={`${experience.company} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{experience.title}</h3>
                      <p className="text-primary">{experience.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">{experience.responsibilities[0]}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {experience.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {experience.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{experience.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
