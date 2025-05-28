"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"

interface ParallaxBackgroundProps {
  children: ReactNode
  speed?: number
  className?: string
  overlay?: boolean
  overlayOpacity?: number
}

export function ParallaxBackground({
  children,
  speed = 0.3,
  className = "",
  overlay = false,
  overlayOpacity = 0.4,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  })

  const y = useTransform(smoothProgress, [0, 1], ["0%", `${speed * 100}%`])
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1])

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        {children}
        {overlay && (
          <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
        )}
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        {children}
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-black pointer-events-none z-10" style={{ opacity: overlayOpacity }} />
      )}
    </div>
  )
}
