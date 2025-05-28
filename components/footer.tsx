"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { MagneticLink } from "@/components/ui/magnetic-link"
import { MagneticIcon } from "@/components/ui/magnetic-icon"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/victorsabare", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/victorsabare", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/victorsabare", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:contact@victorsabare.com", label: "Email" },
  ]

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/uses", label: "Uses" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <footer className="border-t py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <MagneticLink href="/" className="text-xl font-bold tracking-tighter" strength={15} scale={1.05}>
              Victor Sabare
            </MagneticLink>
            <p className="mt-2 text-muted-foreground">Data Engineer & Analytics Specialist</p>
            <div className="flex items-center space-x-3 mt-4">
              {socialLinks.map((link, index) => (
                <MagneticIcon
                  key={index}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 transition-colors"
                  strength={40}
                  radius={100}
                  scale={1.2}
                  enableRotation={true}
                  rotationStrength={10}
                  glowOnHover={true}
                >
                  <Link href={link.href} aria-label={link.label}>
                    {link.icon}
                  </Link>
                </MagneticIcon>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <MagneticLink
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  strength={15}
                  radius={80}
                  scale={1.05}
                >
                  {link.label}
                </MagneticLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>San Francisco, CA</p>
              <MagneticLink
                href="mailto:contact@victorsabare.com"
                className="mt-2 block hover:text-primary transition-colors"
                strength={15}
                radius={80}
                scale={1.05}
              >
                contact@victorsabare.com
              </MagneticLink>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} Victor Sabare. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <MagneticLink
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              strength={15}
              radius={80}
              scale={1.05}
            >
              Privacy Policy
            </MagneticLink>
            <MagneticLink
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              strength={15}
              radius={80}
              scale={1.05}
            >
              Terms of Service
            </MagneticLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
