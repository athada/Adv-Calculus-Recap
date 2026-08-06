import { useEffect, useMemo, useState } from 'react';

import { ConceptGroupReading } from '@/components/concept/ConceptGroupReading';
import { ConceptGroupSelector } from '@/components/concept/ConceptGroupSelector';
import { MathParagraph } from '@/components/concept/MathText';
import type {
  InteractiveDiagramComponent,
  SubtopicContent,
} from '@/types/concept-content';

interface ConceptDetailPanelProps {
  subtopic: SubtopicContent;
  Diagram: InteractiveDiagramComponent | null;
}

export function ConceptDetailPanel({ subtopic, Diagram }: ConceptDetailPanelProps) {
  const [activeGroupId, setActiveGroupId] = useState<string>(
    subtopic.groups[0]?.id ?? '',
  );

  useEffect(() => {
    setActiveGroupId(subtopic.groups[0]?.id ?? '');
  }, [subtopic.id, subtopic.groups]);

  const activeGroup = useMemo(
    () => subtopic.groups.find((g) => g.id === activeGroupId) ?? subtopic.groups[0],
    [subtopic.groups, activeGroupId],
  );

  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {subtopic.title}
        </h1>
        <MathParagraph text={subtopic.overview} className="mt-2 !text-sm" />
      </header>

      <ConceptGroupSelector
        groups={subtopic.groups}
        activeGroupId={activeGroupId}
        onSelect={setActiveGroupId}
      />

      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        {activeGroup && (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {Diagram && (
              <aside className="lg:sticky lg:top-0">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Interactive — explore while you read →
                </p>
                <Diagram
                  activeGroupId={activeGroupId}
                  onGroupFocus={setActiveGroupId}
                />
              </aside>
            )}
            <ConceptGroupReading group={activeGroup} />
          </div>
        )}

        <section className="mt-8 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-4 dark:border-emerald-700 dark:bg-emerald-950/20">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Why this matters for advanced calculus
          </h3>
          <MathParagraph text={subtopic.calculusBridge} className="mt-2 !text-sm" />
        </section>
      </div>
    </div>
  );
}
