import { Code, Database, Cloud, Zap, GitBranch, Server } from "lucide-react"
import type { ReactNode } from "react"

export interface FloatingElement {
  id: string
  icon: ReactNode
  initialX: string
  initialY: string
  speed: number
  scale?: number
  rotation?: number
  opacity?: number
}

export const defaultFloatingElements: FloatingElement[] = [
  {
    id: "code-1",
    icon: <Code className="h-8 w-8 text-primary/30" />,
    initialX: "10%",
    initialY: "20%",
    speed: 0.3,
    scale: 1,
    rotation: 45,
    opacity: 0.4,
  },
  {
    id: "database-1",
    icon: <Database className="h-6 w-6 text-blue-500/30" />,
    initialX: "80%",
    initialY: "15%",
    speed: 0.5,
    scale: 0.8,
    rotation: -30,
    opacity: 0.3,
  },
  {
    id: "cloud-1",
    icon: <Cloud className="h-10 w-10 text-purple-500/30" />,
    initialX: "70%",
    initialY: "60%",
    speed: 0.2,
    scale: 1.2,
    rotation: 90,
    opacity: 0.5,
  },
  {
    id: "zap-1",
    icon: <Zap className="h-7 w-7 text-yellow-500/30" />,
    initialX: "20%",
    initialY: "70%",
    speed: 0.4,
    scale: 0.9,
    rotation: -60,
    opacity: 0.4,
  },
  {
    id: "git-1",
    icon: <GitBranch className="h-6 w-6 text-green-500/30" />,
    initialX: "90%",
    initialY: "40%",
    speed: 0.6,
    scale: 0.7,
    rotation: 120,
    opacity: 0.3,
  },
  {
    id: "server-1",
    icon: <Server className="h-8 w-8 text-red-500/30" />,
    initialX: "15%",
    initialY: "45%",
    speed: 0.3,
    scale: 1.1,
    rotation: -90,
    opacity: 0.4,
  },
]
