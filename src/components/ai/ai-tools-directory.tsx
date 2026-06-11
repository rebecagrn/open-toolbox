"use client"

import { useMemo, useRef, useState } from "react"
import { AiSourceFilter } from "@/components/ai/ai-source-filter"
import { AiToolCard } from "@/components/ai/ai-tool-card"
import { SearchBar } from "@/components/platforms/search-bar"
import { Pagination } from "@/components/ui/pagination"
import { filterAiTools } from "@/lib/ai-tools"
import { paginate } from "@/lib/pagination"
import { AI_TOOL_CATEGORIES } from "@/types/ai-tool"
import type { AiTool, AiToolCategory, AiToolSource, AiToolsResponse } from "@/types/ai-tool"
import type { PricingModel } from "@/types/platform"
import { cn } from "@/lib/utils"

interface AiToolsDirectoryProps {
  initialData: AiToolsResponse
  syncedAtLabel: string
}

export function AiToolsDirectory({ initialData, syncedAtLabel }: AiToolsDirectoryProps) {
  const [activeSource, setActiveSource] = useState<AiToolSource | "all">("all")
  const [activeCategory, setActiveCategory] = useState<AiToolCategory | "all">("all")
  const [activePricing, setActivePricing] = useState<PricingModel | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredTools = useMemo(
    () =>
      filterAiTools(initialData.tools, {
        source: activeSource,
        category: activeCategory,
        pricing: activePricing,
        query: searchQuery,
      }),
    [initialData.tools, activeSource, activeCategory, activePricing, searchQuery]
  )

  const sortedTools = useMemo(() => sortTools(filteredTools), [filteredTools])

  const pagination = useMemo(
    () => paginate(sortedTools, currentPage),
    [sortedTools, currentPage]
  )

  const handleSourceChange = (source: AiToolSource | "all") => {
    setActiveSource(source)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: AiToolCategory | "all") => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePricingChange = (pricing: PricingModel | "all") => {
    setActivePricing(pricing)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-1 text-sm font-medium text-brand-primary">Filter & search</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Browse AI tools by source and pricing
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Last synced {syncedAtLabel}
          </p>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          resultCount={sortedTools.length}
          itemLabel="tool"
          className="w-full lg:max-w-sm"
        />
      </div>

      <AiSourceFilter
        tools={initialData.tools}
        activeSource={activeSource}
        onSourceChange={handleSourceChange}
      />

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by pricing">
        <PricingChip label="All pricing" isActive={activePricing === "all"} onClick={() => handlePricingChange("all")} />
        <PricingChip label="Open source" isActive={activePricing === "open-source"} onClick={() => handlePricingChange("open-source")} />
        <PricingChip label="Free" isActive={activePricing === "free"} onClick={() => handlePricingChange("free")} />
        <PricingChip label="Freemium" isActive={activePricing === "freemium"} onClick={() => handlePricingChange("freemium")} />
        <PricingChip label="Paid" isActive={activePricing === "paid"} onClick={() => handlePricingChange("paid")} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <CategoryChip
          label="All categories"
          isActive={activeCategory === "all"}
          onClick={() => handleCategoryChange("all")}
        />
        {AI_TOOL_CATEGORIES.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => handleCategoryChange(category)}
          />
        ))}
      </div>

      {sortedTools.length > 0 ? (
        <>
          <div
            ref={gridRef}
            className="mt-8 scroll-mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pagination.items.map((tool, index) => (
              <AiToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
          <Pagination
            className="mt-10"
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            onPageChange={handlePageChange}
          />
        </>
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

interface PricingChipProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function PricingChip({ label, isActive, onClick }: PricingChipProps) {
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
        "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        isActive
          ? "bg-brand-primary text-white"
          : "bg-bg-secondary text-text-muted hover:text-text-primary"
      )}
      aria-pressed={isActive}
    >
      {label}
    </button>
  )
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
        "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
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
