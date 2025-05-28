"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { AnimatedCounter, PercentageCounter, CompactCounter } from "@/components/ui/animated-counter"
import { MagneticCard } from "@/components/ui/magnetic-card"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { Database, Code2, Cloud, Award, Server, Zap } from "lucide-react"

const statsData = [
  {
    value: 100,
    suffix: "TB+",
    label: "Data Processed",
    description: "Across multiple industries",
    icon: Database,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful data solutions",
    icon: Code2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    value: 99.9,
    label: "System Uptime",
    description: "Reliable infrastructure",
    icon: Cloud,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    isPercentage: true,
  },
  {
    value: 5000000,
    label: "Records Processed",
    description: "Daily processing capacity",
    icon: Server,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    isCompact: true,
  },
  {
    value: 15,
    suffix: "+",
    label: "Technologies",
    description: "Mastered and implemented",
    icon: Zap,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    value: 95,
    label: "Client Satisfaction",
    description: "Based on project feedback",
    icon: Award,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    isPercentage: true,
  },
]

export function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with parallax */}
      <ParallaxContainer speed={0.3} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      </ParallaxContainer>

      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Track Record</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delivering data solutions that drive business growth and innovation across industries
          </p>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2} stagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <MagneticCard
                key={index}
                className="p-6 rounded-xl bg-card border hover:shadow-lg transition-all duration-300"
                strength={15}
                radius={200}
                enableRotation={true}
                rotationStrength={2}
                glowOnHover={true}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl font-bold mb-1">
                      {stat.isPercentage ? (
                        <PercentageCounter value={stat.value} delay={0.5 + index * 0.1} className={stat.color} />
                      ) : stat.isCompact ? (
                        <CompactCounter value={stat.value} delay={0.5 + index * 0.1} className={stat.color} />
                      ) : (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          delay={0.5 + index * 0.1}
                          className={stat.color}
                        />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              </MagneticCard>
            ))}
          </div>
        </ScrollAnimation>

        {/* Additional metrics row */}
        <ScrollAnimation direction="up" delay={0.8} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <AnimatedCounter value={5} suffix="+" delay={1} />
              </div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <AnimatedCounter value={24} suffix="/7" delay={1.2} />
              </div>
              <div className="text-sm text-muted-foreground">System Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <AnimatedCounter value={3} suffix=" Clouds" delay={1.4} />
              </div>
              <div className="text-sm text-muted-foreground">Platform Expertise</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                <PercentageCounter value={100} delay={1.6} />
              </div>
              <div className="text-sm text-muted-foreground">Project Success Rate</div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
