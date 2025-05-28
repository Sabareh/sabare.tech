"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface MagneticIconProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number
  radius?: number
  scale?: number
  enableRotation?: boolean
  rotationStrength?: number
  glowOnHover?: boolean
  glowColor?: string
  children: React.ReactNode
}

export const MagneticIcon = forwardRef<HTMLDivElement, MagneticIconProps>(
  (
    {
      strength = 40,
      radius = 100,
      scale = 1.2,
      enableRotation = true,
      rotationStrength = 10,
      glowOnHover = true,
      glowColor = "rgba(139, 92, 246, 0.6)",
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
      springConfig: {
        stiffness: 350,
        damping: 15,
      },
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
        }}
        className="relative"
      >
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 rounded-full blur-md opacity-0 transition-opacity duration-300"
            style={{
              backgroundColor: glowColor,
              opacity: springScale.get() > 1 ? 0.7 : 0,
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

MagneticIcon.displayName = "MagneticIcon"
