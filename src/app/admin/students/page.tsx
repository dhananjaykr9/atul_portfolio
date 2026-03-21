import {
  createExtensionActivityAction,
  createStudentCategoryAction,
  createStudentResourceAction,
  deleteExtensionActivityAction,
  deleteStudentCategoryAction,
  deleteStudentResourceAction,
} from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminStudentsPage() {
  await requireAdmin();

  const [categories, extensionActivities] = await Promise.all([
    prisma.studentCategory.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        resources: {
          orderBy: { createdAt: 'desc' },
        },
      },
    }),
    prisma.extensionActivity.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    }),
  ]);

  return (
    <AdminShell
      title="Student Corner Manager"
      description="Organize resource categories, upload student-facing links, and maintain extension activities."
    >
      <div className="space-y-8">
        <section className="grid gap-8 xl:grid-cols-3">
          <form action={createStudentCategoryAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">New Category</p>
            <div className="mt-5 space-y-3 text-sm">
              <input name="title" required placeholder="Category title" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <textarea name="description" required rows={4} placeholder="Short category description" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="order" type="number" placeholder="Display order" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <button type="submit" className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Category</button>
            </div>
          </form>

          <form action={createStudentResourceAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">New Resource</p>
            <div className="mt-5 space-y-3 text-sm">
              <input name="title" required placeholder="Resource title" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <div className="grid grid-cols-2 gap-3">
                <input name="type" required placeholder="PDF / Video" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                <input name="size" required placeholder="2 MB" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              </div>
              <input name="url" required placeholder="https://..." className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <select name="categoryId" required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3">
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}
              </select>
              <button type="submit" className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Resource</button>
            </div>
          </form>

          <form action={createExtensionActivityAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">New Activity</p>
            <div className="mt-5 space-y-3 text-sm">
              <input name="title" required placeholder="Activity title" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="type" required placeholder="Workshop / Lecture" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="location" required placeholder="Location" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="date" required placeholder="March 2026" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="order" type="number" placeholder="Display order" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <textarea name="description" rows={4} placeholder="Optional description" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <button type="submit" className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Activity</button>
            </div>
          </form>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <h2 className="text-2xl font-serif font-bold text-oxford-blue">Categories and Resources</h2>
            <div className="mt-5 space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="rounded-[28px] bg-ivory p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xl font-serif font-bold text-oxford-blue">{category.title}</p>
                      <p className="mt-1 text-sm text-oxford-blue/65">{category.description}</p>
                    </div>
                    <form action={deleteStudentCategoryAction}>
                      <input type="hidden" name="id" value={category.id} />
                      <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Delete Category</button>
                    </form>
                  </div>

                  <div className="mt-4 space-y-3">
                    {category.resources.map((resource) => (
                      <div key={resource.id} className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-bold text-oxford-blue">{resource.title}</p>
                          <p className="text-sm text-oxford-blue/60">{resource.type} · {resource.size}</p>
                        </div>
                        <form action={deleteStudentResourceAction}>
                          <input type="hidden" name="id" value={resource.id} />
                          <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Delete</button>
                        </form>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <h2 className="text-2xl font-serif font-bold text-oxford-blue">Extension Activities</h2>
            <div className="mt-5 space-y-3">
              {extensionActivities.map((activity) => (
                <div key={activity.id} className="rounded-2xl bg-ivory px-4 py-4">
                  <p className="font-bold text-oxford-blue">{activity.title}</p>
                  <p className="mt-1 text-sm text-oxford-blue/60">{activity.type} · {activity.location} · {activity.date}</p>
                  {activity.description && <p className="mt-2 text-sm text-oxford-blue/70">{activity.description}</p>}
                  <form action={deleteExtensionActivityAction} className="mt-3">
                    <input type="hidden" name="id" value={activity.id} />
                    <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Delete</button>
                  </form>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </AdminShell>
  );
}

