"use client"

import { useMemo, useRef, useState } from "react"
import { ActiveFilters } from "@/components/platforms/active-filters"
import { PlatformCard } from "@/components/platforms/platform-card"
import { PricingFilter } from "@/components/platforms/pricing-filter"
import { SearchBar } from "@/components/platforms/search-bar"
import { SegmentFilter } from "@/components/platforms/segment-filter"
import { Pagination } from "@/components/ui/pagination"
import { segments } from "@/data/segments"
import { filterPlatforms } from "@/lib/platforms"
import { paginate } from "@/lib/pagination"
import type { PricingModel, SegmentId } from "@/types/platform"

export function PlatformDirectory() {
  const [activeSegment, setActiveSegment] = useState<SegmentId | "all">("all")
  const [activePricing, setActivePricing] = useState<PricingModel | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredPlatforms = useMemo(
    () =>
      filterPlatforms(undefined, {
        segment: activeSegment,
        pricing: activePricing,
        query: searchQuery,
      }),
    [activeSegment, activePricing, searchQuery]
  )

  const pagination = useMemo(
    () => paginate(filteredPlatforms, currentPage),
    [filteredPlatforms, currentPage]
  )

  const handleSegmentChange = (segment: SegmentId | "all") => {
    setActiveSegment(segment)
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

  const handleClearAll = () => {
    setActiveSegment("all")
    setActivePricing("all")
    setSearchQuery("")
    setCurrentPage(1)
  }

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
              <p className="mb-1 text-sm font-medium text-brand-primary">Explore & filter</p>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Find platforms by segment and pricing
              </h2>
            </>
          )}
          <p className="mt-2 text-sm text-text-muted">
            Filter across design, programming, AI, video, and more — open source, free, freemium, or paid.
          </p>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          resultCount={filteredPlatforms.length}
          className="w-full lg:max-w-sm"
        />
      </div>

      <div className="sticky top-16 z-40 -mx-4 space-y-3 border-b border-border bg-bg-primary/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Segment
          </p>
          <SegmentFilter
            activeSegment={activeSegment}
            activePricing={activePricing}
            onSegmentChange={handleSegmentChange}
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Pricing
          </p>
          <PricingFilter
            activePricing={activePricing}
            activeSegment={activeSegment}
            onPricingChange={handlePricingChange}
          />
        </div>
        <ActiveFilters
          activeSegment={activeSegment}
          activePricing={activePricing}
          searchQuery={searchQuery}
          onClearSegment={() => handleSegmentChange("all")}
          onClearPricing={() => handlePricingChange("all")}
          onClearSearch={() => handleSearchChange("")}
          onClearAll={handleClearAll}
        />
      </div>

      {filteredPlatforms.length > 0 ? (
        <>
          <div
            ref={gridRef}
            className="mt-8 scroll-mt-36 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pagination.items.map((platform, index) => (
              <PlatformCard key={platform.id} platform={platform} index={index} />
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
          <p className="text-lg font-medium text-text-primary">No platforms found</p>
          <p className="mt-1 max-w-sm text-sm text-text-muted">
            Try adjusting your segment, pricing, or search filters.
          </p>
          <button
            type="button"
            tabIndex={0}
            onClick={handleClearAll}
            className="mt-4 cursor-pointer rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-secondary"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  )
}
