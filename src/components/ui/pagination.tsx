"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPageNumbers } from "@/lib/pagination"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  startIndex: number
  endIndex: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalItems === 0) return null

  const pageNumbers = getPageNumbers(currentPage, totalPages)
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  const handlePageClick = (page: number) => {
    if (page === currentPage) return
    onPageChange(page)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      action()
    }
  }

  return (
    <nav
      className={cn("flex flex-col items-center gap-4 sm:flex-row sm:justify-between", className)}
      aria-label="Pagination"
    >
      <p className="text-sm text-text-muted">
        Showing <span className="font-medium text-text-primary">{startIndex}</span>
        {" – "}
        <span className="font-medium text-text-primary">{endIndex}</span>
        {" of "}
        <span className="font-medium text-text-primary">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          tabIndex={0}
          onClick={() => onPageChange(currentPage - 1)}
          onKeyDown={(e) => handleKeyDown(e, () => onPageChange(currentPage - 1))}
          disabled={!canGoPrevious}
          className={cn(
            "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-bg-elevated text-text-secondary transition-colors",
            "hover:border-border-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1 px-1">
          {pageNumbers.map((page, index) => {
            const previousPage = pageNumbers[index - 1]
            const showEllipsis = previousPage !== undefined && page - previousPage > 1

            return (
              <span key={page} className="flex items-center gap-1">
                {showEllipsis && (
                  <span className="px-1 text-sm text-text-muted" aria-hidden="true">
                    …
                  </span>
                )}
                <button
                  type="button"
                  tabIndex={0}
                  onClick={() => handlePageClick(page)}
                  onKeyDown={(e) => handleKeyDown(e, () => handlePageClick(page))}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors",
                    page === currentPage
                      ? "bg-brand-primary text-white shadow-sm"
                      : "border border-border bg-bg-elevated text-text-secondary hover:border-border-hover hover:text-text-primary"
                  )}
                >
                  {page}
                </button>
              </span>
            )
          })}
        </div>

        <button
          type="button"
          tabIndex={0}
          onClick={() => onPageChange(currentPage + 1)}
          onKeyDown={(e) => handleKeyDown(e, () => onPageChange(currentPage + 1))}
          disabled={!canGoNext}
          className={cn(
            "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-bg-elevated text-text-secondary transition-colors",
            "hover:border-border-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}
