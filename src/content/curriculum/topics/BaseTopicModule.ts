import type {
  BreadcrumbSegment,
  InteractiveDiagramComponent,
  SubtopicContent,
  TopicContentModule,
} from '@/types/concept-content';

export abstract class BaseTopicModule implements TopicContentModule {
  abstract readonly topicId: string;
  abstract readonly topicTitle: string;
  abstract readonly defaultSubtopicId: string;
  abstract readonly subtopics: Record<string, SubtopicContent>;

  protected abstract readonly diagramComponents: Record<
    string,
    InteractiveDiagramComponent
  >;

  getSubtopic(subtopicId: string): SubtopicContent | undefined {
    return this.subtopics[subtopicId];
  }

  getSubtopicIds(): string[] {
    return Object.keys(this.subtopics);
  }

  getBreadcrumbs(subtopicId: string): BreadcrumbSegment[] {
    const subtopic = this.getSubtopic(subtopicId);
    const segments: BreadcrumbSegment[] = [
      {
        label: this.topicTitle,
        path: `/topics/${this.topicId}/${this.defaultSubtopicId}`,
      },
    ];

    if (subtopic && subtopicId !== this.defaultSubtopicId) {
      segments.push({
        label: subtopic.title,
        path: `/topics/${this.topicId}/${subtopicId}`,
      });
    }

    return segments;
  }

  getDiagramComponent(subtopicId: string): InteractiveDiagramComponent | null {
    return this.diagramComponents[subtopicId] ?? null;
  }
}
