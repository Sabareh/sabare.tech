"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface MagneticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number
  radius?: number
  scale?: number
  enableRotation?: boolean
  rotationStrength?: number
  glowOnHover?: boolean
  glowColor?: string
  perspective?: number
  children: React.ReactNode
}

export const MagneticCard = forwardRef<HTMLDivElement, MagneticCardProps>(
  (
    {
      strength = 15,
      radius = 400,
      scale = 1.02,
      enableRotation = true,
      rotationStrength = 2,
      glowOnHover = false,
      glowColor = "rgba(139, 92, 246, 0.3)",
      perspective = 1000,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const {
      elementRef,
      springX,
      springY,
      springRotateX,
      springRotateY,
      springScale,
      handleMouseMove,
      handleMouseLeave,
      handleMouseEnter,
    } = useMagnetic({
      strength,
      radius,
      scale,
      enableRotation,
      rotationStrength,
    })

    return (
      <motion.div
        ref={elementRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          x: springX,
          y: springY,
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          perspective: perspective,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 rounded-lg blur-lg opacity-0 transition-opacity duration-300"
            style={{
              backgroundColor: glowColor,
              opacity: springScale.get() > 1 ? 0.4 : 0,
              scale: springScale,
            }}
          />
        )}
        <div ref={ref} className={cn("relative z-10", className)} {...props}>
          {children}
        </div>
      </motion.div>
    )
  },
)

MagneticCard.displayName = "MagneticCard"
