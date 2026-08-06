# Architecture

## Layers

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Types | `src/types/` | `Topic`, `SubtopicContent`, `TopicContentModule` |
| Graph data | `src/content/curriculum/` | Graph metadata, edges |
| Topic content | `src/content/curriculum/topics/<slug>/` | Modules, subtopics, diagrams |
| Registry | `topics/registry.ts` | Maps topic id → content module |
| Pages | `src/pages/` | Route handlers only |
| Components | `src/components/concept/` | Generic concept page UI |

## SOLID patterns

- **Open/Closed**: New topics via new `BaseTopicModule` subclass — no changes to `ConceptPageView`
- **Single Responsibility**: Data in `subtopics/`, visuals in `diagrams/`, routing in pages, layout in components
- **Dependency Inversion**: Pages depend on `TopicContentModule` interface, not concrete set theory code

## Import rules

- `subtopics/*.ts` import only from `@/types/concept-content`
- `diagrams/*.tsx` are self-contained SVG components
- `module.ts` wires subtopics + diagrams, extends `BaseTopicModule`
- Components never import topic-specific content directly

## Data flow

```
subtopics/index.ts ──┐
diagrams/*.tsx    ───┼── module.ts ── registry.ts ── TopicConceptPage ── ConceptPageView
topic.ts (graph)  ───┘
```
