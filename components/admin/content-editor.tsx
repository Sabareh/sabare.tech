"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Save, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { TipTapEditor } from "@/components/admin/tiptap-editor"
import { MediaUploader } from "@/components/admin/media-uploader"
import { MediaGallery } from "@/components/admin/media-gallery"
import { TagInput } from "@/components/admin/tag-input"
import { ContentPreview } from "@/components/admin/content-preview"

const contentFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  description: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  type: z.enum(["BLOG", "PROJECT", "EXPERIENCE", "TESTIMONIAL", "PAGE", "CONFIG"]),
  status: z.enum(["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.date().optional().nullable(),
  metadata: z.record(z.any()).default({}),
  versionNote: z.string().optional(),
})

type ContentFormValues = z.infer<typeof contentFormSchema>

interface ContentEditorProps {
  contentId?: string
  initialData?: any
}

export function ContentEditor({ contentId, initialData }: ContentEditorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [categories, setCategories] = useState([])
  const [previewData, setPreviewData] = useState<ContentFormValues | null>(null)

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          tags: initialData.tags?.map((tag) => tag.name) || [],
          publishedAt: initialData.publishedAt ? new Date(initialData.publishedAt) : null,
          categoryId: initialData.category?.id || null,
        }
      : {
          title: "",
          slug: "",
          description: "",
          content: "",
          type: "BLOG",
          status: "DRAFT",
          featured: false,
          tags: [],
          publishedAt: null,
          metadata: {},
        },
  })

  const watchTitle = form.watch("title")
  const watchType = form.watch("type")

  // Generate slug from title
  useEffect(() => {
    if (!contentId && watchTitle && !form.getValues("slug")) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      form.setValue("slug", slug)
    }
  }, [watchTitle, contentId, form])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) throw new Error("Failed to fetch categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const onSubmit = async (values: ContentFormValues) => {
    setIsSubmitting(true)

    try {
      const response = await fetch(contentId ? `/api/content/${contentId}` : "/api/content", {
        method: contentId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save content")
      }

      const savedContent = await response.json()

      toast({
        title: "Success",
        description: contentId ? "Content updated successfully" : "Content created successfully",
      })

      if (!contentId) {
        router.push(`/admin/content/${savedContent.id}`)
      }
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = useCallback(() => {
    setPreviewData(form.getValues())
    setActiveTab("preview")
  }, [form])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{contentId ? "Edit Content" : "Create Content"}</h1>
          <p className="text-muted-foreground">
            {contentId ? "Update your existing content" : "Create new content for your website"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview} disabled={isSubmitting}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form className="space-y-6">
            <TabsContent value="editor" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="enter-slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        Used in the URL: yoursite.com/{watchType.toLowerCase()}/{field.value}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief description of the content" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>A short summary that appears in listings and search results</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <TipTapEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="media">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Media Gallery</h3>
                  <p className="text-muted-foreground">Upload and manage media for this content</p>
                </div>

                <MediaUploader contentId={contentId} />

                <MediaGallery contentId={contentId} />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select content type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="BLOG">Blog Post</SelectItem>
                          <SelectItem value="PROJECT">Project</SelectItem>
                          <SelectItem value="EXPERIENCE">Experience</SelectItem>
                          <SelectItem value="TESTIMONIAL">Testimonial</SelectItem>
                          <SelectItem value="PAGE">Page</SelectItem>
                          <SelectItem value="CONFIG">Configuration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="REVIEW">Review</SelectItem>
                          <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <TagInput placeholder="Add tags..." tags={field.value} setTags={field.onChange} />
                      </FormControl>
                      <FormDescription>Press enter to add a tag</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured Content</FormLabel>
                        <FormDescription>Display this content in featured sections</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Publish Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Schedule when this content should be published</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {contentId && (
                <FormField
                  control={form.control}
                  name="versionNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Version Note</FormLabel>
                      <FormControl>
                        <Input placeholder="What changed in this version?" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Add a note to describe what changed in this update</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </TabsContent>

            <TabsContent value="preview">
              {previewData ? (
                <ContentPreview data={previewData} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Click the Preview button to see how your content will look</p>
                </div>
              )}
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}
