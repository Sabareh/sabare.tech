"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ImageIcon, Calendar } from "lucide-react"

interface StatsData {
  totalContent: number
  publishedContent: number
  draftContent: number
  scheduledContent: number
  totalMedia: number
  totalUsers: number
}

interface DashboardStatsProps {
  stats?: StatsData
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const defaultStats: StatsData = {
    totalContent: 0,
    publishedContent: 0,
    draftContent: 0,
    scheduledContent: 0,
    totalMedia: 0,
    totalUsers: 0,
    ...stats,
  }

  const statCards = [
    {
      title: "Total Content",
      value: defaultStats.totalContent,
      icon: FileText,
      description: "All content items",
      color: "text-blue-600",
    },
    {
      title: "Published",
      value: defaultStats.publishedContent,
      icon: Calendar,
      description: "Live content",
      color: "text-green-600",
    },
    {
      title: "Drafts",
      value: defaultStats.draftContent,
      icon: FileText,
      description: "Work in progress",
      color: "text-yellow-600",
    },
    {
      title: "Media Files",
      value: defaultStats.totalMedia,
      icon: ImageIcon,
      description: "Images & videos",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
