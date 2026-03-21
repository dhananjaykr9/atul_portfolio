import {
  createConferenceAction,
  createPublicationAction,
  createScholarAction,
  deleteConferenceAction,
  deletePublicationAction,
  deleteScholarAction,
  importFeaturedResearchAction,
  updateConferenceAction,
  updatePublicationAction,
  updateScholarAction,
} from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminResearchPage() {
  await requireAdmin();

  const [publications, scholars, conferences] = await Promise.all([
    prisma.publication.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] }),
    prisma.scholar.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] }),
    prisma.conference.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] }),
  ]);

  return (
    <AdminShell
      title="Research Management"
      description="Add, edit, and organize publications, PhD supervision entries, and conference records for the public research section."
    >
      <div className="space-y-8">
        <section className="grid gap-8 xl:grid-cols-3">
          <form action={createPublicationAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Add Publication</p>
            <div className="mt-5 space-y-3 text-sm">
              <input name="title" required placeholder="Publication title" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="journal" required placeholder="Journal / publisher" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <div className="grid grid-cols-2 gap-3">
                <input name="year" required placeholder="2024" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                <input name="type" placeholder="Journal Article" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              </div>
              <input name="link" placeholder="https://..." className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <textarea name="abstract" placeholder="Short abstract" rows={5} className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <button type="submit" className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Publication</button>
            </div>
          </form>

          <form action={createScholarAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Add Scholar</p>
            <div className="mt-5 space-y-3 text-sm">
              <input name="name" required placeholder="Scholar name" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <textarea name="topic" required placeholder="Research topic" rows={5} className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <div className="grid grid-cols-2 gap-3">
                <select name="status" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3">
                  <option>Ongoing</option>
                  <option>Awarded</option>
                </select>
                <input name="year" required placeholder="2025" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Scholar</button>
            </div>
          </form>

          <form action={createConferenceAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Add Conference</p>
            <div className="mt-5 space-y-3 text-sm">
              <input name="title" required placeholder="Paper title" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="event" required placeholder="Conference / seminar name" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="location" required placeholder="Location" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="year" required placeholder="2024" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <button type="submit" className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Conference</button>
            </div>
          </form>
        </section>

        <section className="grid gap-8 xl:grid-cols-3">
          <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <h2 className="text-2xl font-serif font-bold text-oxford-blue">Publications</h2>
            <div className="mt-5 space-y-4">
              {publications.map((publication) => (
                <details key={publication.id} className="rounded-2xl bg-ivory px-4 py-4">
                  <summary className="cursor-pointer list-none">
                    <p className="font-bold text-oxford-blue">{publication.title}</p>
                    <p className="mt-1 text-sm text-oxford-blue/60">{publication.journal} | {publication.year}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-deep-gold">Edit Publication</p>
                  </summary>
                  <form action={updatePublicationAction} className="mt-4 space-y-3 text-sm">
                    <input type="hidden" name="id" value={publication.id} />
                    <input name="title" defaultValue={publication.title} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <input name="journal" defaultValue={publication.journal} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <div className="grid grid-cols-2 gap-3">
                      <input name="year" defaultValue={publication.year} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                      <input name="type" defaultValue={publication.type ?? ''} className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    </div>
                    <input name="link" defaultValue={publication.link ?? ''} className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <textarea name="abstract" defaultValue={publication.abstract ?? ''} rows={4} className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <div className="flex items-center justify-between gap-3">
                      <button type="submit" className="rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Changes</button>
                    </div>
                  </form>
                  <form action={deletePublicationAction} className="mt-3">
                    <input type="hidden" name="id" value={publication.id} />
                    <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Delete</button>
                  </form>
                </details>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <h2 className="text-2xl font-serif font-bold text-oxford-blue">PhD Supervision</h2>
            <div className="mt-5 space-y-4">
              {scholars.map((scholar) => (
                <details key={scholar.id} className="rounded-2xl bg-ivory px-4 py-4">
                  <summary className="cursor-pointer list-none">
                    <p className="font-bold text-oxford-blue">{scholar.name}</p>
                    <p className="mt-1 text-sm text-oxford-blue/60">{scholar.status} | {scholar.year}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-deep-gold">Edit Scholar</p>
                  </summary>
                  <form action={updateScholarAction} className="mt-4 space-y-3 text-sm">
                    <input type="hidden" name="id" value={scholar.id} />
                    <input name="name" defaultValue={scholar.name} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <textarea name="topic" defaultValue={scholar.topic} required rows={4} className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <div className="grid grid-cols-2 gap-3">
                      <select name="status" defaultValue={scholar.status} className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3">
                        <option>Ongoing</option>
                        <option>Awarded</option>
                      </select>
                      <input name="year" defaultValue={scholar.year} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    </div>
                    <button type="submit" className="rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Changes</button>
                  </form>
                  <form action={deleteScholarAction} className="mt-3">
                    <input type="hidden" name="id" value={scholar.id} />
                    <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Delete</button>
                  </form>
                </details>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
            <h2 className="text-2xl font-serif font-bold text-oxford-blue">Conferences</h2>
            <div className="mt-5 space-y-4">
              {conferences.map((conference) => (
                <details key={conference.id} className="rounded-2xl bg-ivory px-4 py-4">
                  <summary className="cursor-pointer list-none">
                    <p className="font-bold text-oxford-blue">{conference.title}</p>
                    <p className="mt-1 text-sm text-oxford-blue/60">{conference.event} | {conference.year}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-deep-gold">Edit Conference</p>
                  </summary>
                  <form action={updateConferenceAction} className="mt-4 space-y-3 text-sm">
                    <input type="hidden" name="id" value={conference.id} />
                    <input name="title" defaultValue={conference.title} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <input name="event" defaultValue={conference.event} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <input name="location" defaultValue={conference.location} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <input name="year" defaultValue={conference.year} required className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
                    <button type="submit" className="rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Changes</button>
                  </form>
                  <form action={deleteConferenceAction} className="mt-3">
                    <input type="hidden" name="id" value={conference.id} />
                    <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Delete</button>
                  </form>
                </details>
              ))}
            </div>
          </article>
        </section>
      </div>
    </AdminShell>
  );
}
