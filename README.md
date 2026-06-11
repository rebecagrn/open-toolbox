# Open Projects

A community-driven, open source directory for discovering **platforms, tools, and sites** across creative segments — with a primary focus on **open source AI tooling**.

Browse curated frameworks, inference engines, and agents, plus live listings from Hugging Face and GitHub APIs. Filter by source, category, or search — all in one place.

## Features

- **Open source AI directory** — home page with 40+ curated tools and live API data
- **Multi-segment browse** — design, programming, sounds, visual, video, and more at `/browse`
- **Source filters** — Curated · Hugging Face Models · Hugging Face Spaces · GitHub repos
- **Category filters** — framework, inference, agent, vector-db, training, and more
- **Search** — filter by name, description, tags, or license
- **Public API** — `GET /api/ai-tools` returns aggregated JSON (revalidated hourly)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) |
| Language | TypeScript |

## Prerequisites

- **Node.js** 20.x or later
- **npm** 10+ (or pnpm / yarn)

## Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/open-projects-ai.git
cd open-projects-ai

# Install dependencies
npm install

# (Optional) Copy env template and add a GitHub token for higher API rate limits
cp .env.example .env.local
```

## Development

```bash
# Start the dev server
npm run dev
```

| URL | Description |
|-----|-------------|
| [http://localhost:3000](http://localhost:3000) | Open source AI tools directory |
| [http://localhost:3000/browse](http://localhost:3000/browse) | All segments (design, video, etc.) |
| [http://localhost:3000/api/ai-tools](http://localhost:3000/api/ai-tools) | JSON API endpoint |

### Other scripts

```bash
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run sync:ai-tools  # Cache live API data to JSON (requires dev server running)
```

## Project Structure

```
open-projects-ai/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── page.tsx            # Home — AI tools directory
│   │   ├── browse/             # Multi-segment platform browser
│   │   └── api/ai-tools/       # Aggregation API endpoint
│   ├── components/
│   │   ├── ai/                 # AI directory UI (cards, filters, hero)
│   │   ├── platforms/          # Segment browser UI
│   │   └── layout/             # Header, footer
│   ├── data/
│   │   ├── open-source-ai-tools.ts  # Curated AI tools (contributions welcome)
│   │   ├── platforms.ts        # Multi-segment platform list
│   │   └── segments.ts         # Segment definitions
│   ├── lib/
│   │   ├── ai-tools.ts         # Aggregation & filter logic
│   │   ├── huggingface.ts      # Hugging Face Hub API client
│   │   └── github.ts           # GitHub Search API client
│   └── types/                  # Shared TypeScript types
├── scripts/
│   └── sync-ai-tools.mjs       # Offline cache sync script
└── CONTRIBUTING.md             # Contribution guide
```

## How It Works

There is no single API that lists all open source AI tools. This project combines three sources:

| Source | API | What it provides | Auth |
|--------|-----|------------------|------|
| **Curated** | Static data in repo | Frameworks, agents, inference tools | None |
| **Hugging Face** | `GET /api/models` · `/api/spaces` | OSS models and demo apps | None |
| **GitHub** | `GET /search/repositories` | Trending OSS AI repos | Optional token |

Live data is fetched at build/request time and cached for **1 hour** via Next.js `revalidate`.

### Environment variables

Create `.env.local` for optional configuration:

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No | GitHub PAT — raises rate limit from 60 to 5,000 req/hr |
| `SYNC_BASE_URL` | No | Base URL for sync script (default: `http://localhost:3000`) |

See `.env.example` for a template.

## Contributing

Contributions are welcome! Whether you want to add a tool, fix a description, improve the UI, or extend the API — we'd love your help.

Read **[CONTRIBUTING.md](./CONTRIBUTING.md)** for:

- How to add curated AI tools and platforms
- Development workflow and commit conventions
- Pull request guidelines
- Project roadmap ideas

## Roadmap

- [ ] Segment detail pages (`/segments/design`, etc.)
- [ ] Contributor submission form
- [ ] Dark mode
- [ ] Offline cache fallback when APIs are unavailable
- [ ] Expand curated catalog across all segments

## License

This project is licensed under the [MIT License](./LICENSE).

---

Built with care by the open source community. Star the repo if you find it useful!
