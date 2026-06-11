"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Download, GitBranch, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AiTool, AiToolSource } from "@/types/ai-tool"

const sourceLabels: Record<AiToolSource, string> = {
  curated: "Curated",
  "huggingface-model": "HF Model",
  "huggingface-space": "HF Space",
  github: "GitHub",
}

const sourceStyles: Record<AiToolSource, string> = {
  curated: "bg-violet-500/10 text-violet-700 ring-violet-500/20",
  "huggingface-model": "bg-yellow-500/10 text-yellow-700 ring-yellow-500/20",
  "huggingface-space": "bg-orange-500/10 text-orange-700 ring-orange-500/20",
  github: "bg-slate-500/10 text-slate-700 ring-slate-500/20",
}

interface AiToolCardProps {
  tool: AiTool
  index: number
}

export function AiToolCard({ tool, index }: AiToolCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.25) }}
      className="group relative"
    >
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "gradient-border flex h-full flex-col rounded-2xl bg-bg-elevated p-5 shadow-sm transition-all duration-300",
          "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/5"
        )}
        aria-label={`Visit ${tool.name} — opens in new tab`}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-semibold text-text-primary transition-colors group-hover:text-brand-primary">
                {tool.name}
              </h3>
              {tool.featured && (
                <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-label="Featured" />
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
                  sourceStyles[tool.source]
                )}
              >
                {sourceLabels[tool.source]}
              </span>
              <span className="inline-flex items-center rounded-md bg-bg-secondary px-2 py-0.5 text-[11px] font-medium text-text-muted">
                {tool.category}
              </span>
            </div>
          </div>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:text-brand-primary"
            aria-hidden="true"
          />
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-2">
          {tool.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-text-muted">
          {tool.stars !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3" aria-hidden="true" />
              {tool.stars.toLocaleString()}
            </span>
          )}
          {tool.downloads !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Download className="h-3 w-3" aria-hidden="true" />
              {tool.downloads.toLocaleString()}
            </span>
          )}
          {tool.likes !== undefined && tool.stars === undefined && (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3" aria-hidden="true" />
              {tool.likes.toLocaleString()}
            </span>
          )}
          {tool.license && (
            <span className="inline-flex items-center gap-1">
              <GitBranch className="h-3 w-3" aria-hidden="true" />
              {tool.license}
            </span>
          )}
        </div>

        {tool.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tool.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-bg-secondary px-2 py-0.5 text-[11px] font-medium text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </motion.article>
  )
}
