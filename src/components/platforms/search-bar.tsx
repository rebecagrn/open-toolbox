"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
  className?: string
  itemLabel?: string
}

export function SearchBar({
  value,
  onChange,
  resultCount,
  className,
  itemLabel = "platform",
}: SearchBarProps) {
  const handleClear = () => onChange("")

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleClear()
    }
  }

  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search platforms, tools, tags..."
        className="h-11 w-full rounded-xl border border-border bg-bg-elevated pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        aria-label="Search platforms"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          onKeyDown={handleKeyDown}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg-secondary hover:text-text-primary"
          aria-label="Clear search"
          tabIndex={0}
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
      <p className="mt-2 text-xs text-text-muted" aria-live="polite">
        {resultCount} {resultCount === 1 ? itemLabel : `${itemLabel}s`} found
      </p>
    </div>
  )
}
