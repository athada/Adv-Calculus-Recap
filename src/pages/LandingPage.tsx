import { CurriculumGraph } from '@/components/graph/CurriculumGraph';
import { PageLayout } from '@/components/layout/PageLayout';

export function LandingPage() {
  return (
    <PageLayout>
      <section className="mb-4">
        <CurriculumGraph />
      </section>

      <section className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            Coord-free
          </span>
          <span>Invariant / geometric</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            Coord-dep
          </span>
          <span>Components / indices</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-800 dark:bg-violet-900 dark:text-violet-200">
            Dual
          </span>
          <span>Both integrated</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            S1–S7
          </span>
          <span>Stage number</span>
        </div>
      </section>
    </PageLayout>
  );
}
