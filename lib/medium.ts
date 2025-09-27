import { BlogPost, calculateReadingTime } from "./content"

const MEDIUM_FEED_URL = "https://medium.com/feed/@sabarevictor"
const CACHE_TTL = 1000 * 60 * 30 // 30 minutes

interface MediumCache {
  posts: BlogPost[]
  fetchedAt: number
}

let mediumCache: MediumCache | null = null

function stripCdata(value?: string): string {
  if (!value) return ""
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim()
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function extractTag(xml: string, tag: string): string | undefined {
  const regex = new RegExp(, "i")
  const match = xml.match(regex)
  return match ? match[1].trim() : undefined
}

function extractAllTags(xml: string, tag: string): string[] {
  const regex = new RegExp(, "gi")
  const values: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(xml)) !== null) {
    values.push(decodeHtmlEntities(stripCdata(match[1])))
  }
  return Array.from(new Set(values))
}

function stripHtml(html?: string): string {
  if (!html) return ""
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

function extractImage(html?: string): string | undefined {
  if (!html) return undefined
  const match = html.match(/<img[^>]+src=\"([^\"]+)\"/i)
  return match ? match[1] : undefined
}

function buildSlug(link: string | undefined, index: number): string {
  if (!link) return 
  const trimmed = link.split('?')[0].replace(/https?:\/\//, "")
  const parts = trimmed.split('/')
  const last = parts.pop() || 
  const safe = last.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '')
  return safe ?  : 
}

export async function fetchMediumPosts(limit = 6): Promise<BlogPost[]> {
  if (mediumCache && Date.now() - mediumCache.fetchedAt < CACHE_TTL) {
    return mediumCache.posts.slice(0, limit)
  }

  try {
    const response = await fetch(MEDIUM_FEED_URL, {
      headers: {
        Accept: "application/rss+xml",
      },
      cache: "no-cache",
    })

    if (!response.ok) {
      throw new Error()
    }

    const xml = await response.text()
    const itemMatches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g))

    const posts: BlogPost[] = itemMatches.map((match, index) => {
      const itemXml = match[1]
      const title = decodeHtmlEntities(stripCdata(extractTag(itemXml, "title")) || )
      const link = stripCdata(extractTag(itemXml, "link"))
      const pubDate = stripCdata(extractTag(itemXml, "pubDate"))
      const contentHtml = stripCdata(extractTag(itemXml, "content:encoded"))
      const description = stripCdata(extractTag(itemXml, "description"))
      const author = decodeHtmlEntities(
        stripCdata(extractTag(itemXml, "dc:creator")) || stripCdata(extractTag(itemXml, "creator")) || "",
      )
      const categories = extractAllTags(itemXml, "category")
      const coverImage = extractImage(contentHtml)
      const plainText = stripHtml(contentHtml || description)
      const readingTime = calculateReadingTime(plainText || description || title)
      const slug = buildSlug(link, index)

      return {
        slug,
        title,
        excerpt: decodeHtmlEntities(plainText || description || ""),
        date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        readingTime,
        externalUrl: link,
        coverImage,
        tags: categories,
        featured: index < 3,
        content: contentHtml || description || "",
        author: author || "Victor Sabare",
        source: "medium",
        metadata: {
          externalUrl: link,
          source: "medium",
          mediumGuid: stripCdata(extractTag(itemXml, "guid")),
        },
      }
    })

    mediumCache = {
      posts,
      fetchedAt: Date.now(),
    }

    return mediumCache.posts.slice(0, limit)
  } catch (error) {
    console.warn("Failed to fetch Medium posts:", error)
    mediumCache = null
    return []
  }
}
