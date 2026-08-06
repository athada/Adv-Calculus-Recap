import type { ComponentType } from 'react';

export interface MathNotation {
  symbol: string;
  label: string;
  description: string;
}

export interface BreadcrumbSegment {
  label: string;
  path: string;
}

export interface RealWorldExample {
  title: string;
  description: string;
}

/** One cohesive bundle of related math + context + calculus link, tied to a diagram region */
export interface ConceptGroup {
  id: string;
  title: string;
  notations: MathNotation[];
  definition: string;
  explanation: string;
  relevance: string;
  implications: string;
  calculusLink: string;
  example?: RealWorldExample;
}

export interface SubtopicContent {
  id: string;
  title: string;
  overview: string;
  groups: ConceptGroup[];
  calculusBridge: string;
}

export interface InteractiveDiagramProps {
  className?: string;
  activeGroupId: string | null;
  onGroupFocus: (groupId: string) => void;
}

export type InteractiveDiagramComponent = ComponentType<InteractiveDiagramProps>;

export interface TopicContentModule {
  readonly topicId: string;
  readonly topicTitle: string;
  readonly defaultSubtopicId: string;
  readonly subtopics: Record<string, SubtopicContent>;

  getSubtopic(subtopicId: string): SubtopicContent | undefined;
  getSubtopicIds(): string[];
  getBreadcrumbs(subtopicId: string): BreadcrumbSegment[];
  getDiagramComponent(subtopicId: string): InteractiveDiagramComponent | null;
}

export interface TopicContentRegistry {
  getModule(topicId: string): TopicContentModule | undefined;
  hasContent(topicId: string): boolean;
  getTopicIdsWithContent(): string[];
}
