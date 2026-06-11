"use client"

import { X } from "lucide-react"
import { segments } from "@/data/segments"
import { cn } from "@/lib/utils"
import type { PricingModel, SegmentId } from "@/types/platform"

const pricingLabels: Record<PricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "open-source": "Open source",
}

interface ActiveFiltersProps {
  activeSegment: SegmentId | "all"
  activePricing: PricingModel | "all"
  searchQuery: string
  onClearSegment: () => void
  onClearPricing: () => void
  onClearSearch: () => void
  onClearAll: () => void
}

export function ActiveFilters({
  activeSegment,
  activePricing,
  searchQuery,
  onClearSegment,
  onClearPricing,
  onClearSearch,
  onClearAll,
}: ActiveFiltersProps) {
  const hasSegment = activeSegment !== "all"
  const hasPricing = activePricing !== "all"
  const hasSearch = searchQuery.trim().length > 0
  const hasFilters = hasSegment || hasPricing || hasSearch

  if (!hasFilters) return null

  const segmentLabel = segments.find((s) => s.id === activeSegment)?.label

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-bg-secondary/60 px-3 py-2.5">
      <span className="text-xs font-medium text-text-muted">Active filters</span>

      {hasSegment && segmentLabel && (
        <FilterChip label={segmentLabel} onRemove={onClearSegment} />
      )}
      {hasPricing && (
        <FilterChip label={pricingLabels[activePricing]} onRemove={onClearPricing} />
      )}
      {hasSearch && (
        <FilterChip label={`"${searchQuery.trim()}"`} onRemove={onClearSearch} />
      )}

      <button
        type="button"
        tabIndex={0}
        onClick={onClearAll}
        className="ml-auto cursor-pointer text-xs font-medium text-brand-primary transition-colors hover:text-brand-secondary"
        aria-label="Clear all filters"
      >
        Clear all
      </button>
    </div>
  )
}

interface FilterChipProps {
  label: string
  onRemove: () => void
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onRemove()
    }
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-bg-elevated px-2.5 py-1 text-xs font-medium text-text-primary ring-1 ring-border">
      {label}
      <button
        type="button"
        tabIndex={0}
        onClick={onRemove}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded text-text-muted transition-colors hover:text-text-primary"
        )}
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  )
}
