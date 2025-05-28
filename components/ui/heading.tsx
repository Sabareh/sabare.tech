import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface HeadingProps {
  title: string
  description?: string
  badge?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  align?: "left" | "center" | "right"
  as?: "h1" | "h2" | "h3" | "h4"
}

export function Heading({
  title,
  description,
  badge,
  className,
  titleClassName,
  descriptionClassName,
  align = "left",
  as = "h2",
}: HeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  const HeadingTag = as

  return (
    <div className={cn("mb-12", alignClass[align], className)}>
      {badge && (
        <Badge variant="outline" className="mb-4">
          {badge}
        </Badge>
      )}
      <HeadingTag className={cn("font-bold", titleClassName)}>{title}</HeadingTag>
      {description && (
        <p
          className={cn(
            "text-muted-foreground mt-4 max-w-2xl",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
