import { useMemo, useState } from 'react';

import {
  DIAGRAM_BTN_ACTIVE,
  DIAGRAM_BTN_IDLE,
  DIAGRAM_FRAME,
  DIAGRAM_HINT,
  DIAGRAM_SVG,
} from '@/components/concept/diagramStyles';
import { MathText } from '@/components/concept/MathText';
import type { InteractiveDiagramProps } from '@/types/concept-content';

const LEFT = [
  { id: 'a1', label: 'a₁', y: 60 },
  { id: 'a2', label: 'a₂', y: 120 },
  { id: 'a3', label: 'a₃', y: 180 },
];

const RIGHT = [
  { id: 'b1', label: 'b₁', y: 50 },
  { id: 'b2', label: 'b₂', y: 110 },
  { id: 'b3', label: 'b₃', y: 170 },
  { id: 'b4', label: 'b₄', y: 210 },
];

const INITIAL_PAIRS = new Set(['a1-b1', 'a1-b2', 'a2-b2', 'a3-b3', 'a3-b4']);

const GROUP_MATH: Record<string, string> = {
  'cartesian-product': 'A \\times B = \\{(a,b) : a \\in A,\\, b \\in B\\}',
  'binary-relation': 'R \\subseteq A \\times B,\\; aRb \\iff (a,b) \\in R',
  'domain-range':
    '\\operatorname{dom}(R),\\; \\operatorname{ran}(R)',
};

export function InteractiveRelationsDiagram({
  className,
  activeGroupId,
  onGroupFocus,
}: InteractiveDiagramProps) {
  const [pairs, setPairs] = useState(INITIAL_PAIRS);
  const [hoverLeft, setHoverLeft] = useState<string | null>(null);
  const [hoverRight, setHoverRight] = useState<string | null>(null);
  const [pendingLeft, setPendingLeft] = useState<string | null>(null);

  const gid = activeGroupId ?? 'cartesian-product';

  const activePairs = useMemo(() => {
    if (hoverLeft) return [...pairs].filter((p) => p.startsWith(`${hoverLeft}-`));
    if (hoverRight) return [...pairs].filter((p) => p.endsWith(`-${hoverRight}`));
    return [...pairs];
  }, [pairs, hoverLeft, hoverRight]);

  const domain = useMemo(
    () => LEFT.filter((n) => [...pairs].some((p) => p.startsWith(`${n.id}-`))).map((n) => n.label),
    [pairs],
  );

  const range = useMemo(
    () => RIGHT.filter((n) => [...pairs].some((p) => p.endsWith(`-${n.id}`))).map((n) => n.label),
    [pairs],
  );

  function togglePair(leftId: string, rightId: string) {
    onGroupFocus('binary-relation');
    const key = `${leftId}-${rightId}`;
    setPairs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const infoMath = useMemo(() => {
    if (gid === 'domain-range') {
      return `|R| = ${pairs.size},\\; \\operatorname{dom} = \\{${domain.join(',')}\\},\\; \\operatorname{ran} = \\{${range.join(',')}\\}`;
    }
    if (pendingLeft) return `\\text{Select target for } ${pendingLeft}`;
    return `|R| = ${pairs.size}\\text{ pairs — click left, then right}`;
  }, [gid, pairs.size, domain, range, pendingLeft]);

  return (
    <div className={`${DIAGRAM_FRAME} ${className ?? ''}`}>
      <div className="mb-1.5 flex flex-wrap gap-1">
        {(
          [
            ['cartesian-product', '×'],
            ['binary-relation', 'R'],
            ['domain-range', 'dom'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => onGroupFocus(id)}
            className={gid === id ? DIAGRAM_BTN_ACTIVE : DIAGRAM_BTN_IDLE}
          >
            {label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 400 260" className={DIAGRAM_SVG} role="img" aria-label="Interactive relation diagram">
        {[...pairs].map((key) => {
          const [lId, rId] = key.split('-');
          const left = LEFT.find((n) => n.id === lId);
          const right = RIGHT.find((n) => n.id === rId);
          if (!left || !right) return null;
          const active = activePairs.includes(key);
          return (
            <line
              key={key}
              x1="70"
              y1={left.y}
              x2="330"
              y2={right.y}
              stroke={active ? 'rgb(139 92 246)' : 'rgb(148 163 184 / 0.4)'}
              strokeWidth={active ? 2 : 1}
              markerEnd="url(#rel-arrow)"
            />
          );
        })}
        <defs>
          <marker id="rel-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgb(139 92 246)" />
          </marker>
        </defs>
        {LEFT.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setHoverLeft(node.id)}
            onMouseLeave={() => setHoverLeft(null)}
            onClick={() => {
              setPendingLeft(node.id);
              onGroupFocus('binary-relation');
            }}
            className="cursor-pointer"
          >
            <circle
              cx="50"
              cy={node.y}
              r="15"
              fill={
                pendingLeft === node.id
                  ? 'rgb(245 158 11 / 0.4)'
                  : 'rgb(16 185 129 / 0.25)'
              }
              stroke="rgb(16 185 129)"
              strokeWidth="1.5"
            />
            <text x="50" y={node.y + 4} textAnchor="middle" fill="currentColor" fontSize="10">
              {node.label}
            </text>
          </g>
        ))}
        {RIGHT.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setHoverRight(node.id)}
            onMouseLeave={() => setHoverRight(null)}
            onClick={() => {
              if (pendingLeft) {
                togglePair(pendingLeft, node.id);
                setPendingLeft(null);
              } else onGroupFocus('cartesian-product');
            }}
            className="cursor-pointer"
          >
            <circle cx="350" cy={node.y} r="15" fill="rgb(59 130 246 / 0.25)" stroke="rgb(59 130 246)" strokeWidth="1.5" />
            <text x="350" y={node.y + 4} textAnchor="middle" fill="currentColor" fontSize="10">
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className={DIAGRAM_HINT}>
        <MathText math={GROUP_MATH[gid] ?? GROUP_MATH['cartesian-product']} />
        <div className="mt-1 overflow-x-auto">
          <MathText math={infoMath} />
        </div>
      </div>
    </div>
  );
}
