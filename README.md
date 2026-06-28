# Frontend Interview Prep

A Next.js app with curated frontend interview questions across HTML, CSS, JavaScript, TypeScript, React, React Native, Vue, Next.js, and Coding. Track your progress locally in the browser.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand (persisted progress)
- Space Grotesk via `next/font`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the home route redirects to `/html`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run validate-data` | Validate topic/question data integrity |

## Project Structure

```
app/                  Next.js routes and layouts
  (app)/[topic]/      One page per topic (SSG)
components/           UI components
data/                 Topic content (one file per topic)
lib/                  Shared config and metadata helpers
scripts/              Maintenance scripts
store/                Zustand progress store
types/                Shared TypeScript types
```

## Adding Content

1. Create or edit a topic file in `data/` (e.g. `data/html.ts`).
2. Export a `Topic` object with `slug`, `title`, `description`, `color`, and `questions`.
3. Register the topic in `data/index.ts` and `data/getTopic.ts`.
4. Run `npm run validate-data` to verify IDs, slugs, and coding answer format.

### Question ID convention

Use `{slug}-{NN}` (e.g. `react-01`, `react-native-12`).

### Coding answers

Coding topic answers must contain a blank line (`\n\n`) separating the explanation from the code block.

## Environment

Optional:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Used for sitemap, canonical URLs, and Open Graph metadata. Defaults to `https://frontend.hi-shanto.me`.

## Features

- Per-topic routes with static generation
- Search and difficulty filters
- Mark questions as known (persisted in localStorage)
- Export / import progress as JSON
- Light / dark theme toggle
- Deep links to questions via `?q=question-id` (e.g. `/react?q=react-03`)
- Keyboard shortcut: press `/` to focus search

## Deploy

Build and start:

```bash
npm run validate-data
npm run typecheck
npm run lint
npm run build
npm run start
```

Deploy to any platform that supports Next.js (e.g. Vercel).
