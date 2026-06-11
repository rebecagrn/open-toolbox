"use client"

import { motion } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"
import { platforms } from "@/data/platforms"
import { segments } from "@/data/segments"

export function Hero() {
  const featuredCount = platforms.filter((p) => p.featured).length

  return (
    <section className="hero-mesh relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/80 px-4 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
            Open source directory · {platforms.length}+ tools · {segments.length} segments
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Discover the best{" "}
            <span className="gradient-text">platforms & tools</span>{" "}
            for every creative segment
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            A curated, community-driven list of design, programming, audio, video,
            AI, and productivity tools — filter by segment and find what you need fast.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-text-primary">{platforms.length}</span>
              <span>Platforms</span>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-text-primary">{segments.length}</span>
              <span>Segments</span>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-text-primary">{featuredCount}</span>
              <span>Featured</span>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-12 flex justify-center"
          >
            <ArrowDown className="h-5 w-5 text-text-muted" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
