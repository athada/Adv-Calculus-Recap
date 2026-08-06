import type { MathNotation } from '@/types/concept-content';

import { MathText } from './MathText';

interface NotationListProps {
  notations: MathNotation[];
}

export function NotationList({ notations }: NotationListProps) {
  return (
    <dl className="space-y-4">
      {notations.map((notation) => (
        <div
          key={notation.label}
          className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <dt className="mb-2 font-medium text-slate-900 dark:text-slate-100">
            {notation.label}
          </dt>
          <dd className="mb-2 overflow-x-auto">
            <MathText math={notation.symbol} block />
          </dd>
          <dd className="text-sm text-slate-600 dark:text-slate-400">
            {notation.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
