"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Star } from "lucide-react"
import { PricingBadge } from "@/components/platforms/pricing-badge"
import { SegmentIcon } from "@/components/platforms/segment-icon"
import { segments } from "@/data/segments"
import { cn } from "@/lib/utils"
import type { Platform } from "@/types/platform"

interface PlatformCardProps {
  platform: Platform
  index: number
}

export function PlatformCard({ platform, index }: PlatformCardProps) {
  const primarySegment = segments.find((s) => s.id === platform.segments[0])

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      className="group relative"
    >
      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "gradient-border flex h-full flex-col rounded-2xl bg-bg-elevated p-5 shadow-sm transition-all duration-300",
          "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/5"
        )}
        aria-label={`Visit ${platform.name} — opens in new tab`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: primarySegment?.color ?? "#6366f1" }}
            >
              <SegmentIcon segmentId={platform.segments[0]} className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                  {platform.name}
                </h3>
                {platform.featured && (
                  <Star
                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    aria-label="Featured"
                  />
                )}
              </div>
              <PricingBadge pricing={platform.pricing} className="mt-1" />
            </div>
          </div>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:text-brand-primary"
            aria-hidden="true"
          />
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
          {platform.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {platform.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-bg-secondary px-2 py-0.5 text-[11px] font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </motion.article>
  )
}
