"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { type ReactNode, useRef } from "react"
import { cn } from "@/lib/utils"

interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
  glowColor?: string
}

export function Card3D({ children, className, intensity = 15, glowColor = "rgba(139,92,246,0.4)" }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transition-shadow duration-300",
        className,
      )}
      whileHover={{
        boxShadow: `0 25px 50px -12px ${glowColor}`,
      }}
    >
      {/* Glass morphism layers */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tl from-purple-500/10 via-transparent to-blue-500/10" />

      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 p-[1px] animate-gradient-shift">
        <div className="h-full w-full rounded-xl bg-transparent" />
      </div>

      {/* Content with 3D transform */}
      <div
        className="relative z-10 h-full w-full rounded-xl"
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
