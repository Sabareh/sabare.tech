"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react"

interface NotFoundClientProps {
  title: string
  message: string
  suggestions: string[]
}

export default function NotFoundClient({ title, message, suggestions }: NotFoundClientProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="container max-w-2xl px-4">
        <Card className="text-center">
          <CardHeader className="pb-8">
            <div className="mx-auto mb-6 p-4 rounded-full bg-muted/50 w-fit">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-4xl font-bold mb-2">{title}</CardTitle>
            <CardDescription className="text-lg">{message}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Blog
                </Link>
              </Button>

              <Button variant="ghost" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            <div className="pt-4">
              <Button
                variant="link"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="text-sm text-muted-foreground"
              >
                {showSuggestions ? "Hide" : "Show"} suggestions
              </Button>

              {showSuggestions && (
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">You might be looking for:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
