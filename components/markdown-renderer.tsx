"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import { useTheme } from "next-themes"
import Image from "next/image"
import { CodeHighlighter } from "./code-highlighter"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
        h1: ({ node, ...props }) => <h1 id={props.id} className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 id={props.id} className="text-2xl font-bold mt-8 mb-4" {...props} />,
        h3: ({ node, ...props }) => <h3 id={props.id} className="text-xl font-bold mt-6 mb-3" {...props} />,
        h4: ({ node, ...props }) => <h4 id={props.id} className="text-lg font-bold mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
        ),
        hr: ({ node, ...props }) => <hr className="my-8 border-muted" {...props} />,
        img: ({ node, src, alt, ...props }) => {
          if (src) {
            return (
              <div className="my-6">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={alt || ""}
                  width={800}
                  height={400}
                  className="rounded-lg mx-auto"
                  {...props}
                />
                {alt && <p className="text-center text-sm text-muted-foreground mt-2">{alt}</p>}
              </div>
            )
          }
          return null
        },
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          const language = match ? match[1] : ""

          return !inline ? (
            <CodeHighlighter code={String(children).replace(/\n$/, "")} language={language} />
          ) : (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
              {children}
            </code>
          )
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
        th: ({ node, ...props }) => (
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" {...props} />
        ),
        td: ({ node, ...props }) => <td className="px-4 py-3 text-sm" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
