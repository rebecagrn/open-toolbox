import { AiHero } from "@/components/ai/ai-hero"
import { AiToolsDirectory } from "@/components/ai/ai-tools-directory"
import { getAiTools } from "@/lib/ai-tools"
import { formatUtcDateTime } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Open Source AI Tools — Open Projects",
  description:
    "Curated open source AI frameworks plus live listings from Hugging Face and GitHub.",
}

export default async function AiPage() {
  const data = await getAiTools()
  const syncedAtLabel = formatUtcDateTime(data.meta.fetchedAt)

  return (
    <>
      <AiHero meta={data.meta} />
      <AiToolsDirectory initialData={data} syncedAtLabel={syncedAtLabel} />
    </>
  )
}
