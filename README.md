# Victor Sabare - Data Engineer Portfolio

A modern, glassmorphic portfolio website showcasing data engineering projects, blog posts, and professional expertise. Built with Next.js 15, featuring advanced animations, dual-theme support, and a premium design system.

## 🚀 Live Demo

Visit [sabare.tech](https://sabare.tech) to see the portfolio in action.

## ✨ Features

### Design & UX
- **Glassmorphic UI Design** - Modern glass-effect components with blur and transparency
- **Dark/Light Theme** - Seamless theme switching with system detection
- **Smooth Animations** - Framer Motion powered transitions and parallax effects
- **Responsive Design** - Optimized for all devices and screen sizes
- **Interactive Elements** - Magnetic buttons, hover effects, and particle backgrounds
- **Fixed Navigation** - Glassmorphic header with blur effect

### Content Management
- **File-based CMS** - Markdown files with YAML frontmatter
- **Medium Integration** - Automatic fetching of blog posts from Medium
- **Dynamic Projects** - Showcase projects with technologies and links
- **Testimonials** - Client testimonials with ratings
- **Resume/CV** - Built-in resume with print functionality

### Performance
- **Server Components** - Optimized with Next.js 15 App Router
- **Image Optimization** - Next.js Image component for fast loading
- **Static Generation** - Pre-rendered pages for optimal performance
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards

## 🛠 Tech Stack

### Core Framework
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript 5** - Type safety and better DX

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Shadcn/UI** - Accessible component library
- **Radix UI** - Unstyled, accessible primitives
- **Framer Motion** - Advanced animations
- **SF Pro Display & Inter** - Modern typography

### Content & Forms
- **Gray-matter** - YAML frontmatter parsing
- **React Markdown** - Markdown rendering
- **Remark & Rehype** - Markdown processing
- **React Hook Form + Zod** - Form validation

### Additional Libraries
- **next-themes** - Theme management
- **Lucide React** - Icon library
- **Embla Carousel** - Touch-friendly carousel
- **Recharts** - Data visualization
- **Date-fns** - Date utilities

## 📦 Installation

### Prerequisites
- Node.js 18+ (recommended 20+)
- pnpm 10+ (recommended package manager)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sabareh/sabare.tech.git
   cd sabare.tech
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗 Project Structure

```
sabare.tech/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── resume/            # Resume pages
│   └── uses/              # Tools & tech page
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   ├── navigation.tsx    # Header navigation
│   ├── hero-*.tsx        # Hero sections
│   └── ...               # Other components
├── content/              # Markdown content
│   ├── blog/            # Blog posts
│   ├── projects/        # Project details
│   ├── experience/      # Work experience
│   ├── testimonials/    # Client testimonials
│   └── config/          # Site configuration
├── lib/                  # Utility functions
│   ├── content.ts       # Content loading
│   ├── medium.ts        # Medium API
│   └── utils.ts         # Helper functions
├── styles/              # Global styles
│   ├── globals.css      # Main stylesheet
│   └── tokens.css       # Design tokens
├── public/              # Static assets
│   └── static/          # Images and files
└── hooks/               # Custom React hooks
```

## 📝 Content Management

### Adding Blog Posts

Create a new markdown file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "Brief description of your post"
coverImage: "/static/images/post-cover.jpg"
tags: ["data engineering", "analytics"]
featured: true
---

Your blog content here...
```

### Adding Projects

Create a markdown file in `content/projects/`:

```markdown
---
title: "Project Name"
description: "Project description"
imageUrl: "/static/images/project.jpg"
technologies: ["Python", "Apache Spark", "AWS"]
githubUrl: "https://github.com/username/repo"
demoUrl: "https://demo.example.com"
featured: true
---

Detailed project information...
```

### Medium Integration

The site automatically fetches your latest Medium posts. Configure the Medium profile URL in `lib/medium.ts`:

```typescript
export const MEDIUM_PROFILE_URL = "https://medium.com/@yourusername"
```

## 🎨 Customization

### Design Tokens

Edit `styles/tokens.css` to customize colors, spacing, and effects:

```css
:root {
  --brand: #0a84ff;        /* Primary brand color */
  --glass-blur-md: 16px;   /* Glass blur amount */
  --radius-md: 16px;       /* Border radius */
  /* ... more tokens */
}
```

### Theme Configuration

Modify theme settings in `components/theme-provider.tsx` or use the built-in theme toggle.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

Build the production version:

```bash
pnpm build
pnpm start
```

For static export (if applicable):

```bash
pnpm build
```

## 📜 Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## 🎨 Glassmorphic Design System

The site features a comprehensive glassmorphic design system with these utility classes:

- `.glass-nav` - Navigation with premium blur
- `.glass-effect` - General glass elements
- `.liquid-glass` - Advanced glass with gradients
- `.liquid-noise` - Texture overlay
- `.liquid-sheen` - Animated shine effect
- `.card-hover` - Interactive card elevation
- `.liquid-button` - Gradient animated buttons
- `.gradient-text` - Animated color-shifting text
- `.ambient-gradient` - Immersive backgrounds

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Victor Oketch Sabare**
Data Engineer | Nairobi, Kenya

- Website: [sabare.tech](https://sabare.tech)
- Email: [victor@sabare.tech](mailto:victor@sabare.tech)
- GitHub: [@Sabareh](https://github.com/Sabareh)
- LinkedIn: [Victor Sabare](https://linkedin.com/in/victor-sabare)
- Twitter: [@victorsabare](https://twitter.com/victorsabare)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- UI components from [Shadcn/UI](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---

**Built with ❤️ using Next.js and modern web technologies**
