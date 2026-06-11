"use client"

import { motion } from "framer-motion"
import { LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AiTool, AiToolSource } from "@/types/ai-tool"

const sourceOptions: Array<{ id: AiToolSource | "all"; label: string }> = [
  { id: "all", label: "All sources" },
  { id: "curated", label: "Curated tools" },
  { id: "huggingface-model", label: "HF Models" },
  { id: "huggingface-space", label: "HF Spaces" },
  { id: "github", label: "GitHub repos" },
  { id: "product-hunt", label: "Product Hunt" },
]

interface AiSourceFilterProps {
  tools: AiTool[]
  activeSource: AiToolSource | "all"
  onSourceChange: (source: AiToolSource | "all") => void
}

export function AiSourceFilter({ tools, activeSource, onSourceChange }: AiSourceFilterProps) {
  const getCount = (source: AiToolSource | "all") => {
    if (source === "all") return tools.length
    return tools.filter((t) => t.source === source).length
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    source: AiToolSource | "all"
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSourceChange(source)
    }
  }

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      role="tablist"
      aria-label="Filter by data source"
    >
      {sourceOptions.map((option) => {
        const isActive = activeSource === option.id
        const count = getCount(option.id)

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onClick={() => onSourceChange(option.id)}
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
                layoutId="activeAiSource"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {option.id === "all" && <LayoutGrid className="h-4 w-4" aria-hidden="true" />}
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
