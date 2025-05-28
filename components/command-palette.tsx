"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  MessageSquare,
  Award,
  FileText,
  Wrench,
  Sun,
  Moon,
  Laptop,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Download,
  Copy,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Experience", href: "/experience", icon: Award },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
  { name: "Uses", href: "/uses", icon: Wrench },
  { name: "Resume", href: "/resume", icon: FileText },
  { name: "Contact", href: "/contact", icon: Mail },
]

const socialLinks = [
  { name: "GitHub", href: "https://github.com/yourusername", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/yourusername", icon: Twitter },
]

const quickActions = [
  { name: "Download Resume", action: "download-resume", icon: Download },
  { name: "Copy Email", action: "copy-email", icon: Copy },
  { name: "View Resume", href: "/resume", icon: FileText },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  const handleSelect = (callback: () => void) => {
    callback()
    onOpenChange(false)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "download-resume":
        // Trigger resume download
        window.open("/resume/print", "_blank")
        toast({
          title: "Resume Download",
          description: "Opening resume in new tab for download",
        })
        break
      case "copy-email":
        // Copy email to clipboard
        navigator.clipboard.writeText("your.email@example.com")
        toast({
          title: "Email Copied",
          description: "Email address copied to clipboard",
        })
        break
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or navigate..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <CommandItem
                key={item.name}
                onSelect={() => handleSelect(() => router.push(item.href))}
                className="flex items-center"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          {quickActions.map((item) => {
            const Icon = item.icon
            return (
              <CommandItem
                key={item.name}
                onSelect={() =>
                  handleSelect(() => {
                    if (item.href) {
                      router.push(item.href)
                    } else if (item.action) {
                      handleQuickAction(item.action)
                    }
                  })
                }
                className="flex items-center"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => handleSelect(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => setTheme("system"))}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System Theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Social Links">
          {socialLinks.map((item) => {
            const Icon = item.icon
            return (
              <CommandItem
                key={item.name}
                onSelect={() => handleSelect(() => window.open(item.href, "_blank"))}
                className="flex items-center"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
                <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
