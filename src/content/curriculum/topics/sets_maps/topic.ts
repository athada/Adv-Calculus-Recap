import type { Topic } from '@/types/curriculum';
import { getRoadmapNode } from '@/content/curriculum/roadmap';

const node = getRoadmapNode('sets_maps')!;

export const topic: Pick<Topic, 'id' | 'title' | 'shortDescription' | 'kind' | 'status'> = {
  id: node.id,
  title: node.title,
  shortDescription: node.summary,
  kind: 'start',
  status: 'available',
};
