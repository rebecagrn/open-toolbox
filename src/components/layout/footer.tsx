import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-footer text-text-footer">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="flex items-center gap-1.5 text-sm text-text-footer-muted">
          Built with
          <Heart className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
          as an open source project
        </p>
        <p className="text-sm text-text-footer-muted">
          Contribute on{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-footer underline-offset-4 transition-colors hover:text-brand-primary hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
