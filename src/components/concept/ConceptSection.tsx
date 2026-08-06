import type { ReactNode } from 'react';

interface ConceptSectionProps {
  title: string;
  children: ReactNode;
}

export function ConceptSection({ title, children }: ConceptSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h2>
      <div className="text-base">{children}</div>
    </section>
  );
}
