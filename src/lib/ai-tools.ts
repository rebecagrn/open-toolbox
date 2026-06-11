import { curatedAiTools } from "@/data/open-source-ai-tools"
import { fetchGitHubAiRepos } from "@/lib/github"
import { fetchHuggingFaceModels, fetchHuggingFaceSpaces } from "@/lib/huggingface"
import type { AiTool, AiToolsResponse } from "@/types/ai-tool"

export const getAiTools = async (): Promise<AiToolsResponse> => {
  const [models, spaces, githubRepos] = await Promise.allSettled([
    fetchHuggingFaceModels(50),
    fetchHuggingFaceSpaces(30),
    fetchGitHubAiRepos(8),
  ])

  const huggingfaceModels = models.status === "fulfilled" ? models.value : []
  const huggingfaceSpaces = spaces.status === "fulfilled" ? spaces.value : []
  const github = githubRepos.status === "fulfilled" ? githubRepos.value : []

  const tools: AiTool[] = [
    ...curatedAiTools,
    ...huggingfaceModels,
    ...huggingfaceSpaces,
    ...github,
  ]

  return {
    tools,
    meta: {
      curated: curatedAiTools.length,
      huggingfaceModels: huggingfaceModels.length,
      huggingfaceSpaces: huggingfaceSpaces.length,
      githubRepos: github.length,
      fetchedAt: new Date().toISOString(),
    },
  }
}

export const filterAiTools = (
  tools: AiTool[],
  options: {
    source?: string
    category?: string
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
    if (!query) return true

    const searchable = [tool.name, tool.description, ...tool.tags, tool.license ?? ""]
      .join(" ")
      .toLowerCase()

    return searchable.includes(query)
  })
}
