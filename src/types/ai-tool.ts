import type { PricingModel } from "@/types/platform"

export const AI_TOOL_SOURCES = [
  "curated",
  "huggingface-model",
  "huggingface-space",
  "github",
  "product-hunt",
] as const

export type AiToolSource = (typeof AI_TOOL_SOURCES)[number]

export const AI_TOOL_CATEGORIES = [
  "framework",
  "inference",
  "agent",
  "vector-db",
  "training",
  "evaluation",
  "ui",
  "model",
  "space",
  "library",
] as const

export type AiToolCategory = (typeof AI_TOOL_CATEGORIES)[number]

export interface AiTool {
  id: string
  name: string
  description: string
  url: string
  source: AiToolSource
  category: AiToolCategory
  tags: string[]
  pricing?: PricingModel
  license?: string
  stars?: number
  downloads?: number
  likes?: number
  featured?: boolean
}

export type ProviderStatus = "ok" | "skipped" | "error"

export interface AiToolsResponse {
  tools: AiTool[]
  meta: {
    curated: number
    huggingfaceModels: number
    huggingfaceSpaces: number
    githubRepos: number
    productHunt: number
    fetchedAt: string
    providers: {
      curated: ProviderStatus
      huggingfaceModels: ProviderStatus
      huggingfaceSpaces: ProviderStatus
      github: ProviderStatus
      productHunt: ProviderStatus
    }
  }
}
