"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxContainerProps {
  children: React.ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  scale?: boolean
  rotate?: boolean
  className?: string
  disabled?: boolean
}

export function ParallaxContainer({
  children,
  speed = 0.5,
  direction = "up",
  scale = false,
  rotate = false,
  className,
  disabled = false,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Create smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform values based on direction and speed
  const distance = 100 * speed
  const upTransform = useTransform(smoothProgress, [0, 1], [distance, -distance])
  const downTransform = useTransform(smoothProgress, [0, 1], [-distance, distance])
  const leftTransform = useTransform(smoothProgress, [0, 1], [distance, -distance])
  const rightTransform = useTransform(smoothProgress, [0, 1], [-distance, distance])

  const getTransform = () => {
    if (disabled || prefersReducedMotion) return 0

    switch (direction) {
      case "up":
        return upTransform
      case "down":
        return downTransform
      case "left":
        return leftTransform
      case "right":
        return rightTransform
      default:
        return 0
    }
  }

  const transform = getTransform()
  const scaleTransform =
    scale && !disabled && !prefersReducedMotion ? useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]) : 1
  const rotateTransform =
    rotate && !disabled && !prefersReducedMotion ? useTransform(smoothProgress, [0, 1], [0, 360]) : 0

  const motionStyle = {
    ...(direction === "up" || direction === "down" ? { y: transform } : { x: transform }),
    ...(scale && { scale: scaleTransform }),
    ...(rotate && { rotate: rotateTransform }),
  }

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={motionStyle} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  )
}
