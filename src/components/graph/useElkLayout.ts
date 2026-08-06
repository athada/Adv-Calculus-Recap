import ELK from 'elkjs/lib/elk.bundled.js';
import type { Edge, Node } from '@xyflow/react';
import { useEffect, useMemo, useState } from 'react';

import type { Topic, TopicEdge, TopicNodeData } from '@/types/curriculum';

const elk = new ELK();

const NODE_WIDTH = 250;
const NODE_HEIGHT = 120;

const ELK_OPTIONS = {
  'elk.algorithm': 'layered',
  'elk.direction': 'RIGHT',
  'elk.spacing.nodeNode': '80',
  'elk.layered.spacing.nodeNodeBetweenLayers': '120',
  'elk.layered.spacing.edgeNodeBetweenLayers': '64',
  'elk.layered.spacing.edgeEdgeBetweenLayers': '32',
  'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
  'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
  'elk.layered.thoroughness': '7',
  'elk.padding': '[top=48,left=48,bottom=48,right=48]',
};

function buildFlowEdges(edges: TopicEdge[], isDark: boolean): Edge[] {
  return edges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    pathOptions: { borderRadius: 16, offset: 20 },
    animated: false,
    style: { stroke: isDark ? '#94a3b8' : '#64748b', strokeWidth: 2 },
  }));
}

function buildNodeData(
  topic: Topic,
  contentAvailability: Readonly<Record<string, boolean>>,
): TopicNodeData {
  return {
    topicId: topic.id,
    title: topic.title,
    shortDescription: topic.shortDescription,
    kind: topic.kind,
    status: topic.status,
    hasContent: contentAvailability[topic.id] ?? false,
    stageNumber: topic.stageNumber,
    paradigm: topic.paradigm,
    paradigmLabel: topic.paradigmLabel,
  };
}

export function useElkLayout(
  topics: Topic[],
  edges: TopicEdge[],
  isDark: boolean,
  contentAvailability: Readonly<Record<string, boolean>>,
) {
  const [nodes, setNodes] = useState<Node<TopicNodeData>[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [isLayouting, setIsLayouting] = useState(true);

  const topicKey = useMemo(
    () => topics.map((t) => t.id).join(','),
    [topics],
  );

  const edgeKey = useMemo(
    () => edges.map((e) => `${e.source}-${e.target}`).join(','),
    [edges],
  );

  useEffect(() => {
    let cancelled = false;

    async function runLayout() {
      setIsLayouting(true);

      const elkGraph = {
        id: 'root',
        layoutOptions: ELK_OPTIONS,
        children: topics.map((topic) => ({
          id: topic.id,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        })),
        edges: edges.map((edge) => ({
          id: `${edge.source}-${edge.target}`,
          sources: [edge.source],
          targets: [edge.target],
        })),
      };

      try {
        const layout = await elk.layout(elkGraph);

        if (cancelled) return;

        const layoutedNodes: Node<TopicNodeData>[] = topics.map((topic) => {
          const layoutNode = layout.children?.find((child) => child.id === topic.id);

          return {
            id: topic.id,
            type: 'topicNode',
            position: {
              x: layoutNode?.x ?? 0,
              y: layoutNode?.y ?? 0,
            },
            data: buildNodeData(topic, contentAvailability),
          };
        });

        setNodes(layoutedNodes);
        setFlowEdges(buildFlowEdges(edges, isDark));
      } finally {
        if (!cancelled) setIsLayouting(false);
      }
    }

    void runLayout();

    return () => {
      cancelled = true;
    };
  }, [topicKey, edgeKey, topics, edges, isDark, contentAvailability]);

  return { nodes, edges: flowEdges, isLayouting };
}
