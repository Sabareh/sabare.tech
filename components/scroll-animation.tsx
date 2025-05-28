"use client"

import React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
  threshold?: number
  stagger?: boolean
  staggerDelay?: number
}

export function ScrollAnimation({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 50,
  className,
  once = true,
  threshold = 0.1,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-10%" })
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const getInitialState = () => {
    if (prefersReducedMotion) return {}

    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      case "scale":
        return { opacity: 0, scale: 0.8 }
      case "fade":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimateState = () => {
    if (prefersReducedMotion) return { opacity: 1 }

    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      case "scale":
        return { opacity: 1, scale: 1 }
      case "fade":
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start(getAnimateState())
      if (once) setHasAnimated(true)
    } else if (!isInView && !once) {
      controls.start(getInitialState())
    }
  }, [isInView, controls, once, hasAnimated])

  if (stagger) {
    return (
      <div ref={ref} className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            initial={getInitialState()}
            animate={controls}
            transition={{
              duration: prefersReducedMotion ? 0 : duration,
              delay: prefersReducedMotion ? 0 : delay + index * staggerDelay,
              ease: "easeOut",
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={controls}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}

export function ScrollItem({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  distance = 30,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
  duration?: number
  distance?: number
  className?: string
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const getInitialState = () => {
    if (prefersReducedMotion) return {}

    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      case "scale":
        return { opacity: 0, scale: 0.8 }
      case "fade":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimateState = () => {
    if (prefersReducedMotion) return { opacity: 1 }

    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      case "scale":
        return { opacity: 1, scale: 1 }
      case "fade":
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  const variants = {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div variants={variants} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  )
}
