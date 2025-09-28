"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  Home,
  User,
  Briefcase,
  PenSquare,
  MessageCircle,
  Sparkles,
  SendHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RadialNavigationProps {
  className?: string
  radius?: number
}

interface RadialNavItem {
  href: string
  label: string
  icon: LucideIcon
}

const RADIAL_ITEMS: RadialNavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: PenSquare },
  { href: "/testimonials", label: "Social Proof", icon: Sparkles },
  { href: "/contact", label: "Contact", icon: SendHorizontal },
  { href: "/uses", label: "Uses", icon: MessageCircle },
]

export function RadialNavigation({ className, radius = 90 }: RadialNavigationProps) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const positions = useMemo(() => {
    const count = RADIAL_ITEMS.length
    return RADIAL_ITEMS.map((_, index) => {
      const angle = (index / count) * 360 - 90
      const transform = `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`
      return { angle, transform }
    })
  }, [radius])

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-20 left-6 z-40 hidden md:block lg:left-10",
        className,
      )}
    >
      <div className="group relative flex h-48 w-48 items-center justify-center">
        <div className="absolute inset-12 rounded-full border border-border/60 bg-background/50 backdrop-blur-md transition-transform duration-300 group-hover:scale-105" />

        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border/80 bg-background/80 text-sm font-medium uppercase tracking-wide shadow-lg shadow-black/5 transition-all duration-300 group-hover:shadow-black/10">
            Explore
          </div>
        </div>

        {RADIAL_ITEMS.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "pointer-events-auto absolute flex h-12 w-12 -translate-y-2 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground opacity-0 shadow-sm shadow-black/10 transition-all duration-300 ease-out scale-75",
                pathname === item.href
                  ? "bg-primary text-primary-foreground border-primary/70"
                  : "hover:border-primary/60 hover:bg-primary/10",
                "group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100",
              )}
              style={{ transform: positions[index].transform }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() =>
                setActiveIndex((prevIndex: number | null) => (prevIndex === index ? null : prevIndex))
              }
              onFocus={() => setActiveIndex(index)}
              onBlur={() =>
                setActiveIndex((prevIndex: number | null) => (prevIndex === index ? null : prevIndex))
              }
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />

              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground opacity-0 shadow-lg transition-all duration-200",
                  activeIndex === index ? "opacity-100 translate-y-0" : "",
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
