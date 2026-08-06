import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type NodeMouseHandler,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo } from 'react';

import { edges, topics } from '@/content/curriculum';
import {
  getTopicAbsoluteUrl,
  topicContentRegistry,
} from '@/content/curriculum/topics/registry';
import { useTheme } from '@/context/ThemeContext';
import type { TopicNodeData } from '@/types/curriculum';
import { TopicNode } from './TopicNode';
import { useElkLayout } from './useElkLayout';

const nodeTypes: NodeTypes = {
  topicNode: TopicNode,
};

function FitViewAfterLayout({ ready }: { ready: boolean }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (ready) {
      void fitView({ padding: 0.18, duration: 250 });
    }
  }, [ready, fitView]);

  return null;
}

function CurriculumGraphInner() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const contentAvailability = useMemo(
    () =>
      Object.fromEntries(
        topics.map((topic) => [
          topic.id,
          topicContentRegistry.hasContent(topic.id),
        ]),
      ),
    [],
  );

  const { nodes, edges: flowEdges, isLayouting } = useElkLayout(
    topics,
    edges,
    isDark,
    contentAvailability,
  );

  const handleNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    const data = node.data as TopicNodeData;
    if (!topicContentRegistry.hasContent(data.topicId)) {
      return;
    }
    window.open(getTopicAbsoluteUrl(data.topicId), '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="h-[min(80vh,720px)] w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
      {isLayouting ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
          Laying out curriculum…
        </div>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          minZoom={0.15}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
        >
          <FitViewAfterLayout ready={!isLayouting && nodes.length > 0} />
          <Background color={isDark ? '#334155' : '#cbd5e1'} gap={20} />
          <Controls showInteractive={false} />
          <MiniMap
            nodeColor={(node) => {
              const kind = node.data?.kind as string | undefined;
              if (kind === 'start') return '#10b981';
              if (kind === 'end') return '#f59e0b';
              return isDark ? '#64748b' : '#94a3b8';
            }}
            maskColor={
              isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.8)'
            }
          />
        </ReactFlow>
      )}
    </div>
  );
}

export function CurriculumGraph() {
  return (
    <ReactFlowProvider>
      <CurriculumGraphInner />
    </ReactFlowProvider>
  );
}
