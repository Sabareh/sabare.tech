"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, GraduationCap, Award, Briefcase, Users } from "lucide-react"
import Image from "next/image"
import { AnimatedSection, AnimatedGrid } from "@/components/animated-section"
import { ScrollAnimation, ScrollItem } from "@/components/scroll-animation"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { ParallaxBackground } from "@/components/parallax/parallax-background"

const timeline = [
  {
    year: "Jun 2025 - Present",
    title: "Data Engineer",
    company: "Stanbic Bank Kenya",
    description:
      "Modernizing legacy Oracle/EDW workloads into Python + Airflow DAGs with validation-first data contracts and observability dashboards for Finance, Risk, and Operations.",
    technologies: ["Python", "Apache Airflow", "Polars", "Delta Lake", "SQL", "Oracle", "Power BI"],
  },
  {
    year: "Jul 2024 - Sep 2024",
    title: "Data Engineer",
    company: "HFC Kenya",
    description:
      "Digitized banking processes with Power Apps and contributed to AWS Redshift migration, regulatory reporting automation, and data loading playbooks.",
    technologies: ["Power Apps", "Power Automate", "AWS", "Amazon Redshift", "SOAPUI"],
  },
  {
    year: "Mar 2023 - Jul 2024",
    title: "Freelance Data Analytics Engineer",
    company: "Upwork",
    description:
      "Delivered 150+ long-form landing pages, analytics content, and deployment consulting that increased employer blog traffic by 16%.",
    technologies: ["Technical Writing", "Power BI", "SEO", "Analytics Strategy"],
  },
  {
    year: "2020 - 2024",
    title: "BS in Data Science and Analytics",
    company: "Jomo Kenyatta University of Agriculture and Technology",
    description: "Machine Learning I & II, Probability & Statistics, Data Mining",
    technologies: ["Python", "R", "Statistics", "Machine Learning"],
  },
]

const certifications = [
  "Associate Big Data Engineer (ABDE™)",
  "BCG - Data Science Job Simulation",
  "Spatial Data Science: The New Frontier in Analytics (MOOC)",
  "Data Engineer Associate",
  "Data Analyst Associate",
]

const technicalSkills = {
  "Data Engineering": ["Python", "Polars", "Pandas", "Apache Airflow", "dbt", "Kafka", "Delta Lake", "Spark"],
  "Cloud & Platforms": ["Amazon EMR", "AWS Redshift", "Microsoft Fabric", "Azure", "Oracle Data Warehouse"],
  "Data Reliability": ["Data Contracts", "SLA Design", "Observability", "Validation Frameworks", "Backfill Playbooks"],
  "Analytics & Power Platform": ["Power BI", "Power Apps", "Power Automate", "PowerFX", "DAX"],
  Collaboration: ["Stakeholder Enablement", "Technical Writing", "Workshops", "Mentorship"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 relative">
      {/* Background with Parallax */}
      <ParallaxBackground speed={0.3} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/50 to-purple-50/30 dark:from-gray-900/30 dark:via-gray-800/50 dark:to-gray-900/30" />
      </ParallaxBackground>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollAnimation direction="up" className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I have a deep-seated passion for Data Engineering, Science, and Analytics in theory and practice. I am
            driven by ambition, curiosity, relentlessness, rigor, diligence, commitment, assertiveness, creativity and
            critical thinking.
          </p>
        </ScrollAnimation>

        {/* Personal Info */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <ParallaxContainer speed={0.1} direction="left" delay={0.2} className="lg:col-span-1">
            <Card className="glass-effect">
              <CardContent className="p-8 text-center">
                <ParallaxContainer speed={0.05} scale>
                  <Image
                    src="/victor-sabare-headshot.png"
                    alt="Victor Oketch Sabare - Data Engineer"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-6 border-4 border-primary/20"
                  />
                </ParallaxContainer>
                <h2 className="text-2xl font-bold mb-4">Victor Sabare</h2>
                <p className="text-muted-foreground mb-6">Data Engineer @ Stanbic Bank Kenya</p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">Ngong Road, Nairobi County, Kenya</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-sm">Bank-grade pipeline modernization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm">BS Data Science & Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Stakeholder enablement champion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ParallaxContainer>

          <ParallaxContainer speed={0.15} direction="right" delay={0.4} className="lg:col-span-2 space-y-6">
            <Card className="glass-effect">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">My Story</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I build reliable data systems that keep bank operations synchronized. At Stanbic Bank Kenya I lead the
                    modernization of legacy Oracle/EDW workloads into Python + Airflow DAGs with validation-first checks,
                    observability, and clear rollback playbooks. The goal: every stakeholder can trust the numbers they
                    act on.
                  </p>
                  <p>
                    Prior to Stanbic, I delivered Power Platform solutions at HFC Kenya and partnered with teams on
                    AWS Redshift migrations and regulatory reporting automation. As a freelance data analytics engineer on
                    Upwork, I produced technical content and analytics consulting that lifted employer blog traffic by 16%.
                  </p>
                  <p>
                    I thrive in collaborative environments where data contracts, SLAs, and transparent communication are
                    non-negotiable. Whether I'm authoring runbooks, mentoring teammates, or prototyping a new ingestion
                    pattern, I focus on reliability, clarity, and measurable impact.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Certifications</h3>
                <div className="grid grid-cols-1 gap-3">
                  {certifications.map((cert, index) => (
                    <ScrollItem key={cert} delay={0.6 + index * 0.1} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{cert}</span>
                    </ScrollItem>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ParallaxContainer>
        </div>

        {/* Technical Skills */}
        <section className="relative mb-20">
          <ParallaxBackground speed={0.2} className="absolute inset-0 -z-10 rounded-2xl">
            <div className="absolute inset-0 bg-muted/20 rounded-2xl" />
          </ParallaxBackground>

          <div className="relative z-10 py-16">
            <ScrollAnimation direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold">Technical Skills</h2>
            </ScrollAnimation>

            <AnimatedGrid columns={{ default: 1, md: 2, lg: 3 }} staggerDelay={0.1}>
              {Object.entries(technicalSkills).map(([category, skills], index) => (
                <ParallaxContainer
                  key={category}
                  speed={0.05 + (index % 3) * 0.02}
                  direction={index % 2 === 0 ? "up" : "down"}
                >
                  <Card className="glass-effect h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ParallaxContainer>
              ))}
            </AnimatedGrid>
          </div>
        </section>

        {/* Timeline */}
        <AnimatedSection title="My Journey" direction="up" delay={0.3}>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <ParallaxContainer
                key={item.year}
                speed={0.05 + (index % 2) * 0.03}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.1}
                className="relative"
              >
                <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-32 flex-shrink-0">
                        <Badge variant="outline" className="text-sm font-bold">
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
              </ParallaxContainer>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
