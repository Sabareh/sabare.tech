"use client"

import type React from "react"
import { useRef, useState } from "react"
import { useSpring } from "framer-motion"

interface UseMagneticOptions {
  strength?: number
  radius?: number
  scale?: number
  enableRotation?: boolean
  rotationStrength?: number
  springConfig?: {
    stiffness?: number
    damping?: number
  }
  disabled?: boolean
}

export function useMagnetic({
  strength = 30,
  radius = 150,
  scale = 1.1,
  enableRotation = false,
  rotationStrength = 5,
  springConfig = {
    stiffness: 300,
    damping: 20,
  },
  disabled = false,
}: UseMagneticOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Spring values for smooth animation
  const springX = useSpring(0, springConfig)
  const springY = useSpring(0, springConfig)
  const springRotateX = useSpring(0, springConfig)
  const springRotateY = useSpring(0, springConfig)
  const springScale = useSpring(1, springConfig)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current || disabled || prefersReducedMotion) return

    const rect = elementRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Only apply the effect if the cursor is within the radius
    if (distance < radius) {
      const strengthFactor = 1 - distance / radius
      const moveX = distanceX * strengthFactor * (strength / 100)
      const moveY = distanceY * strengthFactor * (strength / 100)

      springX.set(moveX)
      springY.set(moveY)

      if (enableRotation) {
        const rotateX = (distanceY / rect.height) * rotationStrength * strengthFactor
        const rotateY = -(distanceX / rect.width) * rotationStrength * strengthFactor
        springRotateX.set(rotateX)
        springRotateY.set(rotateY)
      }

      if (isHovered) {
        springScale.set(scale)
      }
    } else {
      // Reset if outside radius
      resetPosition()
    }
  }

  const resetPosition = () => {
    springX.set(0)
    springY.set(0)
    springRotateX.set(0)
    springRotateY.set(0)
  }

  const handleMouseLeave = () => {
    resetPosition()
    springScale.set(1)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    if (disabled || prefersReducedMotion) return
    setIsHovered(true)
    springScale.set(scale)
  }

  return {
    elementRef,
    springX,
    springY,
    springRotateX,
    springRotateY,
    springScale,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
    isActive: !disabled && !prefersReducedMotion,
  }
}
