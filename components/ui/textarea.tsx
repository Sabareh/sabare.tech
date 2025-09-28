"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        data-error={hasError ? "true" : undefined}
        className={cn(
          "flex w-full rounded-[var(--radius-lg)] border border-[color-mix(in srgb,var(--hairline) 70%, transparent)] bg-[color-mix(in srgb,var(--surface) 78%, transparent 22%)] px-4 py-3 text-sm text-[var(--text)] shadow-xs transition-smooth placeholder:text-[color-mix(in srgb,var(--muted) 80%, transparent)] focus-visible:outline-none focus-visible:focus-ring",
          "backdrop-glass-md glass-noise",
          hasError && "border-[color:color-mix(in srgb,var(--danger) 55%, transparent)]",
          className,
        )}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
