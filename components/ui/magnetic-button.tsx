"use client"

import type React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import React from "react" // Add this line

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
  asChild?: boolean
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({
    asChild = false,
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
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn("relative transition-all", className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {children}
          </>
        )}
      </Comp>
    )
  }
)
MagneticButton.displayName = "MagneticButton"
