"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  ExternalLink,
  Copy,
  Share2,
  Calendar,
  Code,
  Database,
  Cloud,
  Zap,
  Settings,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [search, setSearch] = useState("")

  // Navigation commands
  const navigationCommands = [
    { id: "home", label: "Go to Home", icon: Home, action: () => router.push("/") },
    { id: "about", label: "Go to About", icon: User, action: () => router.push("/about") },
    { id: "projects", label: "Go to Projects", icon: Briefcase, action: () => router.push("/projects") },
    { id: "experience", label: "Go to Experience", icon: Award, action: () => router.push("/experience") },
    { id: "blog", label: "Go to Blog", icon: BookOpen, action: () => router.push("/blog") },
    {
      id: "testimonials",
      label: "Go to Testimonials",
      icon: MessageSquare,
      action: () => router.push("/testimonials"),
    },
    { id: "uses", label: "Go to Uses", icon: Wrench, action: () => router.push("/uses") },
    { id: "resume", label: "Go to Resume", icon: FileText, action: () => router.push("/resume") },
    { id: "contact", label: "Go to Contact", icon: Mail, action: () => router.push("/contact") },
  ]

  // Quick actions
  const quickActions = [
    {
      id: "download-resume",
      label: "Download Resume",
      icon: Download,
      action: () => {
        // Simulate resume download
        toast({ title: "Resume Downloaded", description: "Your resume has been downloaded successfully." })
        window.open("/resume/print", "_blank")
      },
    },
    {
      id: "copy-email",
      label: "Copy Email Address",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText("hello@dataengineer.dev")
        toast({ title: "Email Copied", description: "Email address copied to clipboard." })
      },
    },
    {
      id: "schedule-call",
      label: "Schedule a Call",
      icon: Calendar,
      action: () => {
        router.push("/contact")
        toast({ title: "Contact Form", description: "Redirected to contact form to schedule a call." })
      },
    },
    {
      id: "share-portfolio",
      label: "Share Portfolio",
      icon: Share2,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: "Data Engineer Portfolio",
            text: "Check out this amazing data engineering portfolio",
            url: window.location.origin,
          })
        } else {
          navigator.clipboard.writeText(window.location.origin)
          toast({ title: "Link Copied", description: "Portfolio link copied to clipboard." })
        }
      },
    },
  ]

  // Social links
  const socialCommands = [
    {
      id: "github",
      label: "Open GitHub Profile",
      icon: Github,
      action: () => window.open("https://github.com/yourusername", "_blank"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn Profile",
      icon: Linkedin,
      action: () => window.open("https://linkedin.com/in/yourusername", "_blank"),
    },
    {
      id: "twitter",
      label: "Open Twitter Profile",
      icon: Twitter,
      action: () => window.open("https://twitter.com/yourusername", "_blank"),
    },
  ]

  // Theme commands
  const themeCommands = [
    {
      id: "light-theme",
      label: "Switch to Light Theme",
      icon: Sun,
      action: () => {
        setTheme("light")
        toast({ title: "Theme Changed", description: "Switched to light theme." })
      },
    },
    {
      id: "dark-theme",
      label: "Switch to Dark Theme",
      icon: Moon,
      action: () => {
        setTheme("dark")
        toast({ title: "Theme Changed", description: "Switched to dark theme." })
      },
    },
    {
      id: "system-theme",
      label: "Use System Theme",
      icon: Settings,
      action: () => {
        setTheme("system")
        toast({ title: "Theme Changed", description: "Using system theme preference." })
      },
    },
  ]

  // Project shortcuts
  const projectCommands = [
    {
      id: "realtime-analytics",
      label: "View Real-time Analytics Project",
      icon: Zap,
      action: () => router.push("/projects#realtime-analytics"),
    },
    {
      id: "data-warehouse",
      label: "View Data Warehouse Project",
      icon: Database,
      action: () => router.push("/projects#data-warehouse"),
    },
    {
      id: "cloud-migration",
      label: "View Cloud Migration Project",
      icon: Cloud,
      action: () => router.push("/projects#cloud-migration"),
    },
  ]

  // Blog shortcuts
  const blogCommands = [
    {
      id: "latest-post",
      label: "Read Latest Blog Post",
      icon: BookOpen,
      action: () => router.push("/blog/building-real-time-data-pipelines"),
    },
    {
      id: "data-mesh-post",
      label: "Read Data Mesh Article",
      icon: Code,
      action: () => router.push("/blog/data-mesh-architecture"),
    },
  ]

  const handleCommand = (command: any) => {
    command.action()
    onOpenChange(false)
    setSearch("")
  }

  // Filter commands based on search
  const filterCommands = (commands: any[], search: string) => {
    if (!search) return commands
    return commands.filter((command) => command.label.toLowerCase().includes(search.toLowerCase()))
  }

  useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Navigation */}
        {filterCommands(navigationCommands, search).length > 0 && (
          <CommandGroup heading="Navigation">
            {filterCommands(navigationCommands, search).map((command) => (
              <CommandItem
                key={command.id}
                onSelect={() => handleCommand(command)}
                className="flex items-center space-x-2"
              >
                <command.icon className="h-4 w-4" />
                <span>{command.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Quick Actions */}
        {filterCommands(quickActions, search).length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Quick Actions">
              {filterCommands(quickActions, search).map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => handleCommand(command)}
                  className="flex items-center space-x-2"
                >
                  <command.icon className="h-4 w-4" />
                  <span>{command.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Projects */}
        {filterCommands(projectCommands, search).length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {filterCommands(projectCommands, search).map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => handleCommand(command)}
                  className="flex items-center space-x-2"
                >
                  <command.icon className="h-4 w-4" />
                  <span>{command.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Blog */}
        {filterCommands(blogCommands, search).length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Blog Posts">
              {filterCommands(blogCommands, search).map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => handleCommand(command)}
                  className="flex items-center space-x-2"
                >
                  <command.icon className="h-4 w-4" />
                  <span>{command.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Social Links */}
        {filterCommands(socialCommands, search).length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Social Links">
              {filterCommands(socialCommands, search).map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => handleCommand(command)}
                  className="flex items-center space-x-2"
                >
                  <command.icon className="h-4 w-4" />
                  <span>{command.label}</span>
                  <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Theme */}
        {filterCommands(themeCommands, search).length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Appearance">
              {filterCommands(themeCommands, search).map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => handleCommand(command)}
                  className="flex items-center space-x-2"
                >
                  <command.icon className="h-4 w-4" />
                  <span>{command.label}</span>
                  {((command.id === "light-theme" && theme === "light") ||
                    (command.id === "dark-theme" && theme === "dark") ||
                    (command.id === "system-theme" && theme === "system")) && (
                    <span className="ml-auto text-xs text-muted-foreground">Active</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
