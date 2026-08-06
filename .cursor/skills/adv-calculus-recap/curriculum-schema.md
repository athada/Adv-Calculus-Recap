# Curriculum Schema

## Roadmap (single source of truth)

Graph metadata lives in [`roadmap.ts`](../../content/curriculum/roadmap.ts). Each node includes:

- `stage_number`, `stage_title` — curriculum stage (1–7)
- `paradigm` — `coord_free` | `coord_dep` | `both`
- `coordinate_free` / `coordinate_dependent` — dual classification views
- `parents` — prerequisite topic ids (edges derived automatically)
- `key_equations`, `summary`

## Topic (graph node)

Derived from roadmap via `index.ts`. Includes paradigm and stage fields for graph display.

## Concept content (detail pages)

Folder `topics/<id>/` with `module.ts` extending `BaseTopicModule` when content is ready.
Register in `registry.ts` and add id to `TOPICS_WITH_CONTENT` in `index.ts`.

## Current topics (12 nodes)

| id | Stage | Paradigm |
|----|-------|----------|
| sets_maps | 1 | coord_free |
| real_analysis | 2 | both |
| metric_spaces | 2 | coord_free |
| lin_alg | 3 | both |
| dual_spaces | 3 | both |
| multilin_tensors | 3 | coord_dep |
| multi_calc | 4 | both |
| general_topology | 5 | coord_free |
| diff_topology | 5 | coord_free |
| diff_forms | 6 | coord_free |
| smooth_manifolds | 7 | both |
| riemannian_geometry | 7 | both |

Content available: `sets_maps` only.
