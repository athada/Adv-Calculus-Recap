import { useMemo, useState } from 'react';

import {
  DIAGRAM_BTN,
  DIAGRAM_BTN_ACTIVE,
  DIAGRAM_BTN_IDLE,
  DIAGRAM_FRAME,
  DIAGRAM_HINT,
  DIAGRAM_SVG,
} from '@/components/concept/diagramStyles';
import { MathText } from '@/components/concept/MathText';
import type { InteractiveDiagramProps } from '@/types/concept-content';

const ELEMENTS = [
  { id: '1', inA: true, inB: false, x: 95, y: 100 },
  { id: '2', inA: true, inB: true, x: 175, y: 130 },
  { id: '3', inA: true, inB: true, x: 165, y: 175 },
  { id: '4', inA: false, inB: true, x: 285, y: 120 },
  { id: '5', inA: false, inB: true, x: 275, y: 185 },
] as const;

type Op = 'union' | 'intersection' | 'difference';

const GROUP_MATH: Record<string, string> = {
  membership: 'x \\in A,\\; x \\notin A,\\; A = B \\iff \\forall x\\,(x \\in A \\leftrightarrow x \\in B)',
  subset: 'A \\subseteq B \\iff \\forall x\\,(x \\in A \\Rightarrow x \\in B)',
  operations: 'A \\cup B,\\; A \\cap B,\\; A \\setminus B',
};

export function InteractiveSetsDiagram({
  className,
  activeGroupId,
  onGroupFocus,
}: InteractiveDiagramProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [operation, setOperation] = useState<Op>('union');

  const highlighted = useMemo(() => {
    const set = new Set<string>();
    for (const el of ELEMENTS) {
      if (activeGroupId === 'membership' && selectedElement === el.id) set.add(el.id);
      if (activeGroupId === 'subset' && el.inA) set.add(el.id);
      if (activeGroupId === 'operations') {
        if (operation === 'union' && (el.inA || el.inB)) set.add(el.id);
        if (operation === 'intersection' && el.inA && el.inB) set.add(el.id);
        if (operation === 'difference' && el.inA && !el.inB) set.add(el.id);
      }
    }
    return set;
  }, [activeGroupId, selectedElement, operation]);

  const info = useMemo(() => {
    if (activeGroupId === 'membership' && selectedElement) {
      const el = ELEMENTS.find((e) => e.id === selectedElement);
      if (!el) return 'Click an element.';
      if (el.inA && el.inB) return `${el.id} \\in A \\cap B`;
      if (el.inA) return `${el.id} \\in A,\\; ${el.id} \\notin B`;
      return `${el.id} \\in B,\\; ${el.id} \\notin A`;
    }
    if (activeGroupId === 'subset') return 'A \\subseteq B';
    if (activeGroupId === 'operations') {
      const m = { union: 'A \\cup B', intersection: 'A \\cap B', difference: 'A \\setminus B' };
      return m[operation];
    }
    return 'A = \\{1,2,3\\},\\; B = \\{2,3,4\\}';
  }, [activeGroupId, selectedElement, operation]);

  const gid = activeGroupId ?? 'membership';

  return (
    <div className={`${DIAGRAM_FRAME} ${className ?? ''}`}>
      <div className="mb-1.5 flex flex-wrap gap-1">
        {(['membership', 'subset', 'operations'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              onGroupFocus(id);
              setSelectedElement(null);
            }}
            className={gid === id ? DIAGRAM_BTN_ACTIVE : DIAGRAM_BTN_IDLE}
          >
            {id === 'membership' ? '∈' : id === 'subset' ? '⊆' : 'Ops'}
          </button>
        ))}
        {gid === 'operations' &&
          (['union', 'intersection', 'difference'] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => setOperation(op)}
              className={
                operation === op
                  ? `${DIAGRAM_BTN} bg-violet-600 text-white`
                  : `${DIAGRAM_BTN} bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300`
              }
            >
              {op === 'union' ? '∪' : op === 'intersection' ? '∩' : '\\'}
            </button>
          ))}
      </div>

      <svg
        viewBox="0 0 380 240"
        className={DIAGRAM_SVG}
        role="img"
        aria-label="Interactive Venn diagram"
      >
        <circle cx="150" cy="130" r="85" fill="rgb(16 185 129 / 0.12)" stroke="rgb(16 185 129)" strokeWidth="2" />
        <circle cx="230" cy="130" r="85" fill="rgb(59 130 246 / 0.12)" stroke="rgb(59 130 246)" strokeWidth="2" />
        <text x="95" y="45" fill="currentColor" fontSize="14" fontWeight="600">A</text>
        <text x="265" y="45" fill="currentColor" fontSize="14" fontWeight="600">B</text>
        {ELEMENTS.map((el) => {
          const isOn = highlighted.has(el.id);
          return (
            <g
              key={el.id}
              onClick={(e) => {
                e.stopPropagation();
                onGroupFocus('membership');
                setSelectedElement(el.id);
              }}
              className="cursor-pointer"
            >
              <circle
                cx={el.x}
                cy={el.y}
                r="14"
                fill={isOn ? 'rgb(245 158 11 / 0.5)' : 'rgb(148 163 184 / 0.2)'}
                stroke={isOn ? 'rgb(245 158 11)' : 'rgb(148 163 184)'}
                strokeWidth={isOn ? 2 : 1.5}
              />
              <text x={el.x} y={el.y + 4} textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
                {el.id}
              </text>
            </g>
          );
        })}
      </svg>

      <div className={DIAGRAM_HINT}>
        <MathText math={GROUP_MATH[gid] ?? GROUP_MATH.membership} />
        <div className="mt-1 overflow-x-auto">
          <MathText math={info} />
        </div>
      </div>
    </div>
  );
}
