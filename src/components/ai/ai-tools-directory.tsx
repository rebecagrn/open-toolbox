"use client"

import { useMemo, useState } from "react"
import { AiSourceFilter } from "@/components/ai/ai-source-filter"
import { AiToolCard } from "@/components/ai/ai-tool-card"
import { SearchBar } from "@/components/platforms/search-bar"
import { filterAiTools } from "@/lib/ai-tools"
import { AI_TOOL_CATEGORIES } from "@/types/ai-tool"
import type { AiTool, AiToolCategory, AiToolSource, AiToolsResponse } from "@/types/ai-tool"
import { cn } from "@/lib/utils"

interface AiToolsDirectoryProps {
  initialData: AiToolsResponse
}

export function AiToolsDirectory({ initialData }: AiToolsDirectoryProps) {
  const [activeSource, setActiveSource] = useState<AiToolSource | "all">("all")
  const [activeCategory, setActiveCategory] = useState<AiToolCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = useMemo(
    () =>
      filterAiTools(initialData.tools, {
        source: activeSource,
        category: activeCategory,
        query: searchQuery,
      }),
    [initialData.tools, activeSource, activeCategory, searchQuery]
  )

  const sortedTools = useMemo(() => sortTools(filteredTools), [filteredTools])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-1 text-sm font-medium text-brand-primary">Filter & search</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Browse open source AI tooling
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Last synced {new Date(initialData.meta.fetchedAt).toLocaleString()}
          </p>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={sortedTools.length}
          itemLabel="tool"
          className="w-full lg:max-w-sm"
        />
      </div>

      <AiSourceFilter
        tools={initialData.tools}
        activeSource={activeSource}
        onSourceChange={setActiveSource}
      />

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <CategoryChip
          label="All categories"
          isActive={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        />
        {AI_TOOL_CATEGORIES.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {sortedTools.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTools.map((tool, index) => (
            <AiToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium text-text-primary">No tools found</p>
          <p className="mt-1 max-w-sm text-sm text-text-muted">
            Try a different search term or switch the source filter.
          </p>
        </div>
      )}
    </section>
  )
}

const sortTools = (tools: AiTool[]): AiTool[] =>
  [...tools].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    const aScore = a.stars ?? a.downloads ?? a.likes ?? 0
    const bScore = b.stars ?? b.downloads ?? b.likes ?? 0
    return bScore - aScore
  })

interface CategoryChipProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function CategoryChip({ label, isActive, onClick }: CategoryChipProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <button
      type="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
        isActive
          ? "bg-brand-primary text-white"
          : "bg-bg-secondary text-text-muted hover:text-text-primary"
      )}
      aria-pressed={isActive}
    >
      {label.replace("-", " ")}
    </button>
  )
}
