"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { MagneticLink } from "@/components/ui/magnetic-link"
import { MagneticIcon } from "@/components/ui/magnetic-icon"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Sabareh", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/victorsabare", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/victorsabare", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:sabarevictor@gmail.com", label: "Email" },
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
    <footer className="relative mt-24 overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 -z-10 ambient-gradient opacity-80" />
      <div className="container mx-auto px-4">
        <div className="liquid-glass liquid-noise rounded-[2.5rem] border border-white/10 p-10 shadow-[0_40px_80px_-50px_rgba(6,16,38,0.85)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
              <MagneticLink href="/" className="gradient-text text-2xl font-bold tracking-tight" strength={15} scale={1.05}>
                Victor Sabare
              </MagneticLink>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground/85">
                Data Engineer @ Stanbic Bank Kenya
              </p>
              <div className="mt-6 flex items-center space-x-3">
                {socialLinks.map((link, index) => (
                  <MagneticIcon
                    key={index}
                    className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-primary transition-all duration-300 hover:border-white/30 hover:text-primary"
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
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">Navigation</h3>
              <nav className="mt-4 flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <MagneticLink
                    key={index}
                    href={link.href}
                    className="text-sm uppercase tracking-[0.2em] text-muted-foreground/75 transition-colors duration-300 hover:text-primary"
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
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">Contact</h3>
              <address className="mt-4 not-italic text-sm text-muted-foreground/80">
                <p>Ngong Road, Nairobi County, Kenya</p>
                <MagneticLink
                  href="mailto:sabarevictor@gmail.com"
                  className="mt-3 inline-flex items-center gap-2 text-primary transition-colors duration-300 hover:text-primary/80"
                  strength={15}
                  radius={80}
                  scale={1.05}
                >
                  sabarevictor@gmail.com
                </MagneticLink>
              </address>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.28em] text-muted-foreground/70 md:flex-row">
            <p className="text-center md:text-left">© {currentYear} Victor Sabare. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <MagneticLink
                href="/privacy"
                className="transition-colors duration-300 hover:text-primary"
                strength={15}
                radius={80}
                scale={1.05}
              >
                Privacy Policy
              </MagneticLink>
              <MagneticLink
                href="/terms"
                className="transition-colors duration-300 hover:text-primary"
                strength={15}
                radius={80}
                scale={1.05}
              >
                Terms of Service
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
