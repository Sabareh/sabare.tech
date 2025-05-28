"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"

interface ParallaxLayer {
  content: ReactNode
  speed: number
  className?: string
  zIndex?: number
}

interface ParallaxLayersProps {
  layers: ParallaxLayer[]
  className?: string
  height?: string
}

export function ParallaxLayers({ layers, className = "", height = "100vh" }: ParallaxLayersProps) {
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
      <div ref={ref} className={`relative ${className}`} style={{ height }}>
        {layers.map((layer, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${layer.className || ""}`}
            style={{ zIndex: layer.zIndex || index }}
          >
            {layer.content}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height }}>
      {layers.map((layer, index) => {
        const y = useTransform(smoothProgress, [0, 1], [0, layer.speed * 100])

        return (
          <motion.div
            key={index}
            style={{ y, zIndex: layer.zIndex || index }}
            className={`absolute inset-0 will-change-transform ${layer.className || ""}`}
          >
            {layer.content}
          </motion.div>
        )
      })}
    </div>
  )
}
