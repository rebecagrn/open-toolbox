#!/usr/bin/env node

/**
 * Fetches AI tools from Hugging Face + GitHub and writes a static cache.
 * Run: node scripts/sync-ai-tools.mjs
 * Optional: GITHUB_TOKEN=ghp_xxx node scripts/sync-ai-tools.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, "../src/data/ai-tools-cache.json")
const BASE_URL = process.env.SYNC_BASE_URL ?? "http://localhost:3000"

const main = async () => {
  console.log(`Fetching from ${BASE_URL}/api/ai-tools ...`)

  const response = await fetch(`${BASE_URL}/api/ai-tools`)

  if (!response.ok) {
    throw new Error(`Sync failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  mkdirSync(dirname(OUTPUT), { recursive: true })
  writeFileSync(OUTPUT, JSON.stringify(data, null, 2))

  console.log(`Wrote ${data.tools.length} tools to ${OUTPUT}`)
  console.log(`  Curated: ${data.meta.curated}`)
  console.log(`  HF Models: ${data.meta.huggingfaceModels}`)
  console.log(`  HF Spaces: ${data.meta.huggingfaceSpaces}`)
  console.log(`  GitHub: ${data.meta.githubRepos}`)
  console.log(`  Product Hunt: ${data.meta.productHunt}`)
  if (data.meta.providers) {
    console.log("  Provider status:", data.meta.providers)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
