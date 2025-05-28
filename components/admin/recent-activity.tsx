"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { FileText, ImageIcon, User, Calendar } from "lucide-react"

interface ActivityItem {
  id: string
  type: "content_created" | "content_updated" | "content_published" | "media_uploaded" | "user_created"
  title: string
  description: string
  user: {
    name: string
    avatar?: string
  }
  timestamp: Date
  metadata?: Record<string, any>
}

interface RecentActivityProps {
  activities?: ActivityItem[]
  limit?: number
}

export function RecentActivity({ activities = [], limit = 10 }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "content_created":
      case "content_updated":
      case "content_published":
        return FileText
      case "media_uploaded":
        return ImageIcon
      case "user_created":
        return User
      default:
        return Calendar
    }
  }

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "content_created":
        return "text-blue-600"
      case "content_updated":
        return "text-yellow-600"
      case "content_published":
        return "text-green-600"
      case "media_uploaded":
        return "text-purple-600"
      case "user_created":
        return "text-indigo-600"
      default:
        return "text-gray-600"
    }
  }

  const getActivityBadge = (type: ActivityItem["type"]) => {
    switch (type) {
      case "content_created":
        return (
          <Badge variant="outline" className="text-blue-600">
            Created
          </Badge>
        )
      case "content_updated":
        return (
          <Badge variant="outline" className="text-yellow-600">
            Updated
          </Badge>
        )
      case "content_published":
        return (
          <Badge variant="outline" className="text-green-600">
            Published
          </Badge>
        )
      case "media_uploaded":
        return (
          <Badge variant="outline" className="text-purple-600">
            Uploaded
          </Badge>
        )
      case "user_created":
        return (
          <Badge variant="outline" className="text-indigo-600">
            Joined
          </Badge>
        )
      default:
        return <Badge variant="outline">Activity</Badge>
    }
  }

  const displayActivities = activities.slice(0, limit)

  if (displayActivities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity to display</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            const iconColor = getActivityColor(activity.type)

            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2 rounded-full bg-muted ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    {getActivityBadge(activity.type)}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{activity.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{activity.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
