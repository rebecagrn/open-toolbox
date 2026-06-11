import type { AiTool } from "@/types/ai-tool"

const HF_API_BASE = "https://huggingface.co/api"

const OPEN_SOURCE_LICENSES = new Set([
  "apache-2.0",
  "mit",
  "openrail",
  "openrail++",
  "llama2",
  "llama3",
  "llama3.1",
  "llama3.2",
  "llama3.3",
  "cc-by-4.0",
  "cc-by-sa-4.0",
  "gpl-3.0",
  "gpl-2.0",
  "bsd-3-clause",
  "bsd-2-clause",
  "afl-3.0",
  "artistic-2.0",
  "lgpl-3.0",
  "mpl-2.0",
  "unlicense",
  "wtfpl",
  "cc0-1.0",
])

interface HfModel {
  id: string
  modelId?: string
  likes?: number
  downloads?: number
  tags?: string[]
  pipeline_tag?: string
  library_name?: string
}

interface HfSpace {
  id: string
  likes?: number
  tags?: string[]
  sdk?: string
}

const extractLicense = (tags: string[] = []): string | undefined => {
  const licenseTag = tags.find((tag) => tag.startsWith("license:"))
  return licenseTag?.replace("license:", "")
}

const isOpenSourceLicense = (tags: string[] = []): boolean => {
  const license = extractLicense(tags)
  if (!license) return true
  if (license === "other") return false
  return OPEN_SOURCE_LICENSES.has(license) || license.includes("open")
}

const mapModelToAiTool = (model: HfModel): AiTool => {
  const id = model.modelId ?? model.id
  const license = extractLicense(model.tags)

  return {
    id: `hf-model-${id.replace(/\//g, "-")}`,
    name: id.split("/").pop() ?? id,
    description: [
      model.pipeline_tag && `Task: ${model.pipeline_tag}`,
      model.library_name && `Library: ${model.library_name}`,
      license && `License: ${license}`,
    ]
      .filter(Boolean)
      .join(" · "),
    url: `https://huggingface.co/${id}`,
    source: "huggingface-model",
    category: "model",
    tags: model.tags?.filter((t) => !t.startsWith("license:")).slice(0, 6) ?? [],
    license,
    likes: model.likes,
    downloads: model.downloads,
    pricing: "open-source",
  }
}

const mapSpaceToAiTool = (space: HfSpace): AiTool => ({
  id: `hf-space-${space.id.replace(/\//g, "-")}`,
  name: space.id.split("/").pop() ?? space.id,
  description: `Hugging Face Space · SDK: ${space.sdk ?? "unknown"}`,
  url: `https://huggingface.co/spaces/${space.id}`,
  source: "huggingface-space",
  category: "space",
  tags: space.tags?.slice(0, 6) ?? [],
  likes: space.likes,
  pricing: "open-source",
})

export const fetchHuggingFaceModels = async (limit = 50): Promise<AiTool[]> => {
  const url = new URL(`${HF_API_BASE}/models`)
  url.searchParams.set("sort", "downloads")
  url.searchParams.set("direction", "-1")
  url.searchParams.set("limit", String(limit))

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Hugging Face models API failed: ${response.status}`)
  }

  const models = (await response.json()) as HfModel[]

  return models.filter((m) => isOpenSourceLicense(m.tags)).map(mapModelToAiTool)
}

export const fetchHuggingFaceSpaces = async (limit = 30): Promise<AiTool[]> => {
  const url = new URL(`${HF_API_BASE}/spaces`)
  url.searchParams.set("sort", "likes")
  url.searchParams.set("direction", "-1")
  url.searchParams.set("limit", String(limit))

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Hugging Face spaces API failed: ${response.status}`)
  }

  const spaces = (await response.json()) as HfSpace[]
  return spaces.map(mapSpaceToAiTool)
}
