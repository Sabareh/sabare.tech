"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"

interface FloatingElement {
  id: string
  icon: React.ReactNode
  initialX: string
  initialY: string
  speed: number
  scale?: number
  rotation?: number
  opacity?: number
}

interface ParallaxFloatingElementsProps {
  elements?: FloatingElement[]
  className?: string
}

export function ParallaxFloatingElements({ elements = [], className = "" }: ParallaxFloatingElementsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  })

  // Early return if no elements - but after all hooks are called
  if (!elements || elements.length === 0) {
    return <div ref={ref} className="hidden" />
  }

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: element.initialX,
              top: element.initialY,
              opacity: element.opacity || 0.6,
            }}
          >
            {element.icon}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      {elements.map((element) => {
        // Create unique random values for each element
        const randomDirection = Math.random() > 0.5 ? 1 : -1

        return (
          <motion.div
            key={element.id}
            className="absolute will-change-transform"
            style={{
              left: element.initialX,
              top: element.initialY,
              opacity: element.opacity || 0.6,
            }}
            animate={{
              y: [0, element.speed * 100],
              x: [0, element.speed * 50 * randomDirection],
              rotate: [0, element.rotation || 360],
              scale: [element.scale || 1, (element.scale || 1) * 1.2, element.scale || 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            {element.icon}
          </motion.div>
        )
      })}
    </div>
  )
}
