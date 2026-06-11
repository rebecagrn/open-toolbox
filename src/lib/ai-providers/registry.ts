import { curatedAiTools } from "@/data/open-source-ai-tools"
import { fetchGitHubAiRepos } from "@/lib/github"
import { fetchHuggingFaceModels, fetchHuggingFaceSpaces } from "@/lib/huggingface"
import { fetchProductHuntAiProducts } from "@/lib/product-hunt"
import type { AiTool, AiToolsResponse, ProviderStatus } from "@/types/ai-tool"

export interface ProviderResult {
  tools: AiTool[]
  status: ProviderStatus
  message?: string
}

const resolveProvider = async (
  fetcher: () => Promise<AiTool[]>,
  requiresEnv?: string
): Promise<ProviderResult> => {
  if (requiresEnv && !process.env[requiresEnv]) {
    return { tools: [], status: "skipped", message: `Missing ${requiresEnv}` }
  }

  try {
    const tools = await fetcher()
    return { tools, status: "ok" }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown provider error"
    return { tools: [], status: "error", message }
  }
}

export const aggregateAiTools = async (): Promise<AiToolsResponse> => {
  const [curated, models, spaces, github, productHunt] = await Promise.all([
    Promise.resolve<ProviderResult>({
      tools: curatedAiTools.map((tool) => ({
        ...tool,
        pricing: tool.pricing ?? "open-source",
      })),
      status: "ok",
    }),
    resolveProvider(() => fetchHuggingFaceModels(50)),
    resolveProvider(() => fetchHuggingFaceSpaces(30)),
    resolveProvider(() => fetchGitHubAiRepos(8)),
    resolveProvider(() => fetchProductHuntAiProducts(20), "PRODUCTHUNT_TOKEN"),
  ])

  const tools: AiTool[] = [
    ...curated.tools,
    ...models.tools,
    ...spaces.tools,
    ...github.tools,
    ...productHunt.tools,
  ]

  return {
    tools,
    meta: {
      curated: curated.tools.length,
      huggingfaceModels: models.tools.length,
      huggingfaceSpaces: spaces.tools.length,
      githubRepos: github.tools.length,
      productHunt: productHunt.tools.length,
      fetchedAt: new Date().toISOString(),
      providers: {
        curated: curated.status,
        huggingfaceModels: models.status,
        huggingfaceSpaces: spaces.status,
        github: github.status,
        productHunt: productHunt.status,
      },
    },
  }
}
