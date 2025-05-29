"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { AnimatedCounter, PercentageCounter, CompactCounter } from "@/components/ui/animated-counter"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxContainer } from "@/components/parallax/parallax-container"
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal, Code2, Database, Cloud } from "lucide-react"
import Link from "next/link"

// Code snippets for the animated terminal
const codeSnippets = [
  {
    language: "python",
    code: `# Data Pipeline Processing
import pandas as pd
from pyspark.sql import SparkSession

def process_data_pipeline():
    spark = SparkSession.builder.appName("DataPipeline").getOrCreate()
    df = spark.read.parquet("s3://data-lake/raw/")
    
    # Transform and clean data
    cleaned_df = df.filter(df.status == "active")
                   .groupBy("category")
                   .agg({"revenue": "sum", "users": "count"})
    
    # Save to data warehouse
    cleaned_df.write.mode("overwrite").saveAsTable("analytics.metrics")
    return cleaned_df`,
  },
  {
    language: "sql",
    code: `-- Real-time Analytics Query
WITH daily_metrics AS (
  SELECT 
    DATE(created_at) as date,
    COUNT(*) as transactions,
    SUM(amount) as revenue,
    AVG(amount) as avg_transaction
  FROM transactions 
  WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY DATE(created_at)
),
growth_analysis AS (
  SELECT *,
    LAG(revenue) OVER (ORDER BY date) as prev_revenue,
    (revenue - LAG(revenue) OVER (ORDER BY date)) / 
    LAG(revenue) OVER (ORDER BY date) * 100 as growth_rate
  FROM daily_metrics
)
SELECT * FROM growth_analysis ORDER BY date DESC;`,
  },
  {
    language: "javascript",
    code: `// Real-time Data Streaming
const kafka = require('kafkajs');
const { Client } = require('@elastic/elasticsearch');

class DataStreamProcessor {
  constructor() {
    this.kafka = kafka({ clientId: 'data-processor' });
    this.consumer = this.kafka.consumer({ groupId: 'analytics-group' });
    this.elasticsearch = new Client({ node: 'http://localhost:9200' });
  }

  async processStream() {
    await this.consumer.subscribe({ topic: 'user-events' });
    
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value.toString());
        
        // Transform event data
        const transformedEvent = {
          ...event,
          timestamp: new Date(),
          processed: true,
          metrics: this.calculateMetrics(event)
        };
        
        // Index to Elasticsearch for real-time analytics
        await this.elasticsearch.index({
          index: 'user-analytics',
          body: transformedEvent
        });
      },
    });
  }
}`,
  },
]

// Floating code elements
const floatingCodeElements = [
  { symbol: "{}", position: { top: "10%", left: "5%" }, delay: 0 },
  { symbol: "[]", position: { top: "20%", right: "10%" }, delay: 0.5 },
  { symbol: "()", position: { bottom: "30%", left: "8%" }, delay: 1 },
  { symbol: "</>", position: { top: "60%", right: "5%" }, delay: 1.5 },
  { symbol: "=>", position: { bottom: "20%", right: "15%" }, delay: 2 },
  { symbol: "&&", position: { top: "40%", left: "3%" }, delay: 2.5 },
]

// Statistics data
const stats = [
  { value: 100, suffix: "TB+", label: "Data Processed", icon: Database },
  { value: 50, suffix: "+", label: "Projects Completed", icon: Code2 },
  { value: 99.9, label: "Uptime Achieved", icon: Cloud, isPercentage: true },
  { value: 5000000, label: "Records Processed", icon: Terminal, isCompact: true },
]

export function HeroCodeThemed() {
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const isTerminalInView = useInView(terminalRef, { once: true })

  // Typewriter effect for code snippets
  useEffect(() => {
    if (!isTerminalInView) return

    const snippet = codeSnippets[currentSnippet].code
    let currentIndex = 0
    setIsTyping(true)
    setTypedText("")

    const typeInterval = setInterval(() => {
      if (currentIndex < snippet.length) {
        setTypedText(snippet.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)

        // Switch to next snippet after a delay
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
        }, 3000)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [currentSnippet, isTerminalInView])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center
                 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Floating Code Elements */}
      {floatingCodeElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/20 text-lg sm:text-xl lg:text-2xl font-mono font-bold pointer-events-none hidden sm:block"
          style={element.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: element.delay, duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {element.symbol}
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 lg:space-y-8 text-white text-center lg:text-left px-2 sm:px-0">
            <ScrollAnimation direction="fade" delay={0.1}>
              <Badge variant="outline" className="border-blue-400/50 text-blue-400 bg-blue-400/10">
                <Terminal className="w-4 h-4 mr-2" />
                Data Engineer & Analytics Specialist
              </Badge>
            </ScrollAnimation>

            <div className="space-y-4 lg:space-y-6">
              <ScrollAnimation direction="up" delay={0.2}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-white">Victor Oketch</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Sabare
                  </span>
                </h1>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={0.4}>
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-medium">
                  Building scalable data infrastructure that processes{" "}
                  <span className="text-blue-400 font-bold">
                    <AnimatedCounter value={100} suffix="TB+" delay={0.5} />
                  </span>{" "}
                  of data daily
                </p>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={0.6}>
                <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Transforming raw data into actionable insights through modern data engineering practices, cloud-native
                  architectures, and real-time processing systems.
                </p>
              </ScrollAnimation>
            </div>

            {/* Action Buttons */}
            <ScrollAnimation direction="up" delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <MagneticButton
                  size="lg"
                  className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base"
                  strength={25}
                  radius={150}
                  scale={1.05}
                  enableRotation={true}
                  rotationStrength={3}
                  glowOnHover={true}
                  asChild
                >
                  <Link href="/projects">
                    <ArrowRight className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    View My Projects
                  </Link>
                </MagneticButton>

                <MagneticButton
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border border-slate-600 text-slate-300 hover:bg-slate-800 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base"
                  strength={25}
                  radius={150}
                  scale={1.05}
                  enableRotation={true}
                  rotationStrength={3}
                  asChild
                >
                  <Link href="/resume">
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Download Resume
                  </Link>
                </MagneticButton>
              </div>
            </ScrollAnimation>

            {/* Social Links */}
            <ScrollAnimation direction="up" delay={1.0}>
              <div className="flex items-center gap-3 justify-center lg:justify-start text-xs sm:text-sm">
                <span className="text-xs sm:text-sm text-slate-400">Connect with me:</span>
                <div className="flex gap-3">
                  <Link
                    href="https://github.com/sabareh"
                    className="p-1.5 sm:p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors text-slate-300"
                  >
                    <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/victor-sabare"
                    className="p-1.5 sm:p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors text-slate-300"
                  >
                    <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                  <Link
                    href="mailto:sabarevictor@gmail.com"
                    className="p-1.5 sm:p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors text-slate-300"
                  >
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column - Code Terminal */}
          <div className="relative mt-6 sm:mt-8 lg:mt-0 px-2 sm:px-0">
            <ScrollAnimation direction="scale" delay={0.5}>
              <div
                ref={terminalRef}
                className="relative bg-slate-900/90 backdrop-blur-sm rounded-lg border border-slate-700 shadow-2xl w-full max-w-full"
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-700 bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-400 ml-2 sm:ml-4 font-mono truncate">
                      {codeSnippets[currentSnippet].language === "python" && "data_pipeline.py"}
                      {codeSnippets[currentSnippet].language === "sql" && "analytics.sql"}
                      {codeSnippets[currentSnippet].language === "javascript" && "stream_processor.js"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-slate-400 hidden sm:inline">Running</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-3 sm:p-4 lg:p-6 font-mono text-xs sm:text-sm bg-slate-900/50 h-[250px] sm:h-[300px] lg:h-[350px]">
                  <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap break-words h-full overflow-hidden">
                    <code>
                      {typedText}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                          className="bg-blue-400 text-slate-900 px-0.5"
                        >
                          |
                        </motion.span>
                      )}
                    </code>
                  </pre>
                </div>

                {/* Terminal Footer */}
                <div className="flex items-center justify-between p-2 sm:p-3 border-t border-slate-700 bg-slate-800/30 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>
                      Lines: <AnimatedCounter value={typedText.split("\n").length} delay={1} />
                    </span>
                    <span className="hidden sm:inline">
                      Characters: <AnimatedCounter value={typedText.length} delay={1.2} />
                    </span>
                  </div>
                  <span className="hidden sm:inline">UTF-8</span>
                </div>
              </div>
            </ScrollAnimation>

            {/* Floating Stats Cards - Desktop (lg and up) */}
            <div className="hidden lg:grid absolute -bottom-8 -left-8 grid-cols-2 gap-4 z-20">
              {stats.slice(0, 2).map((stat, index) => (
                <ScrollAnimation key={index} direction="left" delay={1.2 + index * 0.2}>
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-slate-400">{stat.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {stat.isPercentage ? (
                        <PercentageCounter value={stat.value} delay={1.5 + index * 0.2} />
                      ) : stat.isCompact ? (
                        <CompactCounter value={stat.value} delay={1.5 + index * 0.2} />
                      ) : (
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={1.5 + index * 0.2} />
                      )}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <div className="hidden lg:grid absolute -top-8 -right-8 grid-cols-2 gap-4 z-20">
              {stats.slice(2).map((stat, index) => (
                <ScrollAnimation key={index} direction="right" delay={1.6 + index * 0.2}>
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-slate-400">{stat.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {stat.isPercentage ? (
                        <PercentageCounter value={stat.value} delay={1.8 + index * 0.2} />
                      ) : stat.isCompact ? (
                        <CompactCounter value={stat.value} delay={1.8 + index * 0.2} />
                      ) : (
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={1.8 + index * 0.2} />
                      )}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            {/* Stats Cards - Mobile/Tablet (below terminal, shown on <lg) */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:hidden">
              {stats.map((stat, index) => (
                <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-slate-700 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span className="text-xs sm:text-sm text-slate-400">{stat.label}</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white">
                      {stat.isPercentage ? (
                        <PercentageCounter value={stat.value} delay={0.3 + index * 0.1} />
                      ) : stat.isCompact ? (
                        <CompactCounter value={stat.value} delay={0.3 + index * 0.1} />
                      ) : (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          delay={0.3 + index * 0.1}
                        />
                      )}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ParallaxContainer speed={0.1} className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs sm:text-sm">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-0.5 h-2 sm:w-1 sm:h-3 bg-slate-500 rounded-full mt-1.5 sm:mt-2"
            />
          </div>
        </motion.div>
      </ParallaxContainer>
    </section>
  )
}
