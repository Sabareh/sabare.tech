"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContentStatusBadge } from "./content-status-badge"
import { ContentTypeBadge } from "./content-type-badge"
import { formatDistanceToNow } from "date-fns"
import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ContentItem {
  id: string
  title: string
  type: "blog" | "project" | "experience" | "testimonial" | "page"
  status: "draft" | "published" | "scheduled" | "archived"
  author: {
    name: string
    avatar?: string
  }
  updatedAt: Date
  publishedAt?: Date
  views?: number
}

interface ContentOverviewProps {
  content?: ContentItem[]
  limit?: number
  onEdit?: (id: string) => void
  onView?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ContentOverview({ content = [], limit = 5, onEdit, onView, onDelete }: ContentOverviewProps) {
  const displayContent = content.slice(0, limit)

  if (displayContent.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Edit className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No content to display</p>
            <Button className="mt-4" size="sm">
              Create your first content
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayContent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <ContentTypeBadge type={item.type} />
                  <ContentStatusBadge status={item.status} />
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>By {item.author.name}</span>
                  <span>Updated {formatDistanceToNow(item.updatedAt, { addSuffix: true })}</span>
                  {item.views && (
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views} views</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {onView && (
                  <Button variant="ghost" size="sm" onClick={() => onView(item.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={() => onEdit(item.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onView && <DropdownMenuItem onClick={() => onView(item.id)}>View</DropdownMenuItem>}
                    {onEdit && <DropdownMenuItem onClick={() => onEdit(item.id)}>Edit</DropdownMenuItem>}
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    {onDelete && (
                      <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
