import type { ReactNode } from 'react';

import { ThemeToggle } from './ThemeToggle';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Advanced Calculus Recap
            </p>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              From Set Theory to Riemannian Geometry
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Topic content pages are coming soon. Follow the graph to revise step by step.
        </div>
      </footer>
    </div>
  );
}
