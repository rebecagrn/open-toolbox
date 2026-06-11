export const SEGMENT_IDS = [
  "design",
  "programming",
  "sounds",
  "visual",
  "video",
  "writing",
  "productivity",
  "ai",
  "devops",
  "learning",
  "marketing",
  "analytics",
] as const

export type SegmentId = (typeof SEGMENT_IDS)[number]

export type PricingModel = "free" | "freemium" | "paid" | "open-source"

export interface Segment {
  id: SegmentId
  label: string
  description: string
  icon: string
  color: string
}

export interface Platform {
  id: string
  name: string
  description: string
  url: string
  segments: SegmentId[]
  tags: string[]
  pricing: PricingModel
  featured?: boolean
}
