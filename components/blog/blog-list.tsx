"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, Clock, Tag, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { BlogPost } from "@/lib/content"
import { getSafeImagePath } from "@/lib/image-utils"

interface BlogListProps {
  posts: BlogPost[]
  featuredPosts: BlogPost[]
}

const MEDIUM_LABEL = "Medium"

export function BlogList({ posts, featuredPosts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewType, setViewType] = useState("grid")

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort()

  const filteredPosts = posts.filter((post) => {
    const lowerQuery = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(lowerQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(lowerQuery))

    const matchesTag = selectedTag === null || (post.tags && post.tags.includes(selectedTag))

    return matchesSearch && matchesTag
  })

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleClearFilter = () => {
    setSelectedTag(null)
  }

  const getPostImage = (post: BlogPost) => {
    const fallback = "/placeholder.svg?height=400&width=800&query=" + encodeURIComponent(post.title || "blog post")
    return getSafeImagePath(post.coverImage, fallback)
  }

  const resolveLink = (post: BlogPost) => {
    const isExternal = Boolean(post.externalUrl)
    const href = isExternal ? post.externalUrl! : "/blog/" + post.slug
    return { href, isExternal }
  }

  const renderMeta = (post: BlogPost, isExternal: boolean) => (
    <div className="text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{new Date(post.date || new Date().toISOString()).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        <span>{post.readingTime}</span>
      </div>
      {isExternal && (
        <span className="inline-flex items-center text-primary text-xs font-semibold">
          <ExternalLink className="mr-1 h-4 w-4" />
          {MEDIUM_LABEL}
        </span>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {featuredPosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Featured Posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => {
              const { href, isExternal } = resolveLink(post)
              const imageSrc = getPostImage(post) || "/placeholder.svg"

              return (
                <Link
                  key={post.slug}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  prefetch={!isExternal}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={post.title}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      />
                    </div>
                    <CardHeader>
                      {post.source === "medium" && (
                        <Badge variant="outline" className="w-fit text-[11px] uppercase tracking-wide mb-2">
                          {MEDIUM_LABEL}
                        </Badge>
                      )}
                      <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      {renderMeta(post, isExternal)}
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search posts..." className="pl-8" value={searchQuery} onChange={handleSearchChange} />
        </div>
        <Tabs value={viewType} onValueChange={setViewType} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => handleTagClick(tag)}
            >
              <Tag className="mr-2 h-4 w-4" />
              {tag}
            </Button>
          ))}
          {selectedTag && (
            <Button variant="ghost" size="sm" onClick={handleClearFilter} className="text-xs h-6 px-2">
              Clear filter
            </Button>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={viewType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {viewType === "grid" ? (
            filteredPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => {
                  const { href, isExternal } = resolveLink(post)
                  const imageSrc = getPostImage(post) || "/placeholder.svg"

                  return (
                    <Link
                      key={post.slug}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      prefetch={!isExternal}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={imageSrc}
                            alt={post.title}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <CardHeader>
                          {post.source === "medium" && (
                            <Badge variant="outline" className="w-fit text-[11px] uppercase tracking-wide mb-2">
                              {MEDIUM_LABEL}
                            </Badge>
                          )}
                          <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          {renderMeta(post, isExternal)}
                        </CardFooter>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const { href, isExternal } = resolveLink(post)
                const imageSrc = getPostImage(post) || "/placeholder.svg"

                return (
                  <Link
                    key={post.slug}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    prefetch={!isExternal}
                    className="group"
                  >
                    <Card className="overflow-hidden transition-shadow hover:shadow-md">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-48 overflow-hidden">
                          <Image
                            src={imageSrc}
                            alt={post.title}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            fill
                            sizes="(max-width: 768px) 100vw, 200px"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <CardHeader>
                            {post.source === "medium" && (
                              <Badge variant="outline" className="w-fit text-[11px] uppercase tracking-wide mb-2">
                                {MEDIUM_LABEL}
                              </Badge>
                            )}
                            <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {post.tags.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="mt-auto">
                            {renderMeta(post, isExternal)}
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No posts found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
