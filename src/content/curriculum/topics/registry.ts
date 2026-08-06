import type { TopicContentModule, TopicContentRegistry } from '@/types/concept-content';

import { setTheoryModule } from './sets_maps/module';

const modules: TopicContentModule[] = [setTheoryModule];

const moduleByTopicId = new Map<string, TopicContentModule>(
  modules.map((module) => [module.topicId, module]),
);

export const topicContentRegistry: TopicContentRegistry = {
  getModule(topicId: string) {
    return moduleByTopicId.get(topicId);
  },

  hasContent(topicId: string) {
    return moduleByTopicId.has(topicId);
  },

  getTopicIdsWithContent() {
    return modules.map((module) => module.topicId);
  },
};

export function getTopicUrl(topicId: string, subtopicId?: string): string {
  const module = moduleByTopicId.get(topicId);
  if (!module) {
    return `/topics/${topicId}`;
  }

  const resolvedSubtopic = subtopicId ?? module.defaultSubtopicId;
  return `/topics/${topicId}/${resolvedSubtopic}`;
}

export function getTopicAbsoluteUrl(topicId: string, subtopicId?: string): string {
  const path = getTopicUrl(topicId, subtopicId);
  return `${window.location.origin}/Adv-Calculus-Recap${path}`;
}
