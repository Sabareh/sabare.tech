import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { CursorTracker } from "@/components/cursor-tracker"
import { ParticleBackground } from "@/components/particle-background"
import { FloatingElements } from "@/components/floating-elements"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Data Engineer Portfolio | Advanced Analytics & Pipeline Solutions",
    template: "%s | Data Engineer Portfolio",
  },
  description:
    "Experienced data engineer specializing in scalable data pipelines, real-time analytics, and cloud infrastructure. Explore my projects and technical expertise.",
  keywords: [
    "data engineer",
    "data pipeline",
    "analytics",
    "big data",
    "cloud computing",
    "ETL",
    "data architecture",
    "machine learning",
    "data science",
    "portfolio",
  ],
  authors: [{ name: "Victor Sabare" }],
  creator: "Data Engineer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sabare.tech",
    title: "Data Engineer Portfolio | Advanced Analytics & Pipeline Solutions",
    description:
      "Experienced data engineer specializing in scalable data pipelines, real-time analytics, and cloud infrastructure.",
    siteName: "Data Engineer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Engineer Portfolio | Advanced Analytics & Pipeline Solutions",
    description:
      "Experienced data engineer specializing in scalable data pipelines, real-time analytics, and cloud infrastructure.",
    creator: "@victorsabare",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ParticleBackground />
          <CursorTracker />
          <FloatingElements />

          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            {/* removed pt-16 so homepage hero can slide up behind header */}
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
