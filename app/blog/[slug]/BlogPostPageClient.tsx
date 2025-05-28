"use client"

import Image from "next/image"
import Link from "next/link"
import { type BlogPost } from "@/lib/content"
import { TableOfContents } from "@/components/table-of-contents"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react"
import { getSafeImagePath } from "@/lib/image-utils"

// Add props interface
interface BlogPostPageClientProps {
  post: BlogPost | null
}

export function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  if (!post) {
    return (
      <article className="container max-w-4xl py-10">
        <div className="text-center text-red-500">Blog post not found or failed to load.</div>
      </article>
    )
  }

  // Get safe image path with appropriate fallback
  const coverImage = getSafeImagePath(
    post.coverImage,
    `/placeholder.svg?height=800&width=1600&query=${encodeURIComponent(post.title)}`,
  )

  return (
    <article className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Button>
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

        {post.excerpt && <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>}

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          {post.date && (
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          )}

          {post.readingTime && (
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          )}

          {post.author && (
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
        </div>

        {coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
            <Image
              src={coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
        <div className="prose dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents content={post.content} />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  )
}
