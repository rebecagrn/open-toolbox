import { AiHero } from "@/components/ai/ai-hero"
import { AiToolsDirectory } from "@/components/ai/ai-tools-directory"
import { getAiTools } from "@/lib/ai-tools"
import { formatUtcDateTime } from "@/lib/utils"

export default async function Home() {
  const data = await getAiTools()
  const syncedAtLabel = formatUtcDateTime(data.meta.fetchedAt)

  return (
    <>
      <AiHero meta={data.meta} />
      <AiToolsDirectory initialData={data} syncedAtLabel={syncedAtLabel} />
    </>
  )
}
