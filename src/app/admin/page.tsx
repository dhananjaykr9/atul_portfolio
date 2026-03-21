import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin-auth';
import { getVisitMetrics } from '@/lib/visit-store';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function metricLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [
    publicationCount,
    blogCount,
    categoryCount,
    resourceCount,
    extensionCount,
    scholarCount,
    conferenceCount,
    latestPublications,
    latestPosts,
    latestResources,
    latestActivities,
    visitMetrics,
  ] = await Promise.all([
    prisma.publication.count(),
    prisma.blogPost.count(),
    prisma.studentCategory.count(),
    prisma.studentResource.count(),
    prisma.extensionActivity.count(),
    prisma.scholar.count(),
    prisma.conference.count(),
    prisma.publication.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.studentResource.findMany({ orderBy: { createdAt: 'desc' }, take: 4, include: { category: true } }),
    prisma.extensionActivity.findMany({ orderBy: [{ createdAt: 'desc' }], take: 3 }),
    getVisitMetrics(12),
  ]);

  const { totalVisits, visits, enabled: visitsEnabled } = visitMetrics;

  const topPath = visits.reduce<{ path: string; count: number } | null>((best, visit) => {
    const count = visits.filter((entry) => entry.path === visit.path).length;

    if (!best || count > best.count) {
      return { path: visit.path, count };
    }

    return best;
  }, null);

  const researchTotal = publicationCount + scholarCount + conferenceCount;
  const studentTotal = categoryCount + resourceCount + extensionCount;

  const metrics = [
    {
      label: 'Research Records',
      value: researchTotal,
      accent: 'from-[#f7efe1] to-white',
      detail: `${publicationCount} publications, ${scholarCount} scholars, ${conferenceCount} conferences`,
    },
    {
      label: 'Blog Posts',
      value: blogCount,
      accent: 'from-[#edf3fb] to-white',
      detail: metricLabel(blogCount, 'article', 'articles'),
    },
    {
      label: 'Student Corner',
      value: studentTotal,
      accent: 'from-[#eef7f2] to-white',
      detail: `${categoryCount} categories, ${resourceCount} resources, ${extensionCount} activities`,
    },
    {
      label: 'Visits Snapshot',
      value: totalVisits,
      accent: 'from-[#f6f0fb] to-white',
      detail: visitsEnabled
        ? topPath
          ? `${topPath.path} is the busiest recent page`
          : 'Open public pages to collect traffic data'
        : 'Visit tracking is waiting for Supabase writes',
    },
  ];

  const contentGroups = [
    {
      title: 'Newest Research',
      items: latestPublications.map((publication) => ({
        id: publication.id,
        heading: publication.title,
        meta: `${publication.journal} | ${publication.year}`,
      })),
    },
    {
      title: 'Newest Blog Posts',
      items: latestPosts.map((post) => ({
        id: post.id,
        heading: post.title,
        meta: `${post.category} | ${post.readTime}`,
      })),
    },
    {
      title: 'Newest Resources',
      items: latestResources.map((resource) => ({
        id: resource.id,
        heading: resource.title,
        meta: `${resource.category.title} | ${resource.type} | ${resource.size}`,
      })),
    },
    {
      title: 'Newest Activities',
      items: latestActivities.map((activity) => ({
        id: activity.id,
        heading: activity.title,
        meta: `${activity.type} | ${activity.date}`,
      })),
    },
  ];

  return (
    <AdminShell
      title="Portfolio Control Room"
      description="Use the dashboard for quick content health checks, then jump into the specific management areas when you want to edit data."
    >
      <div className="space-y-7">
        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[28px] border border-oxford-blue/8 bg-[linear-gradient(180deg,#1b365d,#234775)] p-6 text-ivory shadow-[0_18px_60px_rgba(21,34,54,0.14)]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-deep-gold">Command Summary</p>
            <h2 className="mt-3 text-3xl font-serif font-bold">Your academic portfolio is live and editable.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ivory/75">
              Use the navigation above to move directly into research, blog, student resources, or visits. The dashboard stays focused on live signals and recently added content.
            </p>
          </article>

          <article className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] border border-oxford-blue/8 bg-white p-5 shadow-[0_15px_50px_rgba(21,34,54,0.07)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Live Signal</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-oxford-blue/50">Most active recent path</p>
              <p className="mt-2 text-2xl font-serif font-bold text-oxford-blue">{topPath?.path ?? 'Waiting for traffic'}</p>
              <p className="mt-2 text-sm leading-7 text-oxford-blue/65">
                {visitsEnabled
                  ? topPath
                    ? `${topPath.count} recent visits recorded on this path.`
                    : 'Open public pages and the latest activity will appear here.'
                  : 'Visit tracking is currently waiting for Supabase logging to become available.'}
              </p>
            </div>

            <div className="rounded-[28px] border border-oxford-blue/8 bg-white p-5 shadow-[0_15px_50px_rgba(21,34,54,0.07)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Editorial Pulse</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-oxford-blue/50">Published Writing</p>
                  <p className="mt-2 text-2xl font-serif font-bold text-oxford-blue">{blogCount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-oxford-blue/50">Latest Resources</p>
                  <p className="mt-2 text-2xl font-serif font-bold text-oxford-blue">{resourceCount}</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className={`rounded-[28px] border border-oxford-blue/8 bg-gradient-to-b ${metric.accent} p-5 shadow-[0_15px_50px_rgba(21,34,54,0.07)]`}>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-oxford-blue/45">{metric.label}</p>
              <p className="mt-4 text-4xl font-serif font-bold text-oxford-blue">{metric.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-oxford-blue/62">{metric.detail}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[30px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)] md:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Recent Changes</p>
          <h2 className="mt-2 text-3xl font-serif font-bold text-oxford-blue">Latest content added</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {contentGroups.map((group) => (
              <div key={group.title} className="rounded-[24px] bg-ivory p-4">
                <h3 className="text-xl font-serif font-bold text-oxford-blue">{group.title}</h3>
                <div className="mt-4 space-y-3">
                  {group.items.length > 0 ? (
                    group.items.map((item) => (
                      <div key={item.id} className="rounded-2xl bg-white px-4 py-4">
                        <p className="font-bold text-oxford-blue">{item.heading}</p>
                        <p className="mt-1 text-sm text-oxford-blue/60">{item.meta}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-white px-4 py-4 text-sm leading-7 text-oxford-blue/60">
                      No items have been added here yet.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
