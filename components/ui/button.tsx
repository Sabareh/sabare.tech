import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl text-sm font-semibold uppercase tracking-[0.16em] ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "liquid-button text-primary-foreground shadow-[0_16px_32px_-18px_rgba(36,196,255,0.75)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_18px_30px_-20px_rgba(255,88,122,0.8)] hover:bg-destructive/90",
        outline:
          "liquid-glass liquid-noise border border-white/15 bg-transparent text-foreground/90 shadow-[0_14px_28px_-18px_rgba(6,16,38,0.65)] hover:border-white/25",
        secondary:
          "bg-secondary/60 text-secondary-foreground shadow-[0_12px_22px_-18px_rgba(6,16,38,0.6)] hover:bg-secondary/80",
        ghost: "text-accent-foreground hover:text-primary hover:shadow-[0_10px_20px_-15px_rgba(30,180,255,0.65)]",
        glass:
          "liquid-glass liquid-noise border border-white/10 text-primary-foreground/85 shadow-[0_18px_36px_-22px_rgba(6,16,38,0.7)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
