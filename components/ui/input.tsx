"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", hasError, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-error={hasError ? "true" : undefined}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-md)] border border-[color-mix(in srgb,var(--hairline) 70%, transparent)] bg-[color-mix(in srgb,var(--surface) 82%, transparent 18%)] px-4 text-sm text-[var(--text)] shadow-xs transition-smooth placeholder:text-[color-mix(in srgb,var(--muted) 80%, transparent)] focus-visible:outline-none focus-visible:focus-ring",
        "backdrop-glass-sm glass-noise",
        hasError && "border-[color:color-mix(in srgb,var(--danger) 55%, transparent)]",
        className,
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
