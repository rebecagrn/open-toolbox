"use client"

import { motion } from "framer-motion"
import { CircleDollarSign } from "lucide-react"
import { platforms } from "@/data/platforms"
import { countPlatformsByPricing } from "@/lib/platforms"
import { cn } from "@/lib/utils"
import type { PricingModel, SegmentId } from "@/types/platform"

const pricingOptions: Array<{ id: PricingModel | "all"; label: string }> = [
  { id: "all", label: "All pricing" },
  { id: "open-source", label: "Open source" },
  { id: "free", label: "Free" },
  { id: "freemium", label: "Freemium" },
  { id: "paid", label: "Paid" },
]

interface PricingFilterProps {
  activePricing: PricingModel | "all"
  activeSegment: SegmentId | "all"
  onPricingChange: (pricing: PricingModel | "all") => void
}

export function PricingFilter({
  activePricing,
  activeSegment,
  onPricingChange,
}: PricingFilterProps) {
  const counts = countPlatformsByPricing(platforms, activeSegment)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    pricing: PricingModel | "all"
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onPricingChange(pricing)
    }
  }

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      role="tablist"
      aria-label="Filter by pricing"
    >
      {pricingOptions.map((option) => {
        const isActive = activePricing === option.id
        const count = counts[option.id]

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onClick={() => onPricingChange(option.id)}
            onKeyDown={(e) => handleKeyDown(e, option.id)}
            className={cn(
              "relative flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
              isActive
                ? "text-white"
                : "bg-bg-elevated text-text-secondary ring-1 ring-border hover:text-text-primary hover:ring-border-hover"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="activePricing"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {option.id === "all" && <CircleDollarSign className="h-4 w-4" aria-hidden="true" />}
              {option.label}
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
