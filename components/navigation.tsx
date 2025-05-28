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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass-nav py-2" : "py-4",
          className,
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <MagneticLink href="/" className="text-xl font-bold tracking-tighter" strength={15} scale={1.05}>
            Victor Sabare
          </MagneticLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <MagneticLink
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary",
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
              className="flex items-center justify-center w-9 h-9 rounded-full"
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
              className="flex items-center justify-center w-9 h-9 rounded-full"
              strength={30}
              radius={100}
              scale={1.15}
              enableRotation={true}
              rotationStrength={5}
            >
              <ThemeToggle />
            </MagneticIcon>

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full"
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
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="container mx-auto px-4 py-20">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 text-lg font-medium rounded-md transition-colors",
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary",
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
