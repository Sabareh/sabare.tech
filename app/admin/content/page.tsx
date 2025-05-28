"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ContentTypeBadge } from "@/components/admin/content-type-badge"
import { ContentActions } from "@/components/admin/content-actions"
import { useToast } from "@/hooks/use-toast"

export default function ContentListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [contents, setContents] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    status: searchParams.get("status") || "",
    search: searchParams.get("search") || "",
  })

  const fetchContents = async () => {
    setLoading(true)

    try {
      const queryParams = new URLSearchParams()

      if (filters.type) queryParams.set("type", filters.type)
      if (filters.status) queryParams.set("status", filters.status)
      if (filters.search) queryParams.set("search", filters.search)

      queryParams.set("page", pagination.page.toString())
      queryParams.set("limit", pagination.limit.toString())

      const response = await fetch(`/api/content?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch contents")
      }

      const data = await response.json()
      setContents(data.contents)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching contents:", error)
      toast({
        title: "Error",
        description: "Failed to fetch contents",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContents()
  }, [pagination.page, filters])

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))

    // Update URL
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/admin/content?${params.toString()}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    handleFilterChange("search", e.target.search.value)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/content/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete content")
      }

      toast({
        title: "Success",
        description: "Content deleted successfully",
      })

      fetchContents()
    } catch (error) {
      console.error("Error deleting content:", error)
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content</h1>
          <p className="text-muted-foreground">Manage all your website content</p>
        </div>
        <Button asChild>
          <Link href="/admin/content/new">
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input name="search" placeholder="Search content..." className="pl-8" defaultValue={filters.search} />
          </div>
        </form>

        <div className="flex gap-2">
          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="BLOG">Blog</SelectItem>
              <SelectItem value="PROJECT">Project</SelectItem>
              <SelectItem value="EXPERIENCE">Experience</SelectItem>
              <SelectItem value="TESTIMONIAL">Testimonial</SelectItem>
              <SelectItem value="PAGE">Page</SelectItem>
              <SelectItem value="CONFIG">Config</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="REVIEW">Review</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : contents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No content found
                </TableCell>
              </TableRow>
            ) : (
              contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/content/${content.id}`} className="hover:underline">
                      {content.title}
                    </Link>
                    {content.featured && (
                      <Badge variant="secondary" className="ml-2">
                        Featured
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <ContentTypeBadge type={content.type} />
                  </TableCell>
                  <TableCell>
                    <ContentStatusBadge status={content.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {content.author.image && (
                        <img
                          src={content.author.image || "/placeholder.svg"}
                          alt={content.author.name}
                          className="h-6 w-6 rounded-full"
                        />
                      )}
                      <span>{content.author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(content.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <ContentActions content={content} onDelete={() => handleDelete(content.id)} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination currentPage={pagination.page} totalPages={pagination.pages} onPageChange={handlePageChange} />
    </div>
  )
}
