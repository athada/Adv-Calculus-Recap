import { Link, Navigate, useParams } from 'react-router-dom';

import { ConceptPageView } from '@/components/concept/ConceptPageView';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { topicContentRegistry } from '@/content/curriculum/topics/registry';

export function TopicConceptPage() {
  const { topicSlug, subtopicSlug } = useParams<{
    topicSlug: string;
    subtopicSlug?: string;
  }>();

  if (!topicSlug) {
    return <Navigate to="/" replace />;
  }

  const module = topicContentRegistry.getModule(topicSlug);

  if (!module) {
    return <TopicComingSoon topicSlug={topicSlug} />;
  }

  const resolvedSubtopicId = subtopicSlug ?? module.defaultSubtopicId;
  const subtopic = module.getSubtopic(resolvedSubtopicId);

  if (!subtopic) {
    return <Navigate to={`/topics/${topicSlug}/${module.defaultSubtopicId}`} replace />;
  }

  if (!subtopicSlug) {
    return <Navigate to={`/topics/${topicSlug}/${module.defaultSubtopicId}`} replace />;
  }

  return <ConceptPageView module={module} subtopic={subtopic} />;
}

function TopicComingSoon({ topicSlug }: { topicSlug: string }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <header className="flex justify-end border-b border-slate-200 px-4 py-4 dark:border-slate-700">
        <ThemeToggle />
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold capitalize text-slate-900 dark:text-slate-100">
          {topicSlug.replace(/-/g, ' ')}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Content for this topic is coming soon.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Back to curriculum graph
        </Link>
      </div>
    </div>
  );
}
