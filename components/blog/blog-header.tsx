"use client"

import { motion } from "framer-motion"

interface BlogHeaderProps {
  title: string
  description: string
  postCount: number
}

export function BlogHeader({ title, description, postCount }: BlogHeaderProps) {
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
    </motion.div>
  )
}
