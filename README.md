# Open Projects

An open source directory of platforms, tools, and sites organized by creative segment. Browse, search, and filter across design, programming, sounds, visual, video, AI, and more.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **Lucide React**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Segments

| Segment | Description |
|---------|-------------|
| Design | UI/UX, prototyping, visual design |
| Programming | IDEs, frameworks, dev utilities |
| Sounds | Audio production and music |
| Visual | Illustration, 3D, photography |
| Video | Editing, motion, streaming |
| Writing | Docs, notes, content |
| Productivity | Tasks, collaboration |
| AI | LLMs and generative tools |
| DevOps | Hosting, CI/CD, infrastructure |
| Learning | Courses and tutorials |
| Marketing | SEO, email, social |
| Analytics | Metrics and insights |

## Adding Platforms

Edit `src/data/platforms.ts` and add a new entry:

```ts
{
  id: "my-tool",
  name: "My Tool",
  description: "What it does in one sentence.",
  url: "https://example.com",
  segments: ["design"],
  tags: ["ui", "prototyping"],
  pricing: "freemium", // free | freemium | paid | open-source
  featured: false,     // optional
}
```

## Contributing

Contributions are welcome! Add new platforms, fix descriptions, or suggest new segments via pull request.

## License

MIT
