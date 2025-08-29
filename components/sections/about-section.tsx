"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, GraduationCap, Award, Briefcase, Users } from "lucide-react"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { Section } from "@/components/ui/section"

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
  "Databases": ["MongoDB", "Elastic Search", "Amazon Redshift"],
}

export function AboutSection() {
  return (
    <Section id="about" className="py-20">
      <div className="container">
        {/* Header */}
        <ScrollAnimation direction="up" className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">About Me</h2>
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
                <h3 className="text-2xl font-bold mb-4">Victor Oketch Sabare</h3>
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
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="glass-effect">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <ScrollAnimation key={index} delay={index * 0.1}>
                      <span className="text-sm">{cert}</span>
                    </ScrollAnimation>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ParallaxContainer>
        </div>

        {/* Technical Skills */}
        <section className="relative mb-20">
          <div className="relative z-10 py-16">
            <ScrollAnimation direction="up" className="text-center mb-12">
              <h3 className="text-3xl font-bold">Technical Skills</h3>
            </ScrollAnimation>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(technicalSkills).map(([category, skills], index) => (
                <ParallaxContainer
                  key={category}
                  speed={0.05 + (index % 3) * 0.02}
                  direction={index % 2 === 0 ? "up" : "down"}
                >
                  <Card className="glass-effect h-full">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-4">{category}</h4>
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
            </div>
          </div>
        </section>
      </div>
    </Section>
  )
}