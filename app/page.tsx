import { HeroCodeThemed } from "@/components/hero-code-themed"
import { StatsSection } from "@/components/stats-section"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { MagneticCard } from "@/components/ui/magnetic-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Cloud, Zap } from "lucide-react"
import Link from "next/link"

const skills = [
  {
    name: "Python",
    icon: <Code className="h-6 w-6" />,
    level: 95,
    description: "Data processing, ML, automation",
  },
  {
    name: "SQL",
    icon: <Database className="h-6 w-6" />,
    level: 90,
    description: "Complex queries, optimization",
  },
  {
    name: "Apache Spark",
    icon: <Zap className="h-6 w-6" />,
    level: 85,
    description: "Big data processing, streaming",
  },
  {
    name: "AWS",
    icon: <Cloud className="h-6 w-6" />,
    level: 88,
    description: "Cloud architecture, services",
  },
  {
    name: "Power BI",
    icon: <Database className="h-6 w-6" />,
    level: 92,
    description: "Business intelligence, dashboards",
  },
  {
    name: "Machine Learning",
    icon: <Code className="h-6 w-6" />,
    level: 80,
    description: "Predictive analytics, modeling",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Code-Themed Hero Section */}
      <HeroCodeThemed />

      {/* Stats Section with Counter Animations */}
      <StatsSection />

      {/* Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up" className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Core Technologies
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized in modern data engineering tools and technologies
            </p>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.3} stagger staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <MagneticCard
                  key={index}
                  className="p-6 rounded-xl bg-card border"
                  strength={12}
                  radius={180}
                  enableRotation={true}
                  rotationStrength={2}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">{skill.icon}</div>
                    <div>
                      <h3 className="font-semibold">{skill.name}</h3>
                      <div className="text-sm text-muted-foreground">{skill.description}</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground mt-1">{skill.level}%</div>
                </MagneticCard>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="relative py-20 overflow-hidden">
        <ParallaxContainer speed={0.4} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        </ParallaxContainer>

        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Data?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help you build scalable data solutions that drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">View My Work</Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
