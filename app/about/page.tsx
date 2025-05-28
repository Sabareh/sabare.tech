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
    year: "2022 - Present",
    title: "Independent Contractor",
    company: "Upwork",
    description:
      "Data Analysis, Content Writing, Technical Consulting, and Technical Blogging with 4.4/5 client satisfaction rating",
    technologies: ["Power BI", "Power Apps", "PowerFX", "DAX", "SQL", "M Code", "Power Automate"],
  },
  {
    year: "June 2024 - Sep 2024",
    title: "Data Engineer",
    company: "HFC Kenya",
    description:
      "Developed 5 Power Apps, participated in AWS data warehouse migration, and handled regulatory reporting",
    technologies: ["Power Apps", "AWS", "Amazon Redshift", "SOAPUI"],
  },
  {
    year: "April 2022 - April 2025",
    title: "Microsoft Learn Student Ambassador",
    company: "Microsoft",
    description: "Organized workshops and mentored students in Microsoft technologies and career development",
    technologies: ["Microsoft Technologies", "Azure", "Power Platform"],
  },
  {
    year: "2020 - Present",
    title: "BS in Data Science and Analytics",
    company: "Jomo Kenyatta University of Agriculture and Technology",
    description: "Relevant Coursework: Machine Learning I & II, Probability & Statistics",
    technologies: ["Python", "R", "Machine Learning", "Statistics"],
  },
]

const certifications = [
  "Associate Big Data Engineer (ABDE™) - Data Science Council of America",
  "Data Engineer Associate - DataCamp",
  "Data Scientist Associate - DataCamp",
  "Data Analyst Associate - DataCamp",
]

const technicalSkills = {
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
  Databases: ["MongoDB", "Elastic Search", "Amazon Redshift"],
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
                <h2 className="text-2xl font-bold mb-4">Victor Oketch Sabare</h2>
                <p className="text-muted-foreground mb-6">Data Engineer & Analytics Specialist</p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">Nairobi, Kenya</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-sm">3+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm">BS Data Science & Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Microsoft Learn Student Ambassador</span>
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
                    My journey into data engineering began during my studies at Jomo Kenyatta University of Agriculture
                    and Technology, where I discovered my passion for transforming raw data into meaningful insights.
                    What started as curiosity about data patterns evolved into a comprehensive skill set spanning data
                    engineering, analytics, and business intelligence.
                  </p>
                  <p>
                    Over the past 3+ years, I've had the privilege of working with diverse clients on Upwork, developing
                    enterprise solutions at HFC Kenya, and serving as a Microsoft Learn Student Ambassador. I specialize
                    in building scalable data pipelines, creating interactive Power BI dashboards, and implementing
                    machine learning solutions that drive business value.
                  </p>
                  <p>
                    I believe in extensive research, networking, consultation and collaboration in stress situations and
                    problem-solving scenarios. Through experience, I have acquired the spirit of teachability and
                    discernment, always staying curious about emerging technologies and best practices in the data
                    engineering field.
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
