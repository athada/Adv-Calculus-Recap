import { MathParagraph, MathText } from '@/components/concept/MathText';
import type { ConceptGroup } from '@/types/concept-content';

interface ConceptGroupReadingProps {
  group: ConceptGroup;
}

export function ConceptGroupReading({ group }: ConceptGroupReadingProps) {
  return (
    <article className="min-w-0 flex-1 space-y-4">
      <header>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {group.title}
        </h2>
      </header>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
          Notation & definition
        </h3>
        <div className="space-y-2">
          {group.notations.map((n) => (
            <div
              key={n.label}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/60"
            >
              <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                {n.label}
              </p>
              <MathText math={n.symbol} block />
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {n.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-2 dark:border-violet-900 dark:bg-violet-950/20">
          <MathParagraph text={group.definition} />
        </div>
      </section>

      <section>
        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          What it means
        </h3>
        <MathParagraph text={group.explanation} />
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <section className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-800 dark:bg-amber-950/30">
          <h3 className="mb-1 text-xs font-semibold uppercase text-amber-700 dark:text-amber-400">
            Why it matters
          </h3>
          <MathParagraph text={group.relevance} className="!text-sm" />
        </section>
        <section className="rounded-lg border border-blue-200 bg-blue-50/80 p-3 dark:border-blue-800 dark:bg-blue-950/30">
          <h3 className="mb-1 text-xs font-semibold uppercase text-blue-700 dark:text-blue-400">
            Implications
          </h3>
          <MathParagraph text={group.implications} className="!text-sm" />
        </section>
      </div>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
        <h3 className="mb-1 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400">
          Link to advanced calculus
        </h3>
        <MathParagraph text={group.calculusLink} className="!text-sm" />
      </section>

      {group.example && (
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-800/50">
          <h3 className="mb-1 text-xs font-semibold uppercase text-slate-500">
            Real-world example
          </h3>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {group.example.title}
          </p>
          <MathParagraph text={group.example.description} className="!mt-1 !text-sm" />
        </section>
      )}
    </article>
  );
}
