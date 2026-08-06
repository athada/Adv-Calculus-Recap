import { ConceptBreadcrumb } from '@/components/concept/ConceptBreadcrumb';
import { ConceptDetailPanel } from '@/components/concept/panels/ConceptDetailPanel';
import { TopicNavPanel } from '@/components/concept/panels/TopicNavPanel';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import type {
  BreadcrumbSegment,
  InteractiveDiagramComponent,
  SubtopicContent,
  TopicContentModule,
} from '@/types/concept-content';

interface ConceptPageLayoutProps {
  module: TopicContentModule;
  subtopic: SubtopicContent;
  breadcrumbs: BreadcrumbSegment[];
  Diagram: InteractiveDiagramComponent | null;
}

export function ConceptPageLayout({
  module,
  subtopic,
  breadcrumbs,
  Diagram,
}: ConceptPageLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-slate-100 dark:bg-slate-950">
      <header className="shrink-0 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <ConceptBreadcrumb segments={breadcrumbs} />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[240px_1fr]">
        <aside className="shrink-0 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 lg:border-b-0 lg:border-r">
          <div className="lg:hidden">
            <TopicNavPanel
              module={module}
              activeSubtopicId={subtopic.id}
              variant="horizontal"
            />
          </div>
          <div className="hidden h-full lg:block">
            <TopicNavPanel module={module} activeSubtopicId={subtopic.id} />
          </div>
        </aside>

        <main className="min-h-0 min-w-0 bg-white dark:bg-slate-900">
          <ConceptDetailPanel subtopic={subtopic} Diagram={Diagram} />
        </main>
      </div>
    </div>
  );
}
