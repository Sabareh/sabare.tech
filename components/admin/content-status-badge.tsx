"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ContentStatusBadgeProps {
  status: "draft" | "published" | "scheduled" | "archived"
  className?: string
}

export function ContentStatusBadge({ status, className }: ContentStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "published":
        return {
          label: "Published",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
        }
      case "draft":
        return {
          label: "Draft",
          variant: "secondary" as const,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
        }
      case "scheduled":
        return {
          label: "Scheduled",
          variant: "outline" as const,
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
        }
      case "archived":
        return {
          label: "Archived",
          variant: "outline" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300",
        }
      default:
        return {
          label: status,
          variant: "outline" as const,
          className: "",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
