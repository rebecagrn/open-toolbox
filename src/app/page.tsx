import { AiHero } from "@/components/ai/ai-hero"
import { AiToolsDirectory } from "@/components/ai/ai-tools-directory"
import { getAiTools } from "@/lib/ai-tools"

export default async function Home() {
  const data = await getAiTools()

  return (
    <>
      <AiHero meta={data.meta} />
      <AiToolsDirectory initialData={data} />
    </>
  )
}
