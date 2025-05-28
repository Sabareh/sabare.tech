"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"

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
  elements: FloatingElement[]
  className?: string
}

export function ParallaxFloatingElements({ elements, className = "" }: ParallaxFloatingElementsProps) {
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
        const y = useTransform(smoothProgress, [0, 1], [0, element.speed * 100])
        const x = useTransform(smoothProgress, [0, 1], [0, element.speed * 50 * (Math.random() > 0.5 ? 1 : -1)])
        const rotate = useTransform(smoothProgress, [0, 1], [0, element.rotation || 360])
        const scale = useTransform(
          smoothProgress,
          [0, 0.5, 1],
          [element.scale || 1, (element.scale || 1) * 1.2, element.scale || 1],
        )

        return (
          <motion.div
            key={element.id}
            style={{
              x,
              y,
              rotate,
              scale,
              opacity: element.opacity || 0.6,
            }}
            className="absolute will-change-transform"
            initial={{
              left: element.initialX,
              top: element.initialY,
            }}
          >
            {element.icon}
          </motion.div>
        )
      })}
    </div>
  )
}
