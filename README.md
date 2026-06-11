# Open Projects

An open source directory focused on **open source AI tooling** — curated frameworks, inference engines, and agents, plus live listings from Hugging Face and GitHub APIs.

## Stack

- Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the AI tools directory.  
Browse all segments at [/browse](http://localhost:3000/browse).

## Data Sources (APIs)

There is **no single API** that lists all open source AI tools. This project combines three sources:

| Source | API | What it provides | Auth |
|--------|-----|------------------|------|
| **Curated** | Static JSON in repo | Frameworks, agents, inference tools (Ollama, LangChain, vLLM…) | None |
| **Hugging Face** | `GET https://huggingface.co/api/models` | Open models (filtered by OSS license tags) | None |
| **Hugging Face** | `GET https://huggingface.co/api/spaces` | Demo apps and AI Spaces | None |
| **GitHub** | `GET https://api.github.com/search/repositories` | Trending OSS AI repos by topic | Optional `GITHUB_TOKEN` |

### Hugging Face examples

```bash
# Top downloaded text-generation models
curl "https://huggingface.co/api/models?filter=text-generation&sort=downloads&direction=-1&limit=10"

# Popular Spaces
curl "https://huggingface.co/api/spaces?sort=likes&direction=-1&limit=10"
```

Docs: [Hugging Face Hub API](https://huggingface.co/docs/hub/api)

### GitHub examples

```bash
# OSS LLM repos (set GITHUB_TOKEN for higher rate limits)
curl -H "Accept: application/vnd.github+json" \
  "https://api.github.com/search/repositories?q=topic:llm+stars:>500&sort=stars"
```

### Sync to static cache

```bash
npm run dev          # in one terminal
npm run sync:ai-tools  # in another — writes src/data/ai-tools-cache.json
```

## Commit Plan (short commits)

Use this order for small, reviewable commits:

| # | Commit message | Files |
|---|----------------|-------|
| 1 | `feat(types): add AI tool types and source categories` | `src/types/ai-tool.ts` |
| 2 | `feat(lib): add Hugging Face and GitHub API clients` | `src/lib/huggingface.ts`, `src/lib/github.ts` |
| 3 | `feat(data): add curated open-source AI tools catalog` | `src/data/open-source-ai-tools.ts` |
| 4 | `feat(api): add /api/ai-tools aggregation endpoint` | `src/lib/ai-tools.ts`, `src/app/api/ai-tools/route.ts` |
| 5 | `feat(ui): add AI tools directory with source filters` | `src/components/ai/*`, `src/app/page.tsx` |
| 6 | `feat(pages): move multi-segment browse to /browse` | `src/app/browse/page.tsx`, header nav |
| 7 | `chore(scripts): add AI tools sync script` | `scripts/sync-ai-tools.mjs`, `package.json` |
| 8 | `docs: document APIs and commit workflow` | `README.md` |

## Adding Curated Tools

Edit `src/data/open-source-ai-tools.ts`:

```ts
{
  id: "my-tool",
  name: "My Tool",
  description: "One-line description.",
  url: "https://github.com/org/repo",
  source: "curated",
  category: "framework", // framework | inference | agent | vector-db | ...
  tags: ["llm", "rag"],
  license: "MIT",
  featured: false,
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No | Increases GitHub API rate limit from 60 to 5,000 req/hr |
| `SYNC_BASE_URL` | No | Base URL for sync script (default: `http://localhost:3000`) |

## License

MIT
