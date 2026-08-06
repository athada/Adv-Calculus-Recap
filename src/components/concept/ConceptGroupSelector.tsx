import type { ConceptGroup } from '@/types/concept-content';

interface ConceptGroupSelectorProps {
  groups: ConceptGroup[];
  activeGroupId: string;
  onSelect: (groupId: string) => void;
}

export function ConceptGroupSelector({
  groups,
  activeGroupId,
  onSelect,
}: ConceptGroupSelectorProps) {
  return (
    <div
      className="flex flex-wrap gap-2 border-b border-slate-200 px-6 py-3 dark:border-slate-700"
      role="tablist"
      aria-label="Concept sections"
    >
      {groups.map((group) => (
        <button
          key={group.id}
          type="button"
          role="tab"
          aria-selected={activeGroupId === group.id}
          onClick={() => onSelect(group.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            activeGroupId === group.id
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          {group.title}
        </button>
      ))}
    </div>
  );
}
