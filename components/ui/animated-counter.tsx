"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  once?: boolean
  threshold?: number
  separator?: string
  formatValue?: (value: number) => string
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  once = true,
  threshold = 0.1,
  separator = ",",
  formatValue,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: "-10%" })
  const [hasStarted, setHasStarted] = useState(false)

  // Spring animation for smooth counting
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const display = useTransform(spring, (latest) => {
    if (formatValue) {
      return formatValue(latest)
    }

    const formatted = latest.toFixed(decimals)
    const parts = formatted.split(".")

    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)

    return decimals > 0 ? parts.join(".") : parts[0]
  })

  useEffect(() => {
    if (isInView && !hasStarted) {
      const timer = setTimeout(() => {
        spring.set(value)
        setHasStarted(true)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, hasStarted, spring, value, delay])

  // Reset animation if not "once" and out of view
  useEffect(() => {
    if (!once && !isInView && hasStarted) {
      spring.set(0)
      setHasStarted(false)
    }
  }, [once, isInView, hasStarted, spring])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

// Specialized counter for percentages
export function PercentageCounter({
  value,
  className,
  ...props
}: Omit<AnimatedCounterProps, "suffix" | "decimals"> & { value: number }) {
  return <AnimatedCounter value={value} suffix="%" decimals={0} className={className} {...props} />
}

// Specialized counter for currency
export function CurrencyCounter({
  value,
  currency = "$",
  className,
  ...props
}: Omit<AnimatedCounterProps, "prefix"> & { value: number; currency?: string }) {
  return <AnimatedCounter value={value} prefix={currency} decimals={0} className={className} {...props} />
}

// Specialized counter for large numbers (K, M, B format)
export function CompactCounter({
  value,
  className,
  ...props
}: Omit<AnimatedCounterProps, "formatValue"> & { value: number }) {
  const formatValue = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B"
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return <AnimatedCounter value={value} formatValue={formatValue} className={className} {...props} />
}
