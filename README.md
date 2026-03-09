# Alden Jay A. Centino - Ultra Premium Portfolio

Immersive full-stack developer portfolio built with Next.js App Router, TypeScript, Tailwind, shadcn/ui, and Framer Motion.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion animations
- next/image optimized thumbnails
- MDX case studies support

## Routes

- `/` Home experience
- `/projects` Project Explorer (grid, explorer rows, compact mode)
- `/projects/[slug]` Micro case study page
- `/showcase` Cinematic showcase mode
- `/contact`, `/about`, `/case-studies`
- `/api/screenshot` Optional screenshot helper endpoint

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Data Model

Main data file:

- `lib/projects.ts`

Project type:

```ts
{
  slug: string;
  title: string;
  url: string;
  category: Category;
  tags: string[];
  featured: boolean;
  year: number;
  description: string;
  goal: string;
  solution: string;
  highlights: string[];
  thumbnails: {
    desktop: string;
    tablet?: string;
    mobile?: string;
  };
  industryNotes: string;
}
```

Category definitions:

- `lib/categories.ts`

## Thumbnails

All project previews are local files under:

- `public/thumbnails/`

Per-project device files:

- `{slug}-desktop.jpg`
- `{slug}-tablet.jpg`
- `{slug}-mobile.jpg`

Fallback asset:

- `public/thumbnails/fallback-showcase.svg`

## Add a New Project

1. Add a new entry in `lib/projects.ts`.
2. Add `desktop/tablet/mobile` thumbnail files to `public/thumbnails`.
3. Mark `featured: true` if it should appear in launch reel/showcase rotation.
4. Run checks:

```bash
npm run lint
npm run build
```

## Showcase + Explorer Features

- Project Explorer with search, sort, category filters, sticky controls
- Browse modes: `Grid`, `Explorer`, `Compact` (persisted in URL query)
- Device morph previews on card hover (desktop/tablet/mobile cycle)
- Launch Reel autoplay montage (pause + manual selection)
- Cinematic Showcase Mode with keyboard + swipe + auto-tour
- Command palette (`Ctrl/Cmd + K`) for fast navigation

## Contact Form Provider Switch

By default, contact submissions log to server console.

Configure `.env.local` to enable email sending:

```bash
CONTACT_PROVIDER=console
CONTACT_TO_EMAIL=ajcentz28@gmail.com
CONTACT_FROM_EMAIL=portfolio@example.com

RESEND_API_KEY=

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

