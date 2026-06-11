import { Hero } from "@/components/platforms/hero"
import { PlatformDirectory } from "@/components/platforms/platform-directory"

export const metadata = {
  title: "Browse all segments — Open Projects",
  description: "Browse platforms and tools across all creative segments.",
}

export default function BrowsePage() {
  return (
    <>
      <Hero />
      <PlatformDirectory />
    </>
  )
}
