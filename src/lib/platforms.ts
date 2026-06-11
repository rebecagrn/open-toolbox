import { platforms } from "@/data/platforms"
import type { Platform, PricingModel, SegmentId } from "@/types/platform"

export interface PlatformFilterOptions {
  segment?: SegmentId | "all"
  pricing?: PricingModel | "all"
  query?: string
}

export const filterPlatforms = (
  items: Platform[] = platforms,
  options: PlatformFilterOptions
): Platform[] => {
  const query = options.query?.trim().toLowerCase()

  return items.filter((platform) => {
    const matchesSegment =
      !options.segment || options.segment === "all" || platform.segments.includes(options.segment)

    const matchesPricing =
      !options.pricing || options.pricing === "all" || platform.pricing === options.pricing

    if (!matchesSegment || !matchesPricing) return false
    if (!query) return true

    const searchableText = [
      platform.name,
      platform.description,
      platform.pricing,
      ...platform.tags,
      ...platform.segments,
    ]
      .join(" ")
      .toLowerCase()

    return searchableText.includes(query)
  })
}

export const countPlatformsBySegment = (
  items: Platform[],
  pricing: PricingModel | "all" = "all"
): Record<SegmentId | "all", number> => {
  const pool = filterPlatforms(items, { pricing })
  const counts = { all: pool.length } as Record<SegmentId | "all", number>

  for (const platform of pool) {
    for (const segment of platform.segments) {
      counts[segment] = (counts[segment] ?? 0) + 1
    }
  }

  return counts
}

export const countPlatformsByPricing = (
  items: Platform[],
  segment: SegmentId | "all" = "all"
): Record<PricingModel | "all", number> => {
  const pool = filterPlatforms(items, { segment })
  const counts: Record<PricingModel | "all", number> = {
    all: pool.length,
    free: 0,
    freemium: 0,
    paid: 0,
    "open-source": 0,
  }

  for (const platform of pool) {
    counts[platform.pricing] += 1
  }

  return counts
}
