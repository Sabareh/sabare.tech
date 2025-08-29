"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, Clock, Linkedin, Github, Globe } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { Section } from "@/components/ui/section"
import { ModernButton } from "@/components/ui/modern-button"
import Link from "next/link"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sabarevictor@gmail.com",
    href: "mailto:sabarevictor@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone", 
    value: "+254 113193473",
    href: "tel:+254113193473",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
]

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "victorsabare",
    href: "https://www.linkedin.com/in/victorsabare",
  },
  {
    icon: Github,
    label: "GitHub", 
    value: "Sabareh",
    href: "https://github.com/Sabareh",
  },
  {
    icon: Globe,
    label: "Website",
    value: "sabare.tech",
    href: "https://sabare.tech",
  },
]

export function ContactSection() {
  return (
    <Section id="contact" className="py-20">
      <div className="container">
        {/* Header */}
        <ScrollAnimation direction="up" className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on your next data engineering project? Let's discuss how I can help transform your data into actionable insights.
          </p>
        </ScrollAnimation>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <ParallaxContainer speed={0.1} direction="left" delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              {contactInfo.map((item, index) => (
                <ScrollAnimation key={item.label} delay={index * 0.1}>
                  <Card className="glass-effect">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.label}</h4>
                          {item.href ? (
                            <Link 
                              href={item.href}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {item.value}
                            </Link>
                          ) : (
                            <p className="text-muted-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <social.icon className="h-6 w-6 text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ParallaxContainer>

          {/* Call to Action */}
          <ParallaxContainer speed={0.15} direction="right" delay={0.4}>
            <Card className="glass-effect h-full">
              <CardContent className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">Let's Work Together</h3>
                <div className="space-y-4 mb-8">
                  <p className="text-muted-foreground">
                    I'm always interested in discussing new opportunities in:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Data Engineering</Badge>
                    <Badge variant="secondary">Analytics Consulting</Badge>
                    <Badge variant="secondary">Business Intelligence</Badge>
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">Cloud Architecture</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <ModernButton size="lg" className="w-full" asChild>
                    <Link href="mailto:sabarevictor@gmail.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </Link>
                  </ModernButton>
                  
                  <ModernButton variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/resume" target="_blank">
                      Download Resume
                    </Link>
                  </ModernButton>
                </div>
              </CardContent>
            </Card>
          </ParallaxContainer>
        </div>
      </div>
    </Section>
  )
}