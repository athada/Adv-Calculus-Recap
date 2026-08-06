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

const INPUTS = [
  { id: 'a', label: 'a', y: 70, image: 'b1' },
  { id: 'b', label: 'b', y: 130, image: 'b3' },
  { id: 'c', label: 'c', y: 190, image: 'b2' },
];

const OUTPUTS = [
  { id: 'b1', label: '1', y: 60, hit: true },
  { id: 'b2', label: '2', y: 130, hit: true },
  { id: 'b3', label: '3', y: 190, hit: true },
  { id: 'b4', label: '4', y: 230, hit: false },
];

const GROUP_MATH: Record<string, string> = {
  definition: 'f : A \\to B,\\; \\forall a \\in A\\,\\exists! b : f(a)=b',
  injectivity: 'f(a_1)=f(a_2) \\Rightarrow a_1=a_2',
  'image-preimage': '\\operatorname{im}(f),\\; f^{-1}(S)',
};

export function InteractiveMapsDiagram({
  className,
  activeGroupId,
  onGroupFocus,
}: InteractiveDiagramProps) {
  const [selectedInput, setSelectedInput] = useState<string | null>('a');
  const [showBadMap, setShowBadMap] = useState(false);

  const gid = activeGroupId ?? 'definition';

  const mapping = useMemo(() => {
    const map = new Map(INPUTS.map((i) => [i.id, i.image]));
    if (showBadMap) map.set('b', 'b4');
    return map;
  }, [showBadMap]);

  const infoMath = useMemo(() => {
    if (showBadMap) return '\\text{Invalid: } b \\mapsto 3 \\text{ and } 4';
    const sel = selectedInput ? mapping.get(selectedInput) : null;
    const out = OUTPUTS.find((o) => o.id === sel)?.label;
    if (selectedInput && out) return `f(${selectedInput}) = ${out}`;
    return 'f : A \\to B';
  }, [showBadMap, selectedInput, mapping]);

  return (
    <div className={`${DIAGRAM_FRAME} ${className ?? ''}`}>
      <div className="mb-1.5 flex flex-wrap gap-1">
        {(
          [
            ['definition', 'f'],
            ['injectivity', '1-1'],
            ['image-preimage', 'im'],
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
        <button
          type="button"
          onClick={() => {
            setShowBadMap((v) => !v);
            onGroupFocus('definition');
          }}
          className={
            showBadMap
              ? `${DIAGRAM_BTN} bg-red-600 text-white`
              : `${DIAGRAM_BTN} bg-slate-100 text-slate-600 dark:bg-slate-800`
          }
        >
          {showBadMap ? '✗' : '✓'}
        </button>
      </div>

      <svg viewBox="0 0 400 260" className={DIAGRAM_SVG} role="img" aria-label="Interactive function diagram">
        {INPUTS.map((input) => {
          const targetId = mapping.get(input.id);
          const target = OUTPUTS.find((o) => o.id === targetId);
          const active = selectedInput === input.id;
          if (!target) return null;
          const paths = [
            { to: target, bad: false },
            ...(showBadMap && input.id === 'b'
              ? [{ to: OUTPUTS.find((o) => o.id === 'b4')!, bad: true }]
              : []),
          ];
          return paths.map((path, idx) => (
            <path
              key={`${input.id}-${idx}`}
              d={`M 75 ${input.y} C 180 ${input.y}, 220 ${path.to.y}, 315 ${path.to.y}`}
              fill="none"
              stroke={path.bad ? 'rgb(239 68 68)' : active ? 'rgb(245 158 11)' : 'rgb(148 163 184)'}
              strokeWidth={active || path.bad ? 2 : 1.5}
              strokeDasharray={path.bad ? '5 3' : undefined}
              markerEnd={path.bad ? 'url(#bad-arrow)' : 'url(#map-arrow)'}
            />
          ));
        })}
        <defs>
          <marker id="map-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="rgb(245 158 11)" />
          </marker>
          <marker id="bad-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="rgb(239 68 68)" />
          </marker>
        </defs>
        {INPUTS.map((input) => (
          <g
            key={input.id}
            onClick={() => {
              setSelectedInput(input.id);
              onGroupFocus('image-preimage');
            }}
            className="cursor-pointer"
          >
            <rect
              x="42"
              y={input.y - 15}
              width="30"
              height="30"
              rx="5"
              fill={selectedInput === input.id ? 'rgb(16 185 129 / 0.35)' : 'rgb(16 185 129 / 0.15)'}
              stroke="rgb(16 185 129)"
              strokeWidth="1.5"
            />
            <text x="57" y={input.y + 4} textAnchor="middle" fill="currentColor" fontSize="11">
              {input.label}
            </text>
          </g>
        ))}
        {OUTPUTS.map((output) => (
          <g key={output.id}>
            <rect
              x="325"
              y={output.y - 15}
              width="30"
              height="30"
              rx="5"
              fill={output.hit ? 'rgb(245 158 11 / 0.2)' : 'transparent'}
              stroke={output.hit ? 'rgb(245 158 11)' : 'rgb(148 163 184)'}
              strokeDasharray={output.hit ? undefined : '3 2'}
            />
            <text x="340" y={output.y + 4} textAnchor="middle" fill="currentColor" fontSize="11">
              {output.label}
            </text>
          </g>
        ))}
      </svg>

      <div className={DIAGRAM_HINT}>
        <MathText math={GROUP_MATH[gid] ?? GROUP_MATH.definition} />
        <div className="mt-1 overflow-x-auto">
          <MathText math={infoMath} />
        </div>
      </div>
    </div>
  );
}
