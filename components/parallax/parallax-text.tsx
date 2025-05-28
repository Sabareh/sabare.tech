"use client"

import { useRef, type ReactNode, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"

interface ParallaxTextProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down"
  className?: string
  stagger?: boolean
}

export function ParallaxText({
  children,
  speed = 0.3,
  direction = "up",
  className = "",
  stagger = false,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const words = useMemo(() => {
    if (stagger && typeof children === "string") {
      return children.split(" ")
    }
    return null
  }, [children, stagger])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  })

  const y = useTransform(
    smoothProgress,
    [0, 1],
    direction === "up" ? [50 * speed, -50 * speed] : [-50 * speed, 50 * speed],
  )

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  if (stagger && words) {
    const wordTransforms = useMemo(() => {
      return words.map((_, index) => {
        return useTransform(
          smoothProgress,
          [0, 1],
          direction === "up"
            ? [50 * speed + index * 10, -50 * speed - index * 10]
            : [-50 * speed - index * 10, 50 * speed + index * 10],
        )
      })
    }, [smoothProgress, direction, speed, words])

    return (
      <div ref={ref} className={className}>
        {words.map((word, index) => {
          const wordY = wordTransforms[index]

          return (
            <motion.span key={index} style={{ y: wordY, opacity }} className="inline-block mr-2 will-change-transform">
              {word}
            </motion.span>
          )
        })}
      </div>
    )
  }

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  )
}
