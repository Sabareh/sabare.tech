"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { Section } from "@/components/ui/section"

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

export function ExperienceSection() {
  return (
    <Section id="experience" className="py-20">
      <div className="container">
        {/* Header */}
        <ScrollAnimation direction="up" className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">My Journey</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional experience and educational background in data engineering and technology.
          </p>
        </ScrollAnimation>

        {/* Timeline */}
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <ParallaxContainer
              key={item.year}
              speed={0.1 + (index % 2) * 0.05}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.1}
            >
              <Card className="glass-effect">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                      <h4 className="text-lg font-semibold text-primary mb-3">{item.company}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <div className="md:text-right md:min-w-[150px]">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ParallaxContainer>
          ))}
        </div>
      </div>
    </Section>
  )
}