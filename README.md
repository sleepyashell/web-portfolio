# Syuraih Umar Khotthob — Portfolio

Personal portfolio of a UI/UX designer who also builds. Designed in Figma, built by hand.

**Live:** _coming soon_

## Highlights

- Single page: hero, a "folder" of selected works, about, skills, and contact
- The selected-works folder opens with an animation, with project tabs and a carousel for each project
- Scales with the window, so the hero and the open folder each fit in one screen, from phones to wide monitors
- Keyboard and screen-reader friendly, and respects reduced-motion settings

## Tech

Next.js (App Router, static export) · TypeScript · Tailwind CSS · Framer Motion · Vitest + Testing Library

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit and component tests
npm run build   # static site in ./out
```

## Editing content

All text, projects, skills, and contact links live in [`src/data/content.ts`](src/data/content.ts).
Project mockups go in `public/images/projects/<project-id>/` as `1.webp`, `2.webp`, …

## Credits

Fonts: ZT Nature by Zelowtype, Instrument Serif (SIL Open Font License).
