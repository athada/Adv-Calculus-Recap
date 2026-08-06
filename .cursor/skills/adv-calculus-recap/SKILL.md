---
name: adv-calculus-recap
description: >-
  Develop the Advanced Calculus Recap GitHub Pages site — React curriculum graph,
  folder-per-topic concept pages, subtopics with math notation, and deployment.
  Use when adding topics, subtopics, concept content, diagrams, or editing the graph.
---

# Advanced Calculus Recap — Development Skill

## Project overview

React + TypeScript site on GitHub Pages. Landing page: branching curriculum graph (Set Theory → Riemannian Geometry). Topic detail pages use a **module pattern** — each topic extends `BaseTopicModule` with subtopics, KaTeX notation, and optional React diagrams.

## Directory map

```
src/content/curriculum/
├── roadmap.ts                 # Single source of truth (12 nodes, stages, paradigms)
├── index.ts                   # Builds topics + edges from roadmap
├── topics/
│   ├── BaseTopicModule.ts
│   ├── registry.ts
│   └── sets_maps/             # Detail content (when ready)
│       ├── module.ts
│       ├── subtopics/
│       └── diagrams/
```

## Add graph topic

Add a node to [`roadmap.ts`](src/content/curriculum/roadmap.ts) with `parents`, `paradigm`, and stage fields. Edges are derived automatically.

## Add topic content (detail pages)

1. Create `subtopics/index.ts` with `SubtopicContent` entries
2. Create `diagrams/*.tsx` for visual explanations (optional per subtopic)
3. Create `module.ts` extending `BaseTopicModule`
4. Register module in `topics/registry.ts`
5. Add id to `TOPICS_WITH_CONTENT` in `index.ts`

## Add a subtopic to existing topic

1. Add entry to `topics/<slug>/subtopics/index.ts`
2. Add diagram component if needed
3. Register diagram in `module.ts` → `diagramComponents`
4. No router or UI changes needed

## Remove a topic

1. Delete folder, remove from `index.ts`, `edges.ts`, and `registry.ts`

## Concept page layout (two panels)

| Panel | Component | Content |
|-------|-----------|---------|
| Left | `TopicNavPanel` | Topic title + subtopic list |
| Right | `ConceptDetailPanel` | Interactive diagram + grouped concept cards + calculus bridge |

Each subtopic uses **ConceptGroup** bundles (notation, definition, relevance, implications, calculus link, example) synced to one interactive diagram.

## Breadcrumbs

Format: `Home → Set Theory → Maps`. Built by `BaseTopicModule.getBreadcrumbs()`. Extends automatically as subtopics are added.

## Graph click behavior

Nodes with registered content open `/topics/<slug>/<defaultSubtopic>` in a new tab.

## Deployment

- Vite base: `/Adv-Calculus-Recap/`
- GitHub Actions on push to `main`

## Tech stack

Vite, React, TypeScript, Tailwind, `@xyflow/react`, `elkjs`, `react-router-dom`, `katex`

## Additional resources

- [architecture.md](architecture.md)
- [curriculum-schema.md](curriculum-schema.md)
- [concept-content-schema.md](concept-content-schema.md)
