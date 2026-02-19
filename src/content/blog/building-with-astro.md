---
title: "Building a Portfolio with Astro & Tailwind"
description: "Lessons learned from rebuilding my personal site — from content collections and view transitions to achieving a perfect Lighthouse score."
publishDate: 2026-02-05
tags: [Web Development, Astro, Tailwind CSS]
---

Rebuilding a personal website is a rite of passage for web developers. This time around, I chose **Astro** and **Tailwind CSS** — and the experience has been remarkably smooth. Here's what I learned.

## Content Collections Are a Game-Changer

Astro's Content Collections let you define a typed schema for your Markdown frontmatter. This means:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

If I misspell a field or forget a required property, I get a **build-time error** instead of a silent runtime bug. Coming from Jekyll, where frontmatter was essentially untyped YAML, this is a massive improvement.

## The Islands Architecture

One of Astro's killer features is the ability to embed interactive components (React, Vue, Svelte) as "islands" in otherwise static HTML. My site uses this sparingly:

- **ArcadeCard** — a React component with Framer Motion for 3D tilt effects and iFrame embedding.
- **ViewCard** — another React island for the Gallery's tilt-on-hover effect.
- **Search** — a React-powered Pagefind search overlay.

Everything else is server-rendered Astro components with zero client-side JavaScript.

## Tailwind CSS v4

Tailwind v4 introduced the new `@import "tailwindcss"` syntax and a CSS-first configuration approach. Gone is the `tailwind.config.js` file — everything is handled via `@theme` blocks in your CSS. It took a moment to adjust, but the result is cleaner and faster.

## Performance Results

After the rebuild, the Lighthouse scores speak for themselves:

| Category       | Score |
|---------------|-------|
| Performance    | 98    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

The key was shipping **zero JavaScript** on most pages and lazy-loading the interactive islands only when needed.

## What's Next

I'm planning to integrate:
- **Pagefind** for full-text search across my blog and papers.
- **View Transitions** for seamless page-to-page animations.
- **Dark/Light mode toggle** because some people apparently prefer bright screens.

If you're thinking about rebuilding your own site, I can't recommend Astro highly enough. It hits the sweet spot between developer experience and end-user performance.
