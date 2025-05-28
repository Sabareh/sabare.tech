"use client"

import { useEffect, useState } from "react"
import { Link } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2]
      // Create an ID from the heading text (similar to what rehype-slug does)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      if (level <= 3) {
        // Only include h1, h2, and h3
        headings.push({ id, text, level })
      }
    }

    setToc(headings)
  }, [content])

  // Track active heading based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      toc.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [toc])

  return (
    <nav className="text-sm">
      <ul className="space-y-2">
        {toc.map((item) => (
          <li key={item.id} className={`${item.level === 1 ? "" : item.level === 2 ? "ml-3" : "ml-6"}`}>
            <a
              href={`#${item.id}`}
              className={`flex items-center hover:text-primary transition-colors ${
                activeId === item.id ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {item.level === 1 && <Link className="h-3 w-3 mr-1" />}
              <span className="line-clamp-1">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
