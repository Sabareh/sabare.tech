import { Code, Database, Cloud, Server, Cpu, Layers } from "lucide-react"
import type React from "react"

interface FloatingElement {
  id: string
  icon: React.ReactNode
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
    icon: <Code className="w-8 h-8 text-blue-400/30" />,
    initialX: "10%",
    initialY: "20%",
    speed: 0.3,
    rotation: 45,
    opacity: 0.4,
  },
  {
    id: "database-1",
    icon: <Database className="w-12 h-12 text-green-400/20" />,
    initialX: "80%",
    initialY: "15%",
    speed: 0.5,
    rotation: -30,
    opacity: 0.3,
  },
  {
    id: "cloud-1",
    icon: <Cloud className="w-10 h-10 text-purple-400/25" />,
    initialX: "15%",
    initialY: "70%",
    speed: 0.4,
    rotation: 60,
    opacity: 0.35,
  },
  {
    id: "server-1",
    icon: <Server className="w-6 h-6 text-cyan-400/40" />,
    initialX: "85%",
    initialY: "60%",
    speed: 0.6,
    rotation: -45,
    opacity: 0.5,
  },
  {
    id: "cpu-1",
    icon: <Cpu className="w-8 h-8 text-orange-400/30" />,
    initialX: "5%",
    initialY: "45%",
    speed: 0.35,
    rotation: 90,
    opacity: 0.4,
  },
  {
    id: "layers-1",
    icon: <Layers className="w-14 h-14 text-pink-400/20" />,
    initialX: "90%",
    initialY: "35%",
    speed: 0.25,
    rotation: -60,
    opacity: 0.25,
  },
]
