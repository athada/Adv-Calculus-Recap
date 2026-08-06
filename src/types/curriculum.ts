export type NodeKind = 'start' | 'topic' | 'end';
export type TopicStatus = 'available' | 'coming-soon';
export type Paradigm = 'coord_free' | 'coord_dep' | 'both';

export interface ParadigmView {
  overview: string;
  tools: string[];
}

export interface Topic {
  id: string;
  title: string;
  shortDescription: string;
  kind: NodeKind;
  status?: TopicStatus;
  stageNumber: number;
  stageTitle: string;
  order: number;
  paradigm: Paradigm;
  paradigmLabel: string;
  summary: string;
  keyEquations: string[];
  coordinateFree: ParadigmView;
  coordinateDependent: ParadigmView;
}

export interface TopicEdge {
  source: string;
  target: string;
}

export interface TopicNodeData extends Record<string, unknown> {
  topicId: string;
  title: string;
  shortDescription: string;
  kind: NodeKind;
  status?: TopicStatus;
  hasContent: boolean;
  stageNumber: number;
  paradigm: Paradigm;
  paradigmLabel: string;
}
