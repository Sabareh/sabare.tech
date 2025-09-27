"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

interface BlogHeaderProps {
  title: string
  description: string
  postCount: number
  note?: string
  cta?: {
    label: string
    href: string
    external?: boolean
  }
}

export function BlogHeader({ title, description, postCount, note, cta }: BlogHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-4"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{description}</p>
      <p className="text-sm text-muted-foreground">{postCount} articles</p>
      {note && <p className="text-xs text-muted-foreground">{note}</p>}
      {cta && (
        <div className="flex justify-center">
          <Button asChild variant="outline" size="sm" className="group">
            <Link
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
            >
              {cta.label}
              {cta.external && (
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              )}
            </Link>
          </Button>
        </div>
      )}
    </motion.div>
  )
}
