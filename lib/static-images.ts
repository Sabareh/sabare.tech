/**
 * Static image configuration for the application
 * Add your actual image paths here
 */

export const STATIC_IMAGES = {
  // Project diagrams and architectures
  diagrams: [
    "/data-pipeline-architecture.png",
    "/data-mesh-architecture.png",
    "/data-transformation-workflow.png",
    "/kubernetes-cluster-diagram.png",
    "/data-quality-dashboard.png",
    "/streaming-analytics-architecture.png",
  ],

  // Company logos and branding
  logos: [
    "/tech-innovations-logo.png",
    "/data-systems-logo.png",
    "/analytics-edge-logo.png",
    "/data-insights-logo.png",
  ],

  // Profile and personal images
  profile: ["/professional-headshot.png"],

  // Additional project images
  projects: [
    // Add more project images here as needed
  ],
}

// Flatten all images into a single array
export const ALL_STATIC_IMAGES = [
  ...STATIC_IMAGES.diagrams,
  ...STATIC_IMAGES.logos,
  ...STATIC_IMAGES.profile,
  ...STATIC_IMAGES.projects,
]

// Image categories for filtering
export const IMAGE_CATEGORIES = {
  DIAGRAMS: "diagrams",
  LOGOS: "logos",
  PROFILE: "profile",
  PROJECTS: "projects",
} as const

export type ImageCategory = (typeof IMAGE_CATEGORIES)[keyof typeof IMAGE_CATEGORIES]

/**
 * Get images by category
 */
export function getImagesByCategory(category: ImageCategory): string[] {
  return STATIC_IMAGES[category] || []
}

/**
 * Check if an image belongs to a specific category
 */
export function isImageInCategory(imagePath: string, category: ImageCategory): boolean {
  return STATIC_IMAGES[category].includes(imagePath)
}
