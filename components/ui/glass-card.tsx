"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  tilt?: boolean
  magnetic?: boolean
  glow?: boolean
}

export function GlassCard({
  children,
  className,
  hover = true,
  tilt = false,
  magnetic = false,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-card relative overflow-hidden",
        hover && "hover:shadow-2xl hover:shadow-primary/20",
        tilt && "tilt",
        magnetic && "magnetic",
        glow && "pulse-glow",
        className,
      )}
      whileHover={
        hover
          ? {
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : undefined
      }
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Hover glow effect */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </motion.div>
  )
}
