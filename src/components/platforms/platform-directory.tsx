"use client"

import { useMemo, useState } from "react"
import { PlatformCard } from "@/components/platforms/platform-card"
import { SearchBar } from "@/components/platforms/search-bar"
import { SegmentFilter } from "@/components/platforms/segment-filter"
import { platforms } from "@/data/platforms"
import { segments } from "@/data/segments"
import type { SegmentId } from "@/types/platform"

export function PlatformDirectory() {
  const [activeSegment, setActiveSegment] = useState<SegmentId | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPlatforms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return platforms.filter((platform) => {
      const matchesSegment =
        activeSegment === "all" || platform.segments.includes(activeSegment)

      if (!matchesSegment) return false
      if (!query) return true

      const searchableText = [
        platform.name,
        platform.description,
        ...platform.tags,
        ...platform.segments,
      ]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [activeSegment, searchQuery])

  const activeSegmentData =
    activeSegment === "all"
      ? null
      : segments.find((s) => s.id === activeSegment)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          {activeSegmentData ? (
            <>
              <p className="mb-1 text-sm font-medium text-brand-primary">
                {activeSegmentData.label}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                {activeSegmentData.description}
              </h2>
            </>
          ) : (
            <>
              <p className="mb-1 text-sm font-medium text-brand-primary">All segments</p>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Browse every platform across all categories
              </h2>
            </>
          )}
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredPlatforms.length}
          className="w-full lg:max-w-sm"
        />
      </div>

      <SegmentFilter
        activeSegment={activeSegment}
        onSegmentChange={setActiveSegment}
      />

      {filteredPlatforms.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlatforms.map((platform, index) => (
            <PlatformCard key={platform.id} platform={platform} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium text-text-primary">No platforms found</p>
          <p className="mt-1 max-w-sm text-sm text-text-muted">
            Try a different search term or select another segment to explore more tools.
          </p>
        </div>
      )}
    </section>
  )
}
