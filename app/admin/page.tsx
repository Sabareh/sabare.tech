import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, FileText, Users } from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { ContentOverview } from "@/components/admin/content-overview"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  // Get dashboard stats
  const [totalContents, totalPublished, totalDrafts, totalUsers, recentActivities, contentByType] = await Promise.all([
    prisma.content.count(),
    prisma.content.count({ where: { status: "PUBLISHED" } }),
    prisma.content.count({ where: { status: "DRAFT" } }),
    prisma.user.count(),
    prisma.activity.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        content: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
    }),
    prisma.content.groupBy({
      by: ["type"],
      _count: true,
    }),
  ])

  const contentTypeData = contentByType.map((item) => ({
    name: item.type,
    value: item._count,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user.name}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats
          title="Total Content"
          value={totalContents}
          description="Across all content types"
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          trend={{ value: 0, label: "from last month" }}
        />
        <DashboardStats
          title="Published"
          value={totalPublished}
          description="Live on your website"
          icon={<BarChart3 className="h-5 w-5 text-green-600" />}
          trend={{ value: 0, label: "from last month" }}
        />
        <DashboardStats
          title="Drafts"
          value={totalDrafts}
          description="Work in progress"
          icon={<FileText className="h-5 w-5 text-amber-600" />}
          trend={{ value: 0, label: "from last month" }}
        />
        <DashboardStats
          title="Users"
          value={totalUsers}
          description="Content managers"
          icon={<Users className="h-5 w-5 text-purple-600" />}
          trend={{ value: 0, label: "from last month" }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ContentOverview data={contentTypeData} />
        <RecentActivity activities={recentActivities} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/admin/content/new"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                <span>Create New Content</span>
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                <span>Manage Media</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                <span>Manage Users</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
