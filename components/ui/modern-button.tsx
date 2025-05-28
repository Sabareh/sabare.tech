import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"

interface ModernButtonProps extends ButtonProps {
  isLoading?: boolean
  withArrow?: boolean
}

export function ModernButton({
  children,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  withArrow = false,
  ...props
}: ModernButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        withArrow && "group",
        isLoading && "cursor-not-allowed",
        className,
      )}
      variant={variant}
      size={size}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
      {withArrow && (
        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Button>
  )
}
