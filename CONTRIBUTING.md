# Contributing to Open Projects

Thank you for considering a contribution! This project is community-driven — every tool added, description fixed, or UI improvement helps others discover the right platforms faster.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Adding an Open Source AI Tool](#adding-an-open-source-ai-tool)
- [Adding a Platform (Other Segments)](#adding-a-platform-other-segments)
- [Adding a New Segment](#adding-a-new-segment)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Commit Message Format](#commit-message-format)
- [Project Conventions](#project-conventions)

## Code of Conduct

Be respectful, constructive, and inclusive. We welcome contributors of all experience levels. Harassment, spam, or low-quality promotional entries will not be accepted.

## Ways to Contribute

You don't need to write code to help:

| Contribution | How |
|--------------|-----|
| **Add a tool** | Edit `src/data/open-source-ai-tools.ts` and open a PR |
| **Add a platform** | Edit `src/data/platforms.ts` for non-AI segments |
| **Fix a description** | Update the relevant entry in `src/data/` |
| **Report a broken link** | Open an issue or fix the `url` field directly |
| **Improve UI/UX** | Submit a PR with component changes |
| **Extend API clients** | Improve `src/lib/huggingface.ts` or `src/lib/github.ts` |
| **Documentation** | Update `README.md` or this file |

## Development Setup

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/open-projects-ai.git
   cd open-projects-ai
   ```

3. **Install** dependencies:

   ```bash
   npm install
   ```

4. **(Optional)** Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Add GITHUB_TOKEN if you work on GitHub API integration
   ```

5. **Start** the dev server:

   ```bash
   npm run dev
   ```

6. **Verify** your changes:

   ```bash
   npm run lint
   npm run build
   ```

## Adding an Open Source AI Tool

Edit `src/data/open-source-ai-tools.ts` and append an entry to the `curatedAiTools` array.

### Entry requirements

- Must be **open source** (or have a meaningful open source core)
- Must have a **valid, working URL** (prefer GitHub repo or official site)
- `id` must be unique and kebab-case
- `description` should be one clear sentence

### Example

```ts
{
  id: "my-tool",
  name: "My Tool",
  description: "Short description of what the tool does.",
  url: "https://github.com/org/my-tool",
  source: "curated",
  category: "framework",
  tags: ["llm", "rag"],
  license: "MIT",
  featured: false,
}
```

### Valid categories

`framework` · `inference` · `agent` · `vector-db` · `training` · `evaluation` · `ui` · `model` · `space` · `library`

Set `featured: true` only for widely adopted, high-quality tools. Maintainers may adjust this during review.

## Adding a Platform (Other Segments)

For design, programming, video, and other non-AI segments, edit `src/data/platforms.ts`.

```ts
{
  id: "my-platform",
  name: "My Platform",
  description: "One-line description.",
  url: "https://example.com",
  segments: ["design"],
  tags: ["ui", "prototyping"],
  pricing: "freemium", // free | freemium | paid | open-source
  featured: false,
}
```

Valid segment IDs are defined in `src/types/platform.ts` (`design`, `programming`, `sounds`, `visual`, `video`, `writing`, `productivity`, `ai`, `devops`, `learning`, `marketing`, `analytics`).

## Adding a New Segment

1. Add the segment ID to `SEGMENT_IDS` in `src/types/platform.ts`
2. Add the segment metadata to `src/data/segments.ts` (label, description, icon, color)
3. Add an icon mapping in `src/components/platforms/segment-icon.tsx`
4. Tag relevant platforms in `src/data/platforms.ts`

Open a single PR with all four changes.

## Pull Request Guidelines

1. **One concern per PR** — e.g. "add 5 AI tools" or "fix search filter", not both
2. **Keep PRs small** — easier to review and merge
3. **Test locally** — run `npm run lint` and `npm run build` before submitting
4. **Describe your changes** — what you added and why
5. **No proprietary or paid-only tools** in the curated open source AI list
6. **No affiliate links** or promotional spam

### PR title format

Use the same convention as commits:

```
feat(data): add Ollama alternatives to curated AI tools
fix(ui): correct search result count label
docs: update installation steps in README
```

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>
```

| Type | When to use |
|------|-------------|
| `feat` | New feature or data entry batch |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code change that neither fixes nor adds |
| `chore` | Tooling, scripts, config |

Examples:

```
feat(data): add curated open-source AI tools catalog
feat(ui): add AI tools directory with source filters
fix(api): handle Hugging Face API timeout gracefully
docs: document APIs and commit workflow
```

- Use **imperative mood** ("add" not "added")
- Do **not** end the subject line with a period
- Keep the subject under 72 characters when possible

## Project Conventions

### Code style

- **TypeScript** — strict types, avoid `any`
- **Components** — functional components with explicit prop interfaces
- **Styling** — Tailwind CSS utility classes only
- **File naming** — kebab-case for files and directories
- **Event handlers** — prefix with `handle` (e.g. `handleClick`)
- **Client components** — add `"use client"` only when needed (state, events, animations)

### File placement

| What | Where |
|------|-------|
| AI tool data | `src/data/open-source-ai-tools.ts` |
| Platform data | `src/data/platforms.ts` |
| AI types | `src/types/ai-tool.ts` |
| Platform types | `src/types/platform.ts` |
| API clients | `src/lib/` |
| AI UI | `src/components/ai/` |
| Platform UI | `src/components/platforms/` |

### Branch naming

```
feat/add-rag-tools
fix/github-rate-limit
docs/contributing-guide
```

## Questions?

Open a [GitHub Issue](https://github.com/YOUR_USERNAME/open-projects-ai/issues) for bugs, feature requests, or questions. For quick data additions, a PR is often faster than an issue.

Thank you for helping build the open source tools directory!
