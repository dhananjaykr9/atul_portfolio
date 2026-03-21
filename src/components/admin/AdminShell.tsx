import type { ReactNode } from 'react';
import { logoutAction } from '@/app/admin/actions';
import { AdminNav } from '@/components/admin/AdminNav';

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#0f1f38,_#142b4a_22rem,_#f9f7f2_22rem)]">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <section className="rounded-[36px] border border-white/10 bg-white/6 px-6 py-7 text-ivory shadow-[0_30px_120px_rgba(10,16,28,0.35)] backdrop-blur-xl md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-deep-gold">Admin Panel</p>
              <div>
                <h1 className="text-3xl font-serif font-bold md:text-4xl">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/72">{description}</p>
              </div>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-white/15 bg-white/8 px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-ivory transition hover:border-deep-gold hover:bg-deep-gold hover:text-oxford-blue"
              >
                Log Out
              </button>
            </form>
          </div>

          <div className="mt-6">
            <AdminNav />
          </div>
        </section>

        <section className="mt-8">{children}</section>
      </div>
    </main>
  );
}
