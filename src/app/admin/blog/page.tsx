import {
  createBlogPostAction,
  deleteBlogPostAction,
  toggleBlogPostPublishedAction,
} from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  await requireAdmin();

  const posts = await prisma.blogPost.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });

  return (
    <AdminShell
      title="Blog Manager"
      description="Publish new writing, manage drafts, and control visibility for the public blog."
    >
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <form action={createBlogPostAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">New Blog Post</p>
          <div className="mt-5 space-y-3 text-sm">
            <input name="title" required placeholder="Post title" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
            <input name="slug" placeholder="optional-custom-slug" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
            <textarea name="excerpt" required rows={3} placeholder="Short excerpt" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
            <textarea name="content" required rows={10} placeholder="Full blog content" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
            <div className="grid grid-cols-2 gap-3">
              <input name="category" placeholder="Theory" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="author" placeholder="Dr. Atul M. Gavaskar" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input name="readTime" placeholder="5 min read" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
              <input name="language" placeholder="English" className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3" />
            </div>
            <label className="flex items-center gap-3 rounded-2xl bg-ivory px-4 py-3 text-sm font-medium text-oxford-blue">
              <input type="checkbox" name="published" defaultChecked />
              Publish immediately
            </label>
            <button type="submit" className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue">Save Blog Post</button>
          </div>
        </form>

        <article className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
          <h2 className="text-2xl font-serif font-bold text-oxford-blue">Existing Posts</h2>
          <div className="mt-5 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="rounded-2xl bg-ivory px-4 py-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-bold text-oxford-blue">{post.title}</p>
                    <p className="mt-1 text-sm text-oxford-blue/60">/{post.slug} · {post.category} · {post.readTime}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-200 text-zinc-700'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="mt-3  text-sm leading-relaxed text-oxford-blue/70">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <form action={toggleBlogPostPublishedAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="published" value={String(post.published)} />
                    <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-oxford-blue">
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                  </form>
                  <form action={deleteBlogPostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </AdminShell>
  );
}

