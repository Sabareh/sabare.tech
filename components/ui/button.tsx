"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-transparent px-5 py-2.5 text-sm font-semibold text-[var(--text)] transition duration-200 transition-smooth focus-visible:outline-none focus-visible:ring-0 focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-50 will-change-transform",
  {
    variants: {
      variant: {
        primary:
          "bg-[color-mix(in srgb,var(--brand) 86%, white 14%)] text-white shadow-md hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0 active:shadow-sm",
        secondary:
          "glass-surface text-[var(--text)] border-[color:color-mix(in srgb,var(--hairline) 60%, transparent)] hover:-translate-y-[1px] hover:shadow-md active:translate-y-0",
        ghost:
          "text-[color-mix(in srgb,var(--text) 88%, black 12%)] hover:bg-[color-mix(in srgb,var(--surface) 70%, transparent)]",
        glass:
          "glass-elevated glass-noise border-[color:color-mix(in srgb,var(--glass-stroke) 75%, transparent)] shadow-md hover:-translate-y-[2px] hover:shadow-lg active:translate-y-0",
      },
      size: {
        sm: "h-9 rounded-[var(--radius-sm)] px-4 text-xs",
        md: "h-10 rounded-[var(--radius-md)] px-5 text-sm",
        lg: "h-12 rounded-[var(--radius-xl)] px-6 text-base",
        icon: "h-10 w-10 rounded-[var(--radius-md)] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={type}
        data-variant={variant}
        className={cn(
          buttonVariants({ variant, size }),
          "active:animate-press motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
