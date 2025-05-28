"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  strength?: number
  radius?: number
  scale?: number
  enableRotation?: boolean
  rotationStrength?: number
  glowOnHover?: boolean
  glowColor?: string
}

export function MagneticButton({
  children,
  className,
  isLoading = false,
  disabled,
  // Extract custom props so they don't get spread to DOM
  strength,
  radius,
  scale,
  enableRotation,
  rotationStrength,
  glowOnHover,
  glowColor,
  ...props
}: MagneticButtonProps) {
  return (
    <button
      className={cn("relative overflow-hidden transition-all", className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
      {children}
    </button>
  )
}
