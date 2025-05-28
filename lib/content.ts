import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

// Define the content types
export type ContentType = "blog" | "project" | "experience" | "testimonial" | "page" | "config"

// Define the content item interface
export interface ContentItem {
  id: string
  slug: string
  title: string
  description?: string
  content: string
  date?: string
  author?: string
  type: ContentType
  featured?: boolean
  coverImage?: string
  readingTime?: string
  tags?: string[]
  metadata?: Record<string, any>
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  coverImage?: string
  tags: string[]
  featured?: boolean
  content: string
  author?: string
  metadata?: Record<string, any>
}

export interface Project {
  slug: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  featured?: boolean
  content: string
  metadata?: Record<string, any>
}

export interface Experience {
  slug: string
  title: string
  company: string
  position: string
  startDate: string
  endDate?: string
  location: string
  description: string
  technologies: string[]
  content: string
  metadata?: Record<string, any>
}

export interface Testimonial {
  slug: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  imageUrl?: string
  metadata?: Record<string, any>
}

// Helper function to read files from a directory
const getFilesInDirectory = (directory: string): string[] => {
  try {
    const fullPath = path.join(process.cwd(), directory)
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory does not exist: ${fullPath}`)
      return []
    }

    const stats = fs.statSync(fullPath)
    if (!stats.isDirectory()) {
      console.warn(`Path is not a directory: ${fullPath}`)
      return []
    }

    return fs.readdirSync(fullPath).filter((file) => {
      const filePath = path.join(fullPath, file)
      const fileStats = fs.statSync(filePath)
      return fileStats.isFile() && file.endsWith(".md")
    })
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error)
    return []
  }
}

// Helper function to read and parse a markdown file
const parseMarkdownFile = async (filePath: string, type: ContentType): Promise<ContentItem | null> => {
  try {
    const fullPath = path.join(process.cwd(), filePath)

    // Check if path exists and is a file, not a directory
    if (!fs.existsSync(fullPath)) {
      console.warn(`File does not exist: ${fullPath}`)
      return null
    }

    const stats = fs.statSync(fullPath)
    if (stats.isDirectory()) {
      console.warn(`Path is a directory, not a file: ${fullPath}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Process markdown content
    const processedContent = await remark().use(html, { sanitize: false }).process(content)

    const htmlContent = processedContent.toString()

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200) + " min read"

    // Get the slug from the filename
    const slug = path.basename(filePath, path.extname(filePath))

    // Handle date parsing properly
    let dateString = new Date().toISOString()
    if (data.date) {
      if (data.date instanceof Date) {
        dateString = data.date.toISOString()
      } else if (typeof data.date === "string") {
        const parsedDate = new Date(data.date)
        if (!isNaN(parsedDate.getTime())) {
          dateString = parsedDate.toISOString()
        }
      }
    }

    return {
      id: slug,
      slug,
      title: data.title || slug,
      description: data.description || data.excerpt || "",
      content: htmlContent,
      date: dateString,
      author: data.author || "Admin",
      type,
      featured: data.featured || false,
      coverImage: data.coverImage,
      readingTime,
      tags: data.tags || [],
      metadata: { ...data },
    }
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error)
    return null
  }
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Get all content items of a specific type
export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  const directory = `content/${type}`
  const files = getFilesInDirectory(directory)

  const contentPromises = files.map((file) => parseMarkdownFile(`${directory}/${file}`, type))

  const contentItems = await Promise.all(contentPromises)

  // Filter out null values and sort by date if available
  return contentItems
    .filter((item): item is ContentItem => item !== null)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
}

// Mock data for development when no markdown files are available
function getMockBlogPosts(): BlogPost[] {
  return [
    {
      slug: "building-real-time-data-pipelines",
      title: "Building Real-Time Data Pipelines with Kafka and Spark",
      excerpt:
        "Learn how to design and implement scalable real-time data pipelines using Apache Kafka and Spark Streaming for high-throughput event processing.",
      date: "2023-11-15T10:00:00Z",
      readingTime: "12 min read",
      coverImage: "/data-pipeline-architecture.png",
      tags: ["Apache Kafka", "Spark Streaming", "Real-time Processing", "Data Engineering"],
      featured: true,
      author: "Data Engineer",
      content: `<h1>Building Real-Time Data Pipelines with Kafka and Spark</h1>

<p>In today's data-driven world, the ability to process and analyze data in real-time has become crucial for businesses to stay competitive. Real-time data pipelines enable organizations to make instant decisions, detect anomalies as they occur, and provide immediate insights to stakeholders.</p>

<h2>Architecture Overview</h2>

<p>A robust real-time data pipeline typically consists of several key components:</p>

<h3>1. Data Ingestion Layer</h3>
<ul>
<li><strong>Apache Kafka</strong>: Acts as the central nervous system for data streaming</li>
<li><strong>Schema Registry</strong>: Ensures data consistency and evolution</li>
<li><strong>Kafka Connect</strong>: Simplifies integration with various data sources</li>
</ul>

<h3>2. Stream Processing Layer</h3>
<ul>
<li><strong>Apache Spark Streaming</strong>: Processes data in micro-batches</li>
<li><strong>Structured Streaming</strong>: Provides exactly-once processing guarantees</li>
<li><strong>Custom transformations</strong>: Business-specific data processing logic</li>
</ul>

<h3>3. Storage Layer</h3>
<ul>
<li><strong>Data Lake</strong>: For long-term storage and batch analytics</li>
<li><strong>Real-time databases</strong>: For immediate query access</li>
<li><strong>Caching layer</strong>: For ultra-low latency requirements</li>
</ul>

<h2>Implementation Best Practices</h2>

<h3>Kafka Configuration</h3>
<pre><code>val kafkaParams = Map[String, Object](
  "bootstrap.servers" -> "localhost:9092",
  "key.deserializer" -> classOf[StringDeserializer],
  "value.deserializer" -> classOf[StringDeserializer],
  "group.id" -> "spark-streaming-consumer",
  "auto.offset.reset" -> "latest",
  "enable.auto.commit" -> (false: java.lang.Boolean)
)</code></pre>

<h3>Spark Streaming Setup</h3>
<pre><code>val spark = SparkSession.builder()
  .appName("RealTimeDataPipeline")
  .config("spark.sql.streaming.checkpointLocation", "/tmp/checkpoint")
  .getOrCreate()

val df = spark
  .readStream
  .format("kafka")
  .options(kafkaParams)
  .load()</code></pre>

<h2>Performance Optimization</h2>

<ol>
<li><strong>Partitioning Strategy</strong>: Ensure optimal data distribution</li>
<li><strong>Batch Size Tuning</strong>: Balance latency and throughput</li>
<li><strong>Resource Allocation</strong>: Right-size your cluster</li>
<li><strong>Monitoring</strong>: Implement comprehensive observability</li>
</ol>

<h2>Conclusion</h2>

<p>Building real-time data pipelines requires careful consideration of architecture, technology choices, and operational practices. With the right approach, you can achieve sub-second processing latencies while maintaining high reliability and scalability.</p>`,
    },
    {
      slug: "data-mesh-architecture",
      title: "Implementing a Data Mesh Architecture for Enterprise Scale",
      excerpt:
        "Explore how data mesh architecture can transform your organization's approach to data, enabling domain-oriented ownership and self-service analytics.",
      date: "2023-10-22T14:30:00Z",
      readingTime: "15 min read",
      coverImage: "/data-mesh-architecture.png",
      tags: ["Data Mesh", "Data Architecture", "Domain-Driven Design", "Data Governance"],
      featured: true,
      author: "Data Engineer",
      content: `<h1>Implementing a Data Mesh Architecture for Enterprise Scale</h1>

<p>Data mesh represents a paradigm shift in how organizations approach data architecture, moving from centralized data platforms to a distributed, domain-oriented approach that treats data as a product.</p>

<h2>Core Principles of Data Mesh</h2>

<h3>1. Domain-Oriented Decentralized Data Ownership</h3>
<p>Each business domain owns and operates their data products, reducing bottlenecks and increasing agility.</p>

<h3>2. Data as a Product</h3>
<p>Data is treated as a product with clear ownership, SLAs, and consumer-focused design.</p>

<h3>3. Self-Serve Data Infrastructure Platform</h3>
<p>A platform that enables domain teams to autonomously build, deploy, and maintain their data products.</p>

<h3>4. Federated Computational Governance</h3>
<p>Governance that balances autonomy with global standards and compliance requirements.</p>

<h2>Implementation Strategy</h2>

<h3>Phase 1: Foundation</h3>
<ul>
<li>Establish platform capabilities</li>
<li>Define data product standards</li>
<li>Create governance framework</li>
</ul>

<h3>Phase 2: Pilot Domains</h3>
<ul>
<li>Select initial domains</li>
<li>Build first data products</li>
<li>Validate architecture decisions</li>
</ul>

<h3>Phase 3: Scale</h3>
<ul>
<li>Onboard additional domains</li>
<li>Refine platform capabilities</li>
<li>Optimize governance processes</li>
</ul>

<h2>Technology Stack</h2>

<h3>Data Product Platform</h3>
<ul>
<li><strong>Kubernetes</strong>: Container orchestration</li>
<li><strong>Apache Airflow</strong>: Workflow management</li>
<li><strong>dbt</strong>: Data transformation</li>
<li><strong>Great Expectations</strong>: Data quality</li>
</ul>

<h3>Data Infrastructure</h3>
<ul>
<li><strong>Apache Kafka</strong>: Event streaming</li>
<li><strong>Apache Spark</strong>: Data processing</li>
<li><strong>Delta Lake</strong>: Data storage</li>
<li><strong>Trino</strong>: Federated queries</li>
</ul>

<h2>Benefits and Challenges</h2>

<h3>Benefits</h3>
<ul>
<li>Increased agility and autonomy</li>
<li>Better data quality through ownership</li>
<li>Reduced time to market for data products</li>
<li>Improved scalability</li>
</ul>

<h3>Challenges</h3>
<ul>
<li>Cultural transformation required</li>
<li>Initial complexity and overhead</li>
<li>Need for strong platform capabilities</li>
<li>Governance complexity</li>
</ul>

<h2>Conclusion</h2>

<p>Data mesh architecture offers a promising approach to scaling data capabilities in large organizations. Success requires careful planning, strong platform capabilities, and a commitment to cultural transformation.</p>`,
    },
    {
      slug: "optimizing-spark-performance",
      title: "Advanced Spark Performance Optimization Techniques",
      excerpt:
        "Deep dive into advanced techniques for optimizing Apache Spark performance, including memory management, partitioning strategies, and query optimization.",
      date: "2023-09-18T09:15:00Z",
      readingTime: "18 min read",
      coverImage: "/data-transformation-workflow.png",
      tags: ["Apache Spark", "Performance Optimization", "Big Data", "Scala"],
      featured: false,
      author: "Data Engineer",
      content: `<h1>Advanced Spark Performance Optimization Techniques</h1>

<p>Apache Spark's performance can vary dramatically based on configuration and coding practices. This guide covers advanced optimization techniques that can improve your Spark jobs by orders of magnitude.</p>

<h2>Memory Management</h2>

<h3>Understanding Spark Memory Model</h3>
<p>Spark divides memory into several regions:</p>
<ul>
<li><strong>Execution Memory</strong>: For shuffles, joins, sorts, and aggregations</li>
<li><strong>Storage Memory</strong>: For caching and persisting RDDs/DataFrames</li>
<li><strong>User Memory</strong>: For user data structures and metadata</li>
<li><strong>Reserved Memory</strong>: For system use</li>
</ul>

<h3>Optimization Strategies</h3>
<ol>
<li><strong>Right-size your executors</strong>: Balance parallelism and resource utilization</li>
<li><strong>Tune memory fractions</strong>: Adjust spark.sql.adaptive.coalescePartitions.enabled</li>
<li><strong>Use appropriate storage levels</strong>: Choose between MEMORY_ONLY, MEMORY_AND_DISK, etc.</li>
</ol>

<h2>Partitioning Strategies</h2>

<h3>Data Skew Mitigation</h3>
<pre><code>// Detect skew
df.groupBy("partition_key").count().orderBy(desc("count")).show()

// Salting technique for skewed joins
val saltedDF = df.withColumn("salted_key", 
  concat(col("key"), lit("_"), (rand() * 100).cast("int"))
)</code></pre>

<h3>Optimal Partition Size</h3>
<ul>
<li>Target 128MB-1GB per partition</li>
<li>Consider downstream operations</li>
<li>Use adaptive query execution when available</li>
</ul>

<h2>Query Optimization</h2>

<h3>Catalyst Optimizer Tips</h3>
<ol>
<li><strong>Predicate Pushdown</strong>: Filter early and often</li>
<li><strong>Column Pruning</strong>: Select only needed columns</li>
<li><strong>Join Optimization</strong>: Choose appropriate join strategies</li>
</ol>

<h3>Advanced Techniques</h3>
<pre><code>// Broadcast joins for small tables
val broadcastDF = broadcast(smallDF)
val result = largeDF.join(broadcastDF, "key")

// Bucketing for repeated joins
df.write
  .bucketBy(10, "user_id")
  .sortBy("timestamp")
  .saveAsTable("bucketed_table")</code></pre>

<h2>Monitoring and Debugging</h2>

<h3>Key Metrics to Watch</h3>
<ul>
<li><strong>Task duration distribution</strong>: Identify stragglers</li>
<li><strong>Shuffle read/write</strong>: Minimize data movement</li>
<li><strong>GC time</strong>: Tune garbage collection</li>
<li><strong>CPU utilization</strong>: Ensure efficient resource use</li>
</ul>

<h3>Tools and Techniques</h3>
<ul>
<li>Spark UI for job analysis</li>
<li>Spark History Server for historical data</li>
<li>Custom metrics and logging</li>
<li>Profiling tools like jstack and jmap</li>
</ul>

<h2>Conclusion</h2>

<p>Spark performance optimization is an iterative process that requires understanding your data, workload patterns, and cluster characteristics. Start with the basics and gradually apply more advanced techniques as needed.</p>`,
    },
    {
      slug: "kubernetes-data-workloads",
      title: "Running Data Workloads on Kubernetes: Best Practices",
      excerpt:
        "Learn how to effectively deploy and manage data processing workloads on Kubernetes, including Spark, Airflow, and streaming applications.",
      date: "2023-08-25T16:45:00Z",
      readingTime: "14 min read",
      coverImage: "/kubernetes-cluster-diagram.png",
      tags: ["Kubernetes", "Data Engineering", "DevOps", "Container Orchestration"],
      featured: false,
      author: "Data Engineer",
      content: `<h1>Running Data Workloads on Kubernetes: Best Practices</h1>

<p>Kubernetes has become the de facto standard for container orchestration, and data workloads are increasingly being deployed on Kubernetes clusters. This guide covers best practices for running data processing workloads effectively.</p>

<h2>Why Kubernetes for Data Workloads?</h2>

<h3>Benefits</h3>
<ul>
<li><strong>Resource Efficiency</strong>: Dynamic resource allocation and sharing</li>
<li><strong>Scalability</strong>: Auto-scaling based on workload demands</li>
<li><strong>Portability</strong>: Consistent deployment across environments</li>
<li><strong>Operational Simplicity</strong>: Unified platform for all workloads</li>
</ul>

<h3>Challenges</h3>
<ul>
<li><strong>Stateful Applications</strong>: Managing persistent storage</li>
<li><strong>Resource Intensive</strong>: High memory and CPU requirements</li>
<li><strong>Networking</strong>: Complex communication patterns</li>
<li><strong>Monitoring</strong>: Observability across distributed systems</li>
</ul>

<h2>Architecture Patterns</h2>

<h3>Batch Processing with Spark</h3>
<pre><code>apiVersion: sparkoperator.k8s.io/v1beta2
kind: SparkApplication
metadata:
  name: data-processing-job
spec:
  type: Scala
  mode: cluster
  image: "spark:3.4.0"
  mainClass: "com.example.DataProcessor"
  mainApplicationFile: "s3a://bucket/app.jar"
  sparkVersion: "3.4.0"
  driver:
    cores: 2
    memory: "4g"
    serviceAccount: spark-driver
  executor:
    cores: 4
    instances: 10
    memory: "8g"</code></pre>

<h3>Stream Processing</h3>
<ul>
<li>Use StatefulSets for stream processors</li>
<li>Implement proper checkpointing strategies</li>
<li>Configure resource limits and requests</li>
<li>Set up monitoring and alerting</li>
</ul>

<h2>Resource Management</h2>

<h3>CPU and Memory</h3>
<pre><code>resources:
  requests:
    memory: "4Gi"
    cpu: "2"
  limits:
    memory: "8Gi"
    cpu: "4"</code></pre>

<h3>Storage</h3>
<ul>
<li>Use persistent volumes for stateful workloads</li>
<li>Choose appropriate storage classes</li>
<li>Implement backup and recovery strategies</li>
<li>Consider data locality for performance</li>
</ul>

<h2>Networking and Security</h2>

<h3>Network Policies</h3>
<pre><code>apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: data-workload-policy
spec:
  podSelector:
    matchLabels:
      app: data-processor
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: data-source</code></pre>

<h3>Security Best Practices</h3>
<ul>
<li>Use service accounts with minimal permissions</li>
<li>Implement pod security policies</li>
<li>Encrypt data in transit and at rest</li>
<li>Regular security scanning and updates</li>
</ul>

<h2>Monitoring and Observability</h2>

<h3>Metrics Collection</h3>
<ul>
<li>Prometheus for metrics collection</li>
<li>Grafana for visualization</li>
<li>Custom metrics for business logic</li>
<li>Resource utilization monitoring</li>
</ul>

<h3>Logging Strategy</h3>
<ul>
<li>Centralized logging with ELK stack</li>
<li>Structured logging formats</li>
<li>Log aggregation and retention policies</li>
<li>Correlation IDs for tracing</li>
</ul>

<h2>Conclusion</h2>

<p>Running data workloads on Kubernetes requires careful consideration of resource management, networking, security, and observability. With proper planning and implementation, Kubernetes can provide a robust platform for your data processing needs.</p>`,
    },
  ]
}

// Get blog posts from markdown files or fallback to mock data
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllContent("blog")

    if (posts.length > 0) {
      return posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.description || "",
        date: post.date || new Date().toISOString(),
        readingTime: post.readingTime || "5 min read",
        coverImage: post.coverImage,
        tags: post.tags || [],
        featured: post.featured || false,
        content: post.content,
        author: post.author,
        metadata: post.metadata,
      }))
    }
  } catch (error) {
    console.log("Error loading blog posts from markdown, using mock data:", error)
  }

  // Fallback to mock data
  return getMockBlogPosts()
}

// Get single content item by slug
export async function getContentBySlug(type: ContentType, slug: string): Promise<ContentItem | null> {
  const filePath = `content/${type}/${slug}.md`
  return parseMarkdownFile(filePath, type)
}

// Get single blog post
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await getContentBySlug("blog", slug)

    if (post) {
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.description || "",
        date: post.date || new Date().toISOString(),
        readingTime: post.readingTime || "5 min read",
        coverImage: post.coverImage,
        tags: post.tags || [],
        featured: post.featured || false,
        content: post.content,
        author: post.author,
        metadata: post.metadata,
      }
    }
  } catch (error) {
    console.log("Error loading blog post from markdown:", error)
  }

  // Check if we have a mock post with this slug
  const mockPosts = getMockBlogPosts()
  const mockPost = mockPosts.find((p) => p.slug === slug)
  return mockPost || null
}

// Get featured content items
export async function getFeaturedContent(type: ContentType, limit = 3): Promise<ContentItem[]> {
  const allContent = await getAllContent(type)
  return allContent.filter((item) => item.featured).slice(0, limit)
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.featured).slice(0, 3)
}

// Search content items
export async function searchContent(
  query: string,
  types: ContentType[] = ["blog", "project", "experience"],
): Promise<ContentItem[]> {
  const contentPromises = types.map((type) => getAllContent(type))
  const contentByType = await Promise.all(contentPromises)
  const allContent = contentByType.flat()

  if (!query) return allContent

  const lowerQuery = query.toLowerCase()
  return allContent.filter((item) => {
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
      (item.content && item.content.toLowerCase().includes(lowerQuery)) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
  })
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  const searchTerm = query.toLowerCase()

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      post.content.toLowerCase().includes(searchTerm),
  )
}

// Get content by tag
export async function getContentByTag(tag: string, types: ContentType[] = ["blog", "project"]): Promise<ContentItem[]> {
  const contentPromises = types.map((type) => getAllContent(type))
  const contentByType = await Promise.all(contentPromises)
  const allContent = contentByType.flat()

  const lowerTag = tag.toLowerCase()
  return allContent.filter((item) => item.tags?.some((contentTag) => contentTag.toLowerCase() === lowerTag))
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

// Get all unique tags from content
export async function getAllTags(types: ContentType[] = ["blog", "project"]): Promise<string[]> {
  const contentPromises = types.map((type) => getAllContent(type))
  const contentByType = await Promise.all(contentPromises)
  const allContent = contentByType.flat()

  const tags = new Set<string>()
  allContent.forEach((item) => {
    item.tags?.forEach((tag) => {
      tags.add(tag)
    })
  })

  return Array.from(tags).sort()
}

// Get all unique tags from blog posts
export async function getAllTagsFromBlogPosts(): Promise<string[]> {
  const allPosts = await getAllBlogPosts()
  const tags = new Set<string>()

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

// Get configuration from markdown
export async function getConfig(configName: string): Promise<Record<string, any> | null> {
  const configItem = await getContentBySlug("config", configName)
  if (!configItem) return null
  return configItem.metadata || {}
}

// Similar functions for other content types
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await getAllContent("project")

    return projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      description: project.description || "",
      technologies: project.metadata?.technologies || [],
      githubUrl: project.metadata?.githubUrl,
      demoUrl: project.metadata?.demoUrl,
      imageUrl: project.metadata?.imageUrl || project.coverImage,
      featured: project.featured || false,
      content: project.content,
      metadata: project.metadata,
    }))
  } catch (error) {
    console.log("Error loading projects:", error)
    return []
  }
}

export async function getAllExperience(): Promise<Experience[]> {
  try {
    const experiences = await getAllContent("experience")

    return experiences.map((exp) => ({
      slug: exp.slug,
      title: exp.title,
      company: exp.metadata?.company || "",
      position: exp.metadata?.position || "",
      startDate: exp.metadata?.startDate || "",
      endDate: exp.metadata?.endDate,
      location: exp.metadata?.location || "",
      description: exp.description || "",
      technologies: exp.metadata?.technologies || [],
      content: exp.content,
      metadata: exp.metadata,
    }))
  } catch (error) {
    console.log("Error loading experience:", error)
    return []
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await getAllContent("testimonial")

    return testimonials.map((testimonial) => ({
      slug: testimonial.slug,
      name: testimonial.metadata?.name || testimonial.title,
      position: testimonial.metadata?.position || "",
      company: testimonial.metadata?.company || "",
      content: testimonial.content,
      rating: testimonial.metadata?.rating || 5,
      imageUrl: testimonial.metadata?.imageUrl || testimonial.coverImage,
      metadata: testimonial.metadata,
    }))
  } catch (error) {
    console.log("Error loading testimonials:", error)
    return []
  }
}
