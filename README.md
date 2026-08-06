# Advanced Calculus Recap

A step-by-step revision site for advanced mathematics — from **Set Theory & Mappings** to **Riemannian Geometry**.

## Live site

**https://athada.github.io/Adv-Calculus-Recap/**

### One-time GitHub Pages setup

1. Open **Settings → Pages** on the repo.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `gh-pages` and folder to **`/ (root)`**, then save.

Each push to `main` runs the deploy workflow, which builds the site and pushes the output to the `gh-pages` branch.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/Adv-Calculus-Recap/](http://localhost:5173/Adv-Calculus-Recap/) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/content/curriculum/
├── roadmap.ts              # Single source of truth (12 nodes, stages, paradigms)
├── index.ts                # Builds graph from roadmap
└── topics/sets_maps/       # Detail content modules (when ready)
```

## Curriculum roadmap

12 topics across **7 stages**, each tagged with a paradigm:

| Paradigm | Meaning |
|----------|---------|
| **Coord-free** | Invariant / geometric view |
| **Coord-dep** | Components / indices |
| **Dual** | Both integrated |

Each node also stores `coordinate_free` and `coordinate_dependent` views with overview + tools.

## Topic content pages

Click **Set Theory & Mappings** (`sets_maps`) on the graph to open detail content.

Route example: `/topics/sets_maps/maps`

## Adding a topic

Add a node to [`src/content/curriculum/roadmap.ts`](src/content/curriculum/roadmap.ts). Edges are derived from `parents[]`.

See [`.cursor/skills/adv-calculus-recap/SKILL.md`](.cursor/skills/adv-calculus-recap/SKILL.md) for full agent guidance.

## Tech stack

Vite, React, TypeScript, React Flow, elkjs, Tailwind CSS, KaTeX, GitHub Actions
