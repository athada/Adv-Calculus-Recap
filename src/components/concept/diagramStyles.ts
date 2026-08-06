/** Shared compact sizing for interactive diagrams (240px base + 30% = 312px wide) */
export const DIAGRAM_FRAME =
  'max-w-[312px] w-full shrink-0';

export const DIAGRAM_SVG =
  'w-full max-h-[169px] rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/50';

export const DIAGRAM_BTN =
  'rounded px-2 py-1 text-[10px] font-medium transition';

export const DIAGRAM_BTN_ACTIVE = `${DIAGRAM_BTN} bg-emerald-600 text-white`;

export const DIAGRAM_BTN_IDLE = `${DIAGRAM_BTN} bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200`;

export const DIAGRAM_HINT =
  'mt-2 rounded bg-slate-100 px-2 py-1.5 text-[11px] leading-snug text-slate-700 dark:bg-slate-800 dark:text-slate-300';
