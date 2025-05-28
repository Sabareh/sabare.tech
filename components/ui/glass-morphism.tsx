"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassMorphismProps {
  children: ReactNode
  className?: string
  variant?: "card" | "nav" | "button" | "floating"
  intensity?: "light" | "medium" | "strong"
  hover3d?: boolean
  glow?: boolean
}

export function GlassMorphism({
  children,
  className,
  variant = "card",
  intensity = "medium",
  hover3d = false,
  glow = false,
}: GlassMorphismProps) {
  const baseClasses = "relative overflow-hidden"

  const variantClasses = {
    card: "rounded-xl border border-white/20 shadow-xl",
    nav: "rounded-lg border border-white/10 shadow-lg",
    button: "rounded-lg border border-white/30 shadow-md",
    floating: "rounded-2xl border border-white/25 shadow-2xl",
  }

  const intensityClasses = {
    light: "bg-white/5 backdrop-blur-sm",
    medium: "bg-white/10 backdrop-blur-md",
    strong: "bg-white/20 backdrop-blur-lg",
  }

  const glowClasses = glow ? "shadow-[0_0_50px_rgba(139,92,246,0.3)]" : ""

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], intensityClasses[intensity], glowClasses, className)}
      whileHover={
        hover3d
          ? {
              rotateX: 5,
              rotateY: 5,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : undefined
      }
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Glass reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />

      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 animate-gradient-shift">
        <div className="h-full w-full rounded-[inherit] bg-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Hover glow effect */}
      {hover3d && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 rounded-[inherit]"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
