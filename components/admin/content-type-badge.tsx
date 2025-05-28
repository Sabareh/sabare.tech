"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileText, Briefcase, User, MessageSquare, File } from "lucide-react"

interface ContentTypeBadgeProps {
  type: "blog" | "project" | "experience" | "testimonial" | "page"
  className?: string
  showIcon?: boolean
}

export function ContentTypeBadge({ type, className, showIcon = false }: ContentTypeBadgeProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "blog":
        return {
          label: "Blog",
          icon: FileText,
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
        }
      case "project":
        return {
          label: "Project",
          icon: Briefcase,
          className: "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300",
        }
      case "experience":
        return {
          label: "Experience",
          icon: User,
          className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
        }
      case "testimonial":
        return {
          label: "Testimonial",
          icon: MessageSquare,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
        }
      case "page":
        return {
          label: "Page",
          icon: File,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
        }
      default:
        return {
          label: type,
          icon: File,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
        }
    }
  }

  const config = getTypeConfig(type)
  const Icon = config.icon

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  )
}
