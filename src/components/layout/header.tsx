import { ExternalLink, Layers } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-glass/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20">
            <Layers className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-text-primary">
              {siteConfig.name}
            </span>
            <span className="text-[11px] text-text-muted">{siteConfig.tagline}</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3" aria-label="Site navigation">
          <Link
            href="/ai"
            className="hidden h-9 cursor-pointer items-center rounded-lg px-3 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
          >
            Open source AI
          </Link>
          <a
            href={siteConfig.githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-border bg-bg-elevated px-3 text-sm font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
            aria-label="View OpenToolbox on GitHub"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
