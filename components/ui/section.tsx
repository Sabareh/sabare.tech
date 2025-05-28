import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  fullWidth?: boolean
}

export function Section({ children, className, containerClassName, fullWidth = false, ...props }: SectionProps) {
  return (
    <section className={cn("section-padding", className)} {...props}>
      <div className={cn("mx-auto container-padding", !fullWidth && "max-w-7xl", containerClassName)}>{children}</div>
    </section>
  )
}
