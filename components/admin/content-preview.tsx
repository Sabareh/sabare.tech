"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ContentTypeBadge } from "@/components/admin/content-type-badge"

interface ContentPreviewProps {
  data: any
}

export function ContentPreview({ data }: ContentPreviewProps) {
  const [activeView, setActiveView] = useState("rendered")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <ContentTypeBadge type={data.type} />
            <ContentStatusBadge status={data.status} />
            {data.featured && <Badge variant="outline">Featured</Badge>}
          </div>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="rendered">Rendered</TabsTrigger>
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="rendered" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desktop" className="mt-4">
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground">Desktop Preview</div>
            </div>
            <div className="bg-background p-4 h-[600px] overflow-auto">
              <div className="prose dark:prose-invert max-w-none">
                <h1>{data.title}</h1>
                {data.description && <p className="lead">{data.description}</p>}
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-4">
          <div className="border rounded-md overflow-hidden w-[375px] mx-auto">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 flex items-center justify-center">
              <div className="w-32 h-5 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="bg-background p-4 h-[600px] overflow-auto">
              <div className="prose dark:prose-invert max-w-none">
                <h1>{data.title}</h1>
                {data.description && <p className="lead">{data.description}</p>}
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="border rounded-md p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Content Metadata</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Slug:</span> {data.slug}
          </div>
          <div>
            <span className="text-muted-foreground">Type:</span> {data.type}
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span> {data.status}
          </div>
          <div>
            <span className="text-muted-foreground">Featured:</span> {data.featured ? "Yes" : "No"}
          </div>
          {data.publishedAt && (
            <div>
              <span className="text-muted-foreground">Publish Date:</span>{" "}
              {new Date(data.publishedAt).toLocaleDateString()}
            </div>
          )}
          {data.tags && data.tags.length > 0 && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Tags:</span>{" "}
              <div className="flex flex-wrap gap-1 mt-1">
                {data.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
