import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin-auth';
import { getVisitMetrics } from '@/lib/visit-store';

export const dynamic = 'force-dynamic';

export default async function AdminVisitsPage() {
  await requireAdmin();

  const { totalVisits, visits, enabled } = await getVisitMetrics(100);

  const perPath = visits.reduce<Record<string, number>>((acc, visit) => {
    acc[visit.path] = (acc[visit.path] ?? 0) + 1;
    return acc;
  }, {});

  const topPaths = Object.entries(perPath)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 8);

  return (
    <AdminShell
      title="Visits Overview"
      description="Review recent site traffic captured from public pages and see which sections are getting attention."
    >
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-7 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Snapshot</p>
          <h2 className="mt-2 text-3xl font-serif font-bold text-oxford-blue">Traffic summary</h2>
          <p className="mt-6 text-5xl font-serif font-bold text-oxford-blue">{totalVisits}</p>
          <p className="mt-2 text-sm text-oxford-blue/60">
            {enabled ? 'Total public-page visits stored in the database.' : 'Run Prisma generate to enable visit tracking.'}
          </p>

          <div className="mt-8 space-y-3">
            {!enabled ? (
              <p className="rounded-2xl bg-ivory px-4 py-5 text-sm text-oxford-blue/60">The Visit model is not in the generated Prisma client yet.</p>
            ) : topPaths.length === 0 ? (
              <p className="rounded-2xl bg-ivory px-4 py-5 text-sm text-oxford-blue/60">No visit data yet.</p>
            ) : (
              topPaths.map(([path, count]) => (
                <div key={path} className="flex items-center justify-between rounded-2xl bg-ivory px-4 py-4">
                  <span className="font-bold text-oxford-blue">{path}</span>
                  <span className="rounded-full bg-oxford-blue px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-ivory">{count}</span>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-7 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Recent Log</p>
          <h2 className="mt-2 text-3xl font-serif font-bold text-oxford-blue">Latest 100 visits</h2>

          <div className="mt-6 space-y-3">
            {!enabled ? (
              <p className="rounded-2xl bg-ivory px-4 py-6 text-sm text-oxford-blue/60">Visits will start appearing here after regenerating Prisma and opening public pages.</p>
            ) : visits.length === 0 ? (
              <p className="rounded-2xl bg-ivory px-4 py-6 text-sm text-oxford-blue/60">Open the public site and visits will appear here.</p>
            ) : (
              visits.map((visit) => (
                <div key={visit.id} className="rounded-2xl bg-ivory px-4 py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-oxford-blue">{visit.path}</p>
                      <p className="text-sm text-oxford-blue/55">{visit.userAgent ?? 'Unknown device'}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-oxford-blue/40">IP: {visit.ip ?? 'Unavailable'}</p>
                    </div>
                    <p className="text-sm font-bold text-deep-gold">
                      {new Intl.DateTimeFormat('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(visit.visitedAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </div>
    </AdminShell>
  );
}

