"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorTracker() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1"
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0"
      }
    }

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(0.8)"
      }
    }

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(1)"
      }
    }

    // Add magnetic effect to interactive elements
    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll(".magnetic")

      magneticElements.forEach((element) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          const strength = 0.3
          const deltaX = x * strength
          const deltaY = y * strength
          ;(element as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`
        }

        const handleMouseLeave = () => {
          ;(element as HTMLElement).style.transform = "translate(0px, 0px)"
        }

        element.addEventListener("mousemove", handleMouseMove)
        element.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Initialize magnetic effects
    addMagneticEffect()

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="cursor fixed w-5 h-5 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Cursor trails */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="cursor-trail fixed pointer-events-none z-[9998]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          transition={{
            delay: i * 0.05,
            type: "spring",
            stiffness: 500 - i * 100,
            damping: 30 + i * 5,
          }}
        />
      ))}
    </>
  )
}
