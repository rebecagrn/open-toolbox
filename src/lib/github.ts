import type { AiTool } from "@/types/ai-tool"

const GITHUB_API_BASE = "https://api.github.com"

interface GitHubRepo {
  id: number
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  topics?: string[]
  license?: { spdx_id: string | null } | null
  language?: string | null
}

interface GitHubSearchResponse {
  items: GitHubRepo[]
  total_count: number
}

const OSS_AI_QUERIES = [
  "topic:llm stars:>500",
  "topic:machine-learning stars:>2000",
  "topic:generative-ai stars:>300",
  "ollama in:name,description stars:>1000",
  "langchain in:name,description stars:>500",
]

const mapRepoToAiTool = (repo: GitHubRepo): AiTool => ({
  id: `github-${repo.id}`,
  name: repo.full_name.split("/").pop() ?? repo.full_name,
  description: repo.description ?? `Open source project on GitHub`,
  url: repo.html_url,
  source: "github",
  category: "library",
  tags: [
    ...(repo.topics?.slice(0, 4) ?? []),
    ...(repo.language ? [repo.language] : []),
  ],
  license: repo.license?.spdx_id ?? undefined,
  stars: repo.stargazers_count,
})

export const fetchGitHubAiRepos = async (perQuery = 10): Promise<AiTool[]> => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const seen = new Set<string>()
  const tools: AiTool[] = []

  for (const query of OSS_AI_QUERIES) {
    const url = new URL(`${GITHUB_API_BASE}/search/repositories`)
    url.searchParams.set("q", query)
    url.searchParams.set("sort", "stars")
    url.searchParams.set("order", "desc")
    url.searchParams.set("per_page", String(perQuery))

    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) continue

    const data = (await response.json()) as GitHubSearchResponse

    for (const repo of data.items) {
      if (seen.has(repo.full_name)) continue
      seen.add(repo.full_name)
      tools.push(mapRepoToAiTool(repo))
    }
  }

  return tools.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
}
