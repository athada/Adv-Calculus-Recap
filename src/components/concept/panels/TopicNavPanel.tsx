import { NavLink } from 'react-router-dom';

import type { TopicContentModule } from '@/types/concept-content';

interface TopicNavPanelProps {
  module: TopicContentModule;
  activeSubtopicId: string;
  variant?: 'vertical' | 'horizontal';
}

export function TopicNavPanel({
  module,
  activeSubtopicId,
  variant = 'vertical',
}: TopicNavPanelProps) {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`flex h-full flex-col ${isHorizontal ? 'h-auto' : ''}`}>
      {!isHorizontal && (
        <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Topic
          </p>
          <h2 className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">
            {module.topicTitle}
          </h2>
        </div>
      )}

      <nav
        aria-label="Subtopics"
        className={`${isHorizontal ? 'p-2' : 'flex-1 overflow-y-auto p-3'}`}
      >
        {!isHorizontal && (
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Concepts
          </p>
        )}
        <ul
          className={
            isHorizontal
              ? 'flex gap-2 overflow-x-auto'
              : 'space-y-1'
          }
        >
          {module.getSubtopicIds().map((subtopicId) => {
            const subtopic = module.getSubtopic(subtopicId);
            if (!subtopic) return null;

            return (
              <li key={subtopicId}>
                <NavLink
                  to={`/topics/${module.topicId}/${subtopicId}`}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition ${
                      isActive || subtopicId === activeSubtopicId
                        ? 'bg-emerald-100 font-medium text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {subtopic.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
