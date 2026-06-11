import { aggregateAiTools } from "@/lib/ai-providers/registry"
import type { AiTool, AiToolsResponse } from "@/types/ai-tool"
import type { PricingModel } from "@/types/platform"

export const getAiTools = async (): Promise<AiToolsResponse> => aggregateAiTools()

export const filterAiTools = (
  tools: AiTool[],
  options: {
    source?: string
    category?: string
    pricing?: PricingModel | "all"
    query?: string
  }
): AiTool[] => {
  const query = options.query?.trim().toLowerCase()

  return tools.filter((tool) => {
    if (options.source && options.source !== "all" && tool.source !== options.source) {
      return false
    }
    if (options.category && options.category !== "all" && tool.category !== options.category) {
      return false
    }
    if (options.pricing && options.pricing !== "all" && tool.pricing !== options.pricing) {
      return false
    }
    if (!query) return true

    const searchable = [
      tool.name,
      tool.description,
      tool.pricing ?? "",
      ...tool.tags,
      tool.license ?? "",
    ]
      .join(" ")
      .toLowerCase()

    return searchable.includes(query)
  })
}
