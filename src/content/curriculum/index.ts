import type { NodeKind, Topic, TopicEdge } from '@/types/curriculum';

import {
  buildEdgesFromRoadmap,
  getRoadmapNode,
  roadmapNodes,
  type RoadmapNode,
} from './roadmap';

/** Topic ids that have detail-page content modules registered */
const TOPICS_WITH_CONTENT = new Set(['sets_maps']);

function resolveKind(node: RoadmapNode): NodeKind {
  if (node.parents.length === 0) return 'start';
  if (node.id === 'riemannian_geometry') return 'end';
  return 'topic';
}

function roadmapNodeToTopic(node: RoadmapNode): Topic {
  return {
    id: node.id,
    title: node.title,
    shortDescription: node.summary,
    kind: resolveKind(node),
    status: TOPICS_WITH_CONTENT.has(node.id) ? 'available' : 'coming-soon',
    stageNumber: node.stage_number,
    stageTitle: node.stage_title,
    order: node.order,
    paradigm: node.paradigm,
    paradigmLabel: node.paradigm_label,
    summary: node.summary,
    keyEquations: node.key_equations,
    coordinateFree: node.coordinate_free,
    coordinateDependent: node.coordinate_dependent,
  };
}

export const topics: Topic[] = roadmapNodes
  .map(roadmapNodeToTopic)
  .sort((a, b) => a.order - b.order);

export const edges: TopicEdge[] = buildEdgesFromRoadmap(roadmapNodes);

function validateCurriculum(topicsList: Topic[], edgesList: TopicEdge[]): void {
  const ids = new Set(topicsList.map((t) => t.id));

  if (ids.size !== topicsList.length) {
    throw new Error('Duplicate topic ids found in curriculum.');
  }

  const startTopics = topicsList.filter((t) => t.kind === 'start');
  const endTopics = topicsList.filter((t) => t.kind === 'end');

  if (startTopics.length !== 1) {
    throw new Error(`Expected exactly 1 start topic, found ${startTopics.length}.`);
  }

  if (endTopics.length < 1) {
    throw new Error('Expected at least 1 end topic.');
  }

  for (const edge of edgesList) {
    if (!ids.has(edge.source)) {
      throw new Error(`Edge source "${edge.source}" does not match any topic id.`);
    }
    if (!ids.has(edge.target)) {
      throw new Error(`Edge target "${edge.target}" does not match any topic id.`);
    }
  }
}

validateCurriculum(topics, edges);

export { getRoadmapNode, roadmapNodes };
