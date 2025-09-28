import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        brand: "var(--brand)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      fontFamily: {
        sans: ["SF Pro Text", "SF Pro Display", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "9999px",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      backdropBlur: {
        "glass-sm": "var(--glass-blur-sm)",
        "glass-md": "var(--glass-blur-md)",
        "glass-lg": "var(--glass-blur-lg)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      keyframes: {
        "glass-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(8px) scale(0.98)",
            filter: "blur(6px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },
        press: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(0.97)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "fade-blur": {
          "0%": {
            opacity: "0",
            filter: "blur(16px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
          },
        },
        "segmented-thumb": {
          "0%": {
            transform: "translateX(var(--thumb-start, 0))",
          },
          "100%": {
            transform: "translateX(var(--thumb-end, 0))",
          },
        },
      },
      animation: {
        "glass-in": "glass-in 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)",
        press: "press 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)",
        "fade-blur": "fade-blur 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
        "segmented-thumb": "segmented-thumb 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
