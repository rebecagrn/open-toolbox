"use client"

import { motion } from "framer-motion"
import { LayoutGrid } from "lucide-react"
import { SegmentIcon } from "@/components/platforms/segment-icon"
import { segments } from "@/data/segments"
import { platforms } from "@/data/platforms"
import { cn } from "@/lib/utils"
import type { SegmentId } from "@/types/platform"

interface SegmentFilterProps {
  activeSegment: SegmentId | "all"
  onSegmentChange: (segment: SegmentId | "all") => void
}

export function SegmentFilter({ activeSegment, onSegmentChange }: SegmentFilterProps) {
  const getCount = (segmentId: SegmentId | "all") => {
    if (segmentId === "all") return platforms.length
    return platforms.filter((p) => p.segments.includes(segmentId)).length
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    segment: SegmentId | "all"
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSegmentChange(segment)
    }
  }

  const filterItems: Array<{ id: SegmentId | "all"; label: string; color?: string }> = [
    { id: "all", label: "All" },
    ...segments.map((s) => ({ id: s.id, label: s.label, color: s.color })),
  ]

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      role="tablist"
      aria-label="Filter by segment"
    >
      {filterItems.map((item) => {
        const isActive = activeSegment === item.id
        const count = getCount(item.id)

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onClick={() => onSegmentChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
              isActive
                ? "text-white"
                : "bg-bg-elevated text-text-secondary ring-1 ring-border hover:text-text-primary hover:ring-border-hover"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="activeSegment"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {item.id === "all" ? (
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              ) : (
                <SegmentIcon segmentId={item.id} className="h-4 w-4" />
              )}
              {item.label}
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                  isActive ? "bg-white/20 text-white" : "bg-bg-secondary text-text-muted"
                )}
              >
                {count}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
