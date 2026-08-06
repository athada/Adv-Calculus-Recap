import { ConceptPageLayout } from '@/components/layout/ConceptPageLayout';
import type { SubtopicContent, TopicContentModule } from '@/types/concept-content';

interface ConceptPageViewProps {
  module: TopicContentModule;
  subtopic: SubtopicContent;
}

export function ConceptPageView({ module, subtopic }: ConceptPageViewProps) {
  const breadcrumbs = module.getBreadcrumbs(subtopic.id);
  const Diagram = module.getDiagramComponent(subtopic.id);

  return (
    <ConceptPageLayout
      module={module}
      subtopic={subtopic}
      breadcrumbs={breadcrumbs}
      Diagram={Diagram}
    />
  );
}
