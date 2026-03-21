import Link from 'next/link';
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

  return (
    <AdminShell
      title="Portfolio Control Room"
      description="Use the dashboard for quick content health checks, then jump into the specific management areas when you want to edit data."
    >
      <div className="space-y-8">
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Research Records', value: publicationCount + scholarCount + conferenceCount, detail: `${publicationCount} publications, ${scholarCount} scholars, ${conferenceCount} conferences` },
            { label: 'Blog Posts', value: blogCount, detail: metricLabel(blogCount, 'article', 'articles') },
            { label: 'Student Corner', value: categoryCount + resourceCount + extensionCount, detail: `${categoryCount} categories, ${resourceCount} resources, ${extensionCount} activities` },
            { label: 'Visits Snapshot', value: totalVisits, detail: visitsEnabled ? (topPath ? `${topPath.path} is the busiest recent page` : 'Open public pages to collect traffic data') : 'Visit tracking is waiting for Supabase writes' },
          ].map((metric) => (
            <article key={metric.label} className="rounded-[30px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-oxford-blue/45">{metric.label}</p>
              <p className="mt-4 text-4xl font-serif font-bold text-oxford-blue">{metric.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-oxford-blue/62">{metric.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-7 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Quick Actions</p>
            <h2 className="mt-2 text-3xl font-serif font-bold text-oxford-blue">Manage by area</h2>
            <div className="mt-6 grid gap-4">
              {[
                {
                  href: '/admin/research',
                  title: 'Research',
                  description: 'Add publications, scholars, and conferences.',
                },
                {
                  href: '/admin/blog',
                  title: 'Blog',
                  description: 'Create posts and control published status.',
                },
                {
                  href: '/admin/students',
                  title: 'Student Corner',
                  description: 'Maintain resources, categories, and activities.',
                },
                {
                  href: '/admin/visits',
                  title: 'Visits',
                  description: 'See detailed traffic logs and page popularity.',
                },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="rounded-[28px] border border-oxford-blue/10 bg-ivory px-5 py-5 transition hover:border-deep-gold/60 hover:bg-white">
                  <p className="text-lg font-serif font-bold text-oxford-blue">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-oxford-blue/65">{item.description}</p>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-7 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Recent Changes</p>
            <h2 className="mt-2 text-3xl font-serif font-bold text-oxford-blue">Latest content added</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] bg-ivory p-5">
                <h3 className="text-xl font-serif font-bold text-oxford-blue">Newest Research</h3>
                <div className="mt-4 space-y-3">
                  {latestPublications.map((publication) => (
                    <div key={publication.id} className="rounded-2xl bg-white px-4 py-4">
                      <p className="font-bold text-oxford-blue">{publication.title}</p>
                      <p className="mt-1 text-sm text-oxford-blue/60">{publication.journal} · {publication.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-ivory p-5">
                <h3 className="text-xl font-serif font-bold text-oxford-blue">Newest Blog Posts</h3>
                <div className="mt-4 space-y-3">
                  {latestPosts.map((post) => (
                    <div key={post.id} className="rounded-2xl bg-white px-4 py-4">
                      <p className="font-bold text-oxford-blue">{post.title}</p>
                      <p className="mt-1 text-sm text-oxford-blue/60">{post.category} · {post.readTime}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-ivory p-5">
                <h3 className="text-xl font-serif font-bold text-oxford-blue">Newest Resources</h3>
                <div className="mt-4 space-y-3">
                  {latestResources.map((resource) => (
                    <div key={resource.id} className="rounded-2xl bg-white px-4 py-4">
                      <p className="font-bold text-oxford-blue">{resource.title}</p>
                      <p className="mt-1 text-sm text-oxford-blue/60">{resource.category.title} · {resource.type} · {resource.size}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-ivory p-5">
                <h3 className="text-xl font-serif font-bold text-oxford-blue">Newest Activities</h3>
                <div className="mt-4 space-y-3">
                  {latestActivities.map((activity) => (
                    <div key={activity.id} className="rounded-2xl bg-white px-4 py-4">
                      <p className="font-bold text-oxford-blue">{activity.title}</p>
                      <p className="mt-1 text-sm text-oxford-blue/60">{activity.type} · {activity.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </AdminShell>
  );
}
