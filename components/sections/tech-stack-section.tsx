"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { Section } from "@/components/ui/section"
import { 
  Code, 
  Cloud, 
  Database, 
  BarChart3, 
  Settings, 
  Terminal,
  Layers,
  Zap
} from "lucide-react"

const techCategories = [
  {
    title: "Programming & Development",
    icon: Code,
    technologies: [
      "Python", "Java", "R", "Scala", "SQL", "TypeScript", "JavaScript", "Next.js", "React"
    ]
  },
  {
    title: "Big Data & Streaming",
    icon: Layers,
    technologies: [
      "Apache Spark", "Apache Kafka", "Hadoop Ecosystem", "Apache Flume", 
      "Apache Pig", "Apache Oozie", "Apache HBase", "Apache Sqoop"
    ]
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud, 
    technologies: [
      "AWS", "Amazon Redshift", "Azure", "Docker", "Kubernetes", 
      "Terraform", "Apache Airflow", "Git"
    ]
  },
  {
    title: "Databases",
    icon: Database,
    technologies: [
      "MongoDB", "PostgreSQL", "MySQL", "Elasticsearch", 
      "Amazon Redshift", "Redis", "Apache Cassandra"
    ]
  },
  {
    title: "Analytics & BI",
    icon: BarChart3,
    technologies: [
      "Power BI", "Power Apps", "Tableau", "DAX", "PowerFX", 
      "Power Automate", "Jupyter", "Pandas", "NumPy"
    ]
  },
  {
    title: "Machine Learning",
    icon: Zap,
    technologies: [
      "TensorFlow", "Scikit-learn", "PyTorch", "MLflow", 
      "Natural Language Processing", "Computer Vision", "Deep Learning"
    ]
  },
  {
    title: "DevOps & Tools",
    icon: Settings,
    technologies: [
      "Docker", "Jenkins", "GitHub Actions", "Prometheus", 
      "Grafana", "ELK Stack", "Ansible", "Vagrant"
    ]
  },
  {
    title: "Development Tools",
    icon: Terminal,
    technologies: [
      "VS Code", "IntelliJ IDEA", "Jupyter Lab", "Postman", 
      "SOAPUI", "DBeaver", "Figma", "Notion"
    ]
  }
]

export function TechStackSection() {
  return (
    <Section id="tech-stack" className="py-20">
      <div className="container">
        {/* Header */}
        <ScrollAnimation direction="up" className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Tech Stack</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The technologies, tools, and frameworks I use to build scalable data solutions and drive innovation.
          </p>
        </ScrollAnimation>

        {/* Tech Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((category, index) => (
            <ParallaxContainer
              key={category.title}
              speed={0.05 + (index % 4) * 0.02}
              direction={index % 2 === 0 ? "up" : "down"}
              delay={index * 0.1}
            >
              <Card className="glass-effect h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, techIndex) => (
                      <ScrollAnimation key={tech} delay={techIndex * 0.05}>
                        <Badge 
                          variant="secondary" 
                          className="text-xs hover:bg-primary/20 transition-colors cursor-default"
                        >
                          {tech}
                        </Badge>
                      </ScrollAnimation>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ParallaxContainer>
          ))}
        </div>

        {/* Skills Summary */}
        <ScrollAnimation direction="up" delay={0.6} className="mt-16 text-center">
          <Card className="glass-effect max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">What I Bring to the Table</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </Section>
  )
}