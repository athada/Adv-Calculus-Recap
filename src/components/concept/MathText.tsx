import katex from 'katex';
import 'katex/dist/katex.min.css';
import type { ReactNode } from 'react';

interface MathTextProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function MathText({ math, block = false, className = '' }: MathTextProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: block,
  });

  if (block) {
    return (
      <div
        className={`overflow-x-auto py-2 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface MathParagraphProps {
  text: string;
  className?: string;
}

const INLINE_MATH_PATTERN = /\$([^$]+)\$/g;

function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const pattern = new RegExp(INLINE_MATH_PATTERN.source, 'g');

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(<MathText key={key++} math={match[1]} />);
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

export function MathParagraph({ text, className = '' }: MathParagraphProps) {
  return (
    <p className={`leading-relaxed text-slate-700 dark:text-slate-300 ${className}`}>
      {renderRichText(text)}
    </p>
  );
}
