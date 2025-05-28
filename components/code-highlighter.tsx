"use client"

import { useTheme } from "next-themes"

interface CodeHighlighterProps {
  code: string
  language: string
}

export function CodeHighlighter({ code, language }: CodeHighlighterProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Basic syntax highlighting patterns
  const highlightCode = (code: string, lang: string) => {
    // For now, we'll return the code with basic formatting
    // In a production app, you might want to use Prism.js or highlight.js
    return code
  }

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded"
        >
          Copy
        </button>
      </div>
      <pre
        className={`
          overflow-x-auto p-4 rounded-lg text-sm
          ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}
        `}
      >
        <code className={`language-${language}`}>{highlightCode(code, language)}</code>
      </pre>
    </div>
  )
}
