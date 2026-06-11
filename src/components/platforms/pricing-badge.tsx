import { cn } from "@/lib/utils"
import type { PricingModel } from "@/types/platform"

const pricingLabels: Record<PricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "open-source": "Open Source",
}

const pricingStyles: Record<PricingModel, string> = {
  free: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  freemium: "bg-blue-500/10 text-blue-700 ring-blue-500/20",
  paid: "bg-amber-500/10 text-amber-700 ring-amber-500/20",
  "open-source": "bg-violet-500/10 text-violet-700 ring-violet-500/20",
}

interface PricingBadgeProps {
  pricing: PricingModel
  className?: string
}

export function PricingBadge({ pricing, className }: PricingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        pricingStyles[pricing],
        className
      )}
    >
      {pricingLabels[pricing]}
    </span>
  )
}
