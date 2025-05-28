"use client"

import { motion } from "framer-motion"
import { Star, Quote, Building2, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from "next/link"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechFlow Solutions",
    companyLogo: "/techflow-logo.png",
    avatar: "/sarah-chen-avatar.png",
    rating: 5,
    content:
      "Working with this data engineer transformed our entire data infrastructure. They built a scalable pipeline that processes 10TB+ daily and reduced our processing time by 75%. The real-time analytics dashboard they created has become essential for our decision-making process.",
    project: "Real-time Data Pipeline",
    results: ["75% faster processing", "10TB+ daily capacity", "99.9% uptime"],
    featured: true,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO",
    company: "DataDriven Corp",
    companyLogo: "/datadriven-logo.png",
    avatar: "/michael-rodriguez-avatar.png",
    rating: 5,
    content:
      "Exceptional work on our data warehouse migration to AWS. The new architecture handles our growing data needs perfectly, and the cost optimization strategies saved us 40% on cloud expenses. Professional, knowledgeable, and delivers on time.",
    project: "AWS Data Warehouse Migration",
    results: ["40% cost reduction", "5x better performance", "Zero downtime migration"],
    featured: true,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Head of Analytics",
    company: "InsightTech",
    companyLogo: "/insighttech-logo.png",
    avatar: "/emily-watson-avatar.png",
    rating: 5,
    content:
      "The machine learning pipeline they built for our recommendation system increased user engagement by 35%. Their expertise in both data engineering and ML operations made the entire project seamless. Highly recommend for any data-intensive project.",
    project: "ML Pipeline Development",
    results: ["35% engagement increase", "Real-time predictions", "Automated model deployment"],
    featured: false,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Data Science Director",
    company: "Analytics Pro",
    companyLogo: "/analyticspro-logo.png",
    avatar: "/david-kim-avatar.png",
    rating: 5,
    content:
      "Outstanding data quality framework implementation. They established comprehensive data validation, monitoring, and alerting systems that caught critical issues before they impacted our business. The documentation and training provided were excellent.",
    project: "Data Quality Framework",
    results: ["99.5% data accuracy", "50% faster issue detection", "Comprehensive monitoring"],
    featured: false,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Engineering Manager",
    company: "CloudScale Systems",
    companyLogo: "/cloudscale-logo.png",
    avatar: "/lisa-thompson-avatar.png",
    rating: 5,
    content:
      "Delivered a complex multi-cloud data integration solution that connects our AWS, GCP, and Azure environments. The unified data platform they built gives us a single source of truth across all our cloud services. Exceptional technical skills and communication.",
    project: "Multi-Cloud Integration",
    results: ["3 cloud platforms unified", "Single source of truth", "Reduced complexity by 60%"],
    featured: false,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Product Manager",
    company: "StreamFlow Inc",
    companyLogo: "/streamflow-logo.png",
    avatar: "/james-wilson-avatar.png",
    rating: 5,
    content:
      "The real-time streaming analytics platform they developed processes millions of events per second with sub-second latency. This has enabled us to provide instant insights to our customers and significantly improved our product offering.",
    project: "Streaming Analytics Platform",
    results: ["Millions of events/sec", "Sub-second latency", "Real-time insights"],
    featured: false,
  },
]

const stats = [
  { label: "Client Satisfaction", value: "100%", icon: Star },
  { label: "Projects Delivered", value: "50+", icon: Building2 },
  { label: "Team Members Trained", value: "200+", icon: Users },
  { label: "Performance Improvement", value: "75%", icon: TrendingUp },
]

const companies = [
  { name: "TechFlow Solutions", logo: "/techflow-logo.png" },
  { name: "DataDriven Corp", logo: "/datadriven-logo.png" },
  { name: "InsightTech", logo: "/insighttech-logo.png" },
  { name: "Analytics Pro", logo: "/analyticspro-logo.png" },
  { name: "CloudScale Systems", logo: "/cloudscale-logo.png" },
  { name: "StreamFlow Inc", logo: "/streamflow-logo.png" },
  { name: "DataVault", logo: "/datavault-logo.png" },
  { name: "PipelineWorks", logo: "/pipelineworks-logo.png" },
]

export default function TestimonialsPage() {
  const featuredTestimonials = testimonials.filter((t) => t.featured)
  const allTestimonials = testimonials

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-4">
              Client Success Stories
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              See how I've helped companies transform their data infrastructure, improve performance, and drive business
              growth through innovative data engineering solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Success Stories</h2>
            <p className="text-xl text-muted-foreground">Transformative projects that delivered exceptional results</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass-effect hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <Badge variant="secondary">{testimonial.project}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Image
                            src={testimonial.companyLogo || "/placeholder.svg"}
                            alt={testimonial.company}
                            width={20}
                            height={20}
                            className="rounded"
                          />
                          <span className="text-sm font-medium">{testimonial.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.content}</p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Results:</h4>
                      <div className="flex flex-wrap gap-2">
                        {testimonial.results.map((result, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {result}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials Carousel */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">What Clients Say</h2>
            <p className="text-xl text-muted-foreground">Hear from the teams I've worked with</p>
          </motion.div>

          <Carousel className="w-full">
            <CarouselContent>
              {allTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{testimonial.role}</p>
                          <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{testimonial.content}</p>

                      <Badge variant="outline" className="text-xs">
                        {testimonial.project}
                      </Badge>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Company Logos */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Trusted by Leading Companies</h2>
            <p className="text-muted-foreground">From startups to enterprise organizations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
          >
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center items-center p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={120}
                  height={60}
                  className="opacity-60 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Data Infrastructure?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join these successful companies and let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">View Case Studies</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
