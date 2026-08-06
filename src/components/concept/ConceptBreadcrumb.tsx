import { Link } from 'react-router-dom';

import type { BreadcrumbSegment } from '@/types/concept-content';

interface ConceptBreadcrumbProps {
  segments: BreadcrumbSegment[];
}

export function ConceptBreadcrumb({ segments }: ConceptBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-slate-500 dark:text-slate-400">
        <li>
          <Link
            to="/"
            className="transition hover:text-slate-900 dark:hover:text-slate-100"
          >
            Home
          </Link>
        </li>
        {segments.map((segment, index) => (
          <li key={segment.path} className="flex items-center gap-1">
            <span aria-hidden="true">→</span>
            {index === segments.length - 1 ? (
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {segment.label}
              </span>
            ) : (
              <Link
                to={segment.path}
                className="transition hover:text-slate-900 dark:hover:text-slate-100"
              >
                {segment.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
