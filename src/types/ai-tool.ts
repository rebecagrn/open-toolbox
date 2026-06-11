export const AI_TOOL_SOURCES = ["curated", "huggingface-model", "huggingface-space", "github"] as const

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
  license?: string
  stars?: number
  downloads?: number
  likes?: number
  featured?: boolean
}

export interface AiToolsResponse {
  tools: AiTool[]
  meta: {
    curated: number
    huggingfaceModels: number
    huggingfaceSpaces: number
    githubRepos: number
    fetchedAt: string
  }
}
