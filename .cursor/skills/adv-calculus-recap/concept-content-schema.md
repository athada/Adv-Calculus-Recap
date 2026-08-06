# Concept Content Schema

## SubtopicContent

```typescript
interface SubtopicContent {
  id: string;
  title: string;
  overview: string;
  groups: ConceptGroup[];
  calculusBridge: string;   // overall advanced-calculus connection
}
```

## ConceptGroup (related ideas bundled together)

```typescript
interface ConceptGroup {
  id: string;               // matches diagram focus region
  title: string;
  notations: MathNotation[];
  definition: string;
  explanation: string;
  relevance: string;        // why it matters
  implications: string;
  calculusLink: string;     // per-group advanced calculus link
  example?: RealWorldExample;
}
```

Use `$...$` in text fields for inline LaTeX within prose.

## Interactive diagrams

```typescript
interface InteractiveDiagramProps {
  activeGroupId: string | null;
  onGroupFocus: (groupId: string) => void;
}
```

One diagram per subtopic covers all groups — syncs with concept cards via `activeGroupId`.

## Concept page layout (two panels)

| Panel | Component | Content |
|-------|-----------|---------|
| Left | `TopicNavPanel` | Topic + subtopic list |
| Right | `ConceptDetailPanel` | Sticky interactive diagram + structured `ConceptGroupCard`s + calculus bridge |

## BaseTopicModule (extend for each topic)

Register interactive diagram components keyed by subtopic id in `module.ts`.
