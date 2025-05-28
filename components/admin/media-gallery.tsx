"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Trash2, ExternalLink, ImageIcon, FileText, Video, Music } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MediaItem {
  id: string
  name: string
  url: string
  type: "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO"
  size: number
  width?: number
  height?: number
  alt?: string
  createdAt: string
}

interface MediaGalleryProps {
  contentId?: string
}

export function MediaGallery({ contentId }: MediaGalleryProps) {
  const { toast } = useToast()
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (contentId) queryParams.set("contentId", contentId)

      const response = await fetch(`/api/media?${queryParams.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch media")

      const data = await response.json()
      setMedia(data.media)
    } catch (error) {
      console.error("Error fetching media:", error)
      toast({
        title: "Error",
        description: "Failed to fetch media",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [contentId])

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL Copied",
      description: "Media URL copied to clipboard",
    })
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete media")

      toast({
        title: "Success",
        description: "Media deleted successfully",
      })

      fetchMedia()
    } catch (error) {
      console.error("Error deleting media:", error)
      toast({
        title: "Error",
        description: "Failed to delete media",
        variant: "destructive",
      })
    }
  }

  const filteredMedia = activeTab === "all" ? media : media.filter((item) => item.type === activeTab)

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "IMAGE":
        return <ImageIcon className="h-5 w-5" />
      case "VIDEO":
        return <Video className="h-5 w-5" />
      case "AUDIO":
        return <Music className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="IMAGE">Images</TabsTrigger>
          <TabsTrigger value="VIDEO">Videos</TabsTrigger>
          <TabsTrigger value="AUDIO">Audio</TabsTrigger>
          <TabsTrigger value="DOCUMENT">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {loading ? (
            <div className="text-center py-8">Loading media...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No media found</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative aspect-square bg-muted flex items-center justify-center">
                    {item.type === "IMAGE" ? (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.alt || item.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4">
                        {getMediaIcon(item.type)}
                        <span className="mt-2 text-sm truncate max-w-full">{item.name}</span>
                      </div>
                    )}
                  </div>
                  <CardFooter className="p-2 flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedMedia(item)}>
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Media Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {item.type === "IMAGE" && (
                            <div className="flex justify-center">
                              <img
                                src={item.url || "/placeholder.svg"}
                                alt={item.alt || item.name}
                                className="max-h-80 object-contain"
                              />
                            </div>
                          )}
                          <div className="grid gap-2">
                            <div>
                              <Label>Name</Label>
                              <div className="text-sm">{item.name}</div>
                            </div>
                            <div>
                              <Label>Type</Label>
                              <div className="text-sm">{item.type}</div>
                            </div>
                            <div>
                              <Label>Size</Label>
                              <div className="text-sm">{formatFileSize(item.size)}</div>
                            </div>
                            {item.width && item.height && (
                              <div>
                                <Label>Dimensions</Label>
                                <div className="text-sm">
                                  {item.width} × {item.height}
                                </div>
                              </div>
                            )}
                            <div>
                              <Label>URL</Label>
                              <div className="flex items-center gap-2">
                                <Input value={item.url} readOnly className="text-sm" />
                                <Button variant="outline" size="icon" onClick={() => handleCopyUrl(item.url)}>
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <Button variant="outline" onClick={() => window.open(item.url, "_blank")}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleCopyUrl(item.url)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
