"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "flat" | "elevated"
  as?: React.ElementType
}

export const GlassCard = React.forwardRef<HTMLElement, GlassCardProps>(
  ({ variant = "flat", as: Component = "div", className, children, ...props }, ref) => {
    const surfaceClass =
      variant === "elevated"
        ? "glass-elevated glass-noise shadow-lg"
        : "glass-surface glass-noise shadow-sm"

    return (
      <Component
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-xl)] border border-[color-mix(in srgb,var(--glass-stroke) 70%, transparent)] p-6 transition duration-300 transition-smooth hover:-translate-y-1 hover:shadow-lg",
          surfaceClass,
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-px rounded-[calc(var(--radius-xl)-2px)] border border-white/5" />
        <div className="relative z-[1] flex flex-col gap-4">{children}</div>
      </Component>
    )
  },
)

GlassCard.displayName = "GlassCard"
