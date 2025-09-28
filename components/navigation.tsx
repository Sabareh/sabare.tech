"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Command } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandPalette } from "@/components/command-palette"
import { MagneticLink } from "@/components/ui/magnetic-link"
import { MagneticIcon } from "@/components/ui/magnetic-icon"

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleCommand = () => {
    setIsCommandOpen(!isCommandOpen)
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/uses", label: "Uses" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]",
          isScrolled
            ? "glass-nav glass-effect liquid-noise border-b border-white/10 py-2"
            : "py-6 backdrop-blur-none"
          ,
          className,
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <MagneticLink
            href="/"
            className="gradient-text text-xl font-bold tracking-tight"
            strength={15}
            scale={1.05}
          >
            Victor Sabare
          </MagneticLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <MagneticLink
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300",
                  pathname === item.href
                    ? "text-primary drop-shadow-[0_0_18px_rgba(36,196,255,0.55)]"
                    : "text-muted-foreground/80 hover:text-primary hover:drop-shadow-[0_0_20px_rgba(36,196,255,0.35)]",
                )}
                strength={20}
                radius={80}
                scale={1.1}
              >
                {item.label}
              </MagneticLink>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <MagneticIcon
              className="flex items-center justify-center w-10 h-10 rounded-full glass-effect border border-white/10 text-primary"
              onClick={toggleCommand}
              strength={30}
              radius={100}
              scale={1.15}
              enableRotation={true}
              rotationStrength={5}
            >
              <Command className="h-4 w-4" />
              <span className="sr-only">Command Menu</span>
            </MagneticIcon>

            <MagneticIcon
              className="flex items-center justify-center w-10 h-10 rounded-full glass-effect border border-white/10"
              strength={30}
              radius={100}
              scale={1.15}
              enableRotation={true}
              rotationStrength={5}
            >
              <ThemeToggle />
            </MagneticIcon>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full glass-effect border border-white/10"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 ambient-gradient backdrop-blur-2xl md:hidden">
          <div className="container mx-auto px-4 py-20">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "liquid-glass liquid-noise border border-white/10 px-5 py-4 text-lg font-medium uppercase tracking-[0.18em] transition-all",
                    pathname === item.href
                      ? "text-primary shadow-[0_18px_38px_-20px_rgba(36,196,255,0.7)]"
                      : "text-muted-foreground/85 hover:text-primary hover:shadow-[0_18px_38px_-20px_rgba(36,196,255,0.5)]",
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <CommandPalette open={isCommandOpen} onOpenChange={setIsCommandOpen} />
    </>
  )
}
