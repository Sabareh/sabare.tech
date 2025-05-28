import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode
  footer?: React.ReactNode
  badges?: string[]
  isHoverable?: boolean
  isLink?: boolean
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  children?: React.ReactNode
}

export function ModernCard({
  title,
  description,
  icon,
  footer,
  badges,
  isHoverable = true,
  isLink = false,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  children,
  ...props
}: ModernCardProps) {
  return (
    <Card
      className={cn(
        "glass-effect overflow-hidden",
        isHoverable && "card-hover",
        isLink && "group cursor-pointer",
        className,
      )}
      {...props}
    >
      {(title || description || icon || badges) && (
        <CardHeader className={cn("flex flex-row items-start justify-between space-y-0", headerClassName)}>
          <div>
            {title && (
              <CardTitle className="group-hover:text-primary transition-colors">
                {title}
                {isLink && (
                  <ArrowUpRight className="inline-block ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </CardTitle>
            )}
            {description && <CardDescription className="mt-2">{description}</CardDescription>}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {icon && <div className="flex-shrink-0">{icon}</div>}
        </CardHeader>
      )}
      {children && <CardContent className={cn("pt-0", contentClassName)}>{children}</CardContent>}
      {footer && <CardFooter className={cn("flex justify-between", footerClassName)}>{footer}</CardFooter>}
    </Card>
  )
}
