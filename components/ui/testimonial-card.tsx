import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  companyLogo?: string
  avatar?: string
  rating: number
  content: string
  project?: string
  results?: string[]
  className?: string
}

export function TestimonialCard({
  name,
  role,
  company,
  companyLogo,
  avatar,
  rating,
  content,
  project,
  results,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn("h-full glass-effect hover:shadow-xl transition-all duration-300", className)}>
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{name}</h3>
              {project && (
                <Badge variant="secondary" className="text-xs">
                  {project}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="flex items-center gap-2 mt-1">
              {companyLogo && (
                <Image
                  src={companyLogo || "/placeholder.svg"}
                  alt={company}
                  width={20}
                  height={20}
                  className="rounded"
                />
              )}
              <span className="text-sm font-medium">{company}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn("h-4 w-4", i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted")}
            />
          ))}
        </div>

        <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground mb-6 leading-relaxed">{content}</p>

        {results && results.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Results:</h4>
            <div className="flex flex-wrap gap-2">
              {results.map((result, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {result}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
