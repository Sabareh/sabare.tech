"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Mail, Calendar, Share2, MessageSquare, ChevronUp, ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const quickActions = [
  {
    id: "download-resume",
    label: "Download Resume",
    description: "Get my latest resume in PDF format",
    icon: Download,
    action: "download",
    href: "/resume/print",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    id: "contact",
    label: "Get In Touch",
    description: "Send me a message about your project",
    icon: Mail,
    action: "navigate",
    href: "/contact",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    id: "schedule-call",
    label: "Schedule Call",
    description: "Book a consultation call",
    icon: Calendar,
    action: "navigate",
    href: "/contact",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    id: "testimonials",
    label: "View Testimonials",
    description: "See what clients say about my work",
    icon: MessageSquare,
    action: "navigate",
    href: "/testimonials",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
]

interface QuickActionsProps {
  className?: string
  compact?: boolean
}

export function QuickActions({ className = "", compact = false }: QuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(!compact)
  const { toast } = useToast()

  const handleAction = (action: any) => {
    if (action.action === "download") {
      window.open(action.href, "_blank")
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been downloaded successfully.",
      })
    } else if (action.action === "copy") {
      navigator.clipboard.writeText("hello@dataengineer.dev")
      toast({
        title: "Email Copied",
        description: "Email address copied to clipboard.",
      })
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Data Engineer Portfolio",
        text: "Check out this amazing data engineering portfolio",
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(window.location.origin)
      toast({
        title: "Link Copied",
        description: "Portfolio link copied to clipboard.",
      })
    }
  }

  if (compact) {
    return (
      <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
        <Card className="glass-effect shadow-lg">
          <CardContent className="p-2">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="self-end">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {quickActions.slice(0, 3).map((action, index) => (
                      <motion.div
                        key={action.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {action.action === "navigate" ? (
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={action.href}>
                              <action.icon className="h-4 w-4" />
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" onClick={() => handleAction(action)}>
                            <action.icon className="h-4 w-4" />
                          </Button>
                        )}
                      </motion.div>
                    ))}

                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {quickActions.map((action, index) => (
        <motion.div
          key={action.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="glass-effect hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <CardContent className="p-6">
              {action.action === "navigate" ? (
                <Link href={action.href} className="block">
                  <div
                    className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  <ExternalLink className="h-4 w-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ) : (
                <div onClick={() => handleAction(action)}>
                  <div
                    className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
