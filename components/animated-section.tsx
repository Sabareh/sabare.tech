"use client"

import type { ReactNode } from "react"
import { ScrollAnimation, ScrollItem } from "./scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  direction?: "up" | "down" | "left" | "right" | "scale" | "opacity"
  timing?: "stagger" | "group" | "individual"
  delay?: number
  threshold?: number
  id?: string
  titleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
}

export function AnimatedSection({
  children,
  className,
  title,
  description,
  direction = "up",
  timing = "group",
  delay = 0,
  threshold = 0.1,
  id,
  titleClassName,
  descriptionClassName,
  contentClassName,
}: AnimatedSectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <ScrollAnimation direction="up" delay={delay} threshold={threshold} className="mb-12 text-center">
            {title && <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", titleClassName)}>{title}</h2>}
            {description && (
              <p className={cn("text-lg text-muted-foreground max-w-3xl mx-auto", descriptionClassName)}>
                {description}
              </p>
            )}
          </ScrollAnimation>
        )}

        <ScrollAnimation
          direction={direction}
          delay={delay + 0.2}
          threshold={threshold}
          timing={timing}
          className={contentClassName}
        >
          {children}
        </ScrollAnimation>
      </div>
    </section>
  )
}

export function AnimatedGrid({
  children,
  className,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = "gap-6",
  staggerDelay = 0.1,
}: {
  children: ReactNode
  className?: string
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
  staggerDelay?: number
}) {
  const getGridCols = () => {
    const cols = []
    if (columns.default) cols.push(`grid-cols-${columns.default}`)
    if (columns.sm) cols.push(`sm:grid-cols-${columns.sm}`)
    if (columns.md) cols.push(`md:grid-cols-${columns.md}`)
    if (columns.lg) cols.push(`lg:grid-cols-${columns.lg}`)
    if (columns.xl) cols.push(`xl:grid-cols-${columns.xl}`)
    return cols.join(" ")
  }

  return (
    <ScrollAnimation timing="stagger" staggerChildren={staggerDelay} className={cn("w-full", className)}>
      <div className={cn("grid", getGridCols(), gap)}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <ScrollItem key={index} delay={index * staggerDelay}>
                {child}
              </ScrollItem>
            ))
          : children}
      </div>
    </ScrollAnimation>
  )
}
