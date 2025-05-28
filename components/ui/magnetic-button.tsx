"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface MagneticButtonProps extends ButtonProps {
  strength?: number
  radius?: number
  scale?: number
  enableRotation?: boolean
  rotationStrength?: number
  glowOnHover?: boolean
  glowColor?: string
  children: React.ReactNode
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      strength = 25,
      radius = 150,
      scale = 1.05,
      enableRotation = false,
      rotationStrength = 3,
      glowOnHover = false,
      glowColor = "rgba(139, 92, 246, 0.5)",
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
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 rounded-md blur-md opacity-0 transition-opacity duration-300"
            style={{
              backgroundColor: glowColor,
              opacity: springScale.get() > 1 ? 0.6 : 0,
              scale: springScale,
            }}
          />
        )}
        <Button ref={ref} className={cn("relative z-10", className)} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  },
)

MagneticButton.displayName = "MagneticButton"
