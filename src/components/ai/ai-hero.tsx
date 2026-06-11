"use client"

import { motion } from "framer-motion"
import { Bot, Database, Sparkles } from "lucide-react"
import type { AiToolsResponse } from "@/types/ai-tool"

interface AiHeroProps {
  meta: AiToolsResponse["meta"]
}

export function AiHero({ meta }: AiHeroProps) {
  const total =
    meta.curated + meta.huggingfaceModels + meta.huggingfaceSpaces + meta.githubRepos

  return (
    <section className="hero-mesh relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/80 px-4 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
            Open source AI · Live from Hugging Face & GitHub APIs
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Discover{" "}
            <span className="gradient-text">open source AI tools</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Curated frameworks, inference engines, and agents — plus live listings
            from Hugging Face models, Spaces, and trending GitHub repos.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-text-primary">{total}</span>
              <span>Total listed</span>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <div className="flex flex-col items-center">
              <span className="inline-flex items-center gap-1 text-2xl font-bold text-text-primary">
                <Bot className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                {meta.curated}
              </span>
              <span>Curated tools</span>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <div className="flex flex-col items-center">
              <span className="inline-flex items-center gap-1 text-2xl font-bold text-text-primary">
                <Database className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                {meta.huggingfaceModels + meta.huggingfaceSpaces}
              </span>
              <span>From Hugging Face</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
