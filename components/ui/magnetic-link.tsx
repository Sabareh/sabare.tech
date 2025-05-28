"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { forwardRef } from "react"

interface MagneticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  strength?: number
  radius?: number
  scale?: number
  enableRotation?: boolean
  rotationStrength?: number
  underlineEffect?: boolean
  children: React.ReactNode
}

export const MagneticLink = forwardRef<HTMLAnchorElement, MagneticLinkProps>(
  (
    {
      href,
      strength = 20,
      radius = 100,
      scale = 1.1,
      enableRotation = false,
      rotationStrength = 3,
      underlineEffect = true,
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
          display: "inline-block",
        }}
        className="relative"
      >
        <Link
          ref={ref}
          href={href}
          className={cn("relative inline-block", underlineEffect && "group", className)}
          {...props}
        >
          {children}
          {underlineEffect && (
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
          )}
        </Link>
      </motion.div>
    )
  },
)

MagneticLink.displayName = "MagneticLink"
