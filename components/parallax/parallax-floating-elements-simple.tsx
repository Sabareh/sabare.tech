"use client"

import type React from "react"
import { useRef } from "react"
import { useReducedMotion } from "framer-motion"

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

export function ParallaxFloatingElementsSimple({ elements = [], className = "" }: ParallaxFloatingElementsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Early return if no elements
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
      {elements.map((element, index) => {
        const animationDelay = index * 0.5
        const animationDuration = 10 + element.speed * 5

        return (
          <div
            key={element.id}
            className="absolute animate-pulse"
            style={{
              left: element.initialX,
              top: element.initialY,
              opacity: element.opacity || 0.6,
              animationDelay: `${animationDelay}s`,
              animationDuration: `${animationDuration}s`,
              transform: `scale(${element.scale || 1}) rotate(${element.rotation || 0}deg)`,
            }}
          >
            {element.icon}
          </div>
        )
      })}
    </div>
  )
}
