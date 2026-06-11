# Open Projects

A community-driven directory for discovering **platforms, tools, and sites** across creative segments — plus a dedicated **AI tools catalog** with live API aggregation.

## Routes

| URL | Description |
|-----|-------------|
| [http://localhost:3000](http://localhost:3000) | All segments — filter by category & pricing |
| [http://localhost:3000/ai](http://localhost:3000/ai) | AI tools — curated + Hugging Face + GitHub + Product Hunt |
| [http://localhost:3000/api/ai-tools](http://localhost:3000/api/ai-tools) | JSON API (revalidated hourly) |

## Features

### Home (`/`)
- **12 segments** — design, programming, AI, video, sounds, etc.
- **Pricing filters** — open source, free, freemium, paid
- Sticky filter bar, active filter chips, search, pagination

### AI directory (`/ai`)
- **Curated** open source AI tools (Ollama, LangChain, vLLM…)
- **Hugging Face** models & Spaces (live API)
- **GitHub** trending OSS AI repos (live API)
- **Product Hunt** AI launches (optional `PRODUCTHUNT_TOKEN`)
- Filter by source, pricing, category, search

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/open-projects-ai.git
cd open-projects-ai
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No | GitHub Search rate limit boost |
| `PRODUCTHUNT_TOKEN` | No | Product Hunt GraphQL API |
| `SYNC_BASE_URL` | No | Sync script base URL |

## Data architecture

There is no single API for all AI tools. This project uses a **provider registry** pattern:

| Layer | Sources |
|-------|---------|
| **Open source (live)** | Hugging Face Hub, GitHub Search |
| **Commercial / launches** | Product Hunt GraphQL |
| **Curated (static)** | `src/data/open-source-ai-tools.ts`, `src/data/platforms.ts` |
| **Planned** | TAAFT, Futurepedia, Toolify (no public APIs — manual import) |

Full documentation: **[docs/DATA_SOURCES.md](./docs/DATA_SOURCES.md)**

### Sync to local cache

```bash
npm run dev              # terminal 1
npm run sync:ai-tools    # terminal 2 → src/data/ai-tools-cache.json
```

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide React

## Project structure

```
src/
├── app/
│   ├── page.tsx          # Home — all segments
│   ├── ai/page.tsx       # AI tools directory
│   └── api/ai-tools/     # Aggregation endpoint
├── components/
│   ├── platforms/        # Segment + pricing filters
│   └── ai/               # AI-specific UI
├── data/                 # Curated static catalogs
├── lib/
│   ├── ai-providers/     # Provider registry
│   ├── huggingface.ts
│   ├── github.ts
│   └── product-hunt.ts
└── types/
```

## Contributing

See **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

## License

MIT
