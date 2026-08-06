import { Handle, Position, type NodeProps } from '@xyflow/react';

import type { Paradigm, TopicNodeData } from '@/types/curriculum';

const kindStyles = {
  start: {
    border: 'border-emerald-500 dark:border-emerald-400',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    badgeLabel: 'Start',
  },
  topic: {
    border: 'border-slate-300 dark:border-slate-600',
    badge: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    badgeLabel: 'Topic',
  },
  end: {
    border: 'border-amber-500 dark:border-amber-400',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    badgeLabel: 'Goal',
  },
} as const;

const paradigmStyles: Record<
  Paradigm,
  { badge: string; short: string }
> = {
  coord_free: {
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    short: 'Coord-free',
  },
  coord_dep: {
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    short: 'Coord-dep',
  },
  both: {
    badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
    short: 'Dual',
  },
};

export function TopicNode({ data }: NodeProps) {
  const nodeData = data as TopicNodeData;
  const styles = kindStyles[nodeData.kind];
  const paradigm = paradigmStyles[nodeData.paradigm];
  const isClickable = nodeData.hasContent;

  return (
    <div
      className={`w-56 rounded-lg border-2 bg-white px-3 py-2 shadow-sm dark:bg-slate-800 ${styles.border} ${
        isClickable
          ? 'cursor-pointer transition hover:shadow-md hover:ring-2 hover:ring-emerald-400/50'
          : ''
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-400" />
      <div className="mb-1 flex flex-wrap items-center gap-1">
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}
        >
          S{nodeData.stageNumber}
        </span>
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${paradigm.badge}`}
          title={nodeData.paradigmLabel}
        >
          {paradigm.short}
        </span>
        {nodeData.hasContent ? (
          <span className="ml-auto text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            Open
          </span>
        ) : (
          <span className="ml-auto text-[10px] font-medium text-slate-400 dark:text-slate-500">
            Soon
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold leading-tight text-slate-900 dark:text-slate-100">
        {nodeData.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-500 dark:text-slate-400">
        {nodeData.shortDescription}
      </p>
      <Handle type="source" position={Position.Right} className="!bg-slate-400" />
    </div>
  );
}
