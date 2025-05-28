"use client"

import { useState, useEffect } from "react"
import type { ContentType, ContentItem, BlogPost, Project } from "@/lib/content"
import * as content from "@/lib/content"

// Hook for loading all content of a specific type
export function useContent(type: ContentType) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true)
        const data = await content.getAllContent(type)
        setContentItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [type])

  return { content: contentItems, loading, error }
}

// Hook for loading a single content item
export function useContentItem(type: ContentType, slug: string) {
  const [contentItem, setContentItem] = useState<ContentItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true)
        const data = await content.getContentBySlug(type, slug)
        setContentItem(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadContent()
    }
  }, [type, slug])

  return { content: contentItem, loading, error }
}

// Hook for loading blog posts
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const data = await content.getAllBlogPosts()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog posts")
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return { posts, loading, error }
}

// Hook for loading a single blog post
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const data = await content.getBlogPostBySlug(slug)
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadPost()
    }
  }, [slug])

  return { post, loading, error }
}

// Hook for loading projects
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const data = await content.getAllProjects()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return { projects, loading, error }
}

// Hook for searching content
export function useContentSearch(query: string, types: ContentType[] = ["blog", "project"]) {
  const [results, setResults] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function search() {
      if (!query.trim()) {
        setResults([])
        return
      }

      try {
        setLoading(true)
        const data = await content.searchContent(query, types)
        setResults(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed")
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(search, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, types])

  return { results, loading, error }
}
