import type { ReactNode } from 'react';
import { logoutAction } from '@/app/admin/actions';
import { AdminNav } from '@/components/admin/AdminNav';

function formatAdminDate() {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date());
}

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const todayLabel = formatAdminDate();

  return (
    <main className="min-h-screen !pt-0 bg-[linear-gradient(180deg,_#0d1a30_0%,_#142b4a_18rem,_#eef2f7_18rem,_#f9f7f2_100%)] xl:h-screen xl:overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8 xl:h-full">
        <div className="grid gap-6 xl:h-full xl:grid-cols-[18rem_minmax(0,1fr)] xl:items-start">
          <aside className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,#152845_0%,#1b365d_58%,#203f69_100%)] p-5 text-ivory shadow-[0_30px_120px_rgba(10,16,28,0.35)] sm:p-6 xl:h-[calc(100vh-4rem)] xl:overflow-y-auto">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-deep-gold/70 to-transparent" />
            <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-deep-gold/12 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-white/6 blur-3xl" />

            <div className="relative space-y-5">
              <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
                <span className="inline-flex rounded-full border border-deep-gold/25 bg-deep-gold/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-deep-gold">
                  Admin Panel
                </span>
                <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-ivory/68">
                  {todayLabel}
                </span>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/7 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-deep-gold">Portfolio Owner</p>
                <h2 className="mt-2 text-lg font-serif font-bold text-white">Dr. Atul M. Gavaskar</h2>
                <p className="mt-2 text-sm leading-6 text-ivory/72">
                  Assistant Professor, PGTD of English, Gondwana University, Gadchiroli.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/7 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-deep-gold">Workspace</p>
                <p className="mt-2 text-sm leading-6 text-ivory/72">
                  Research, blog, visits, and student resources in one place.
                </p>
              </div>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full rounded-[22px] border border-white/15 bg-white/8 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.28em] text-ivory transition hover:border-deep-gold hover:bg-deep-gold hover:text-oxford-blue"
                >
                  Log Out
                </button>
              </form>
            </div>
          </aside>

          <div className="space-y-6 xl:h-[calc(100vh-4rem)] xl:min-w-0 xl:overflow-y-auto xl:pr-1">
            <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#183153,#1e3a61)] px-5 py-6 text-ivory shadow-[0_30px_100px_rgba(10,16,28,0.24)] sm:px-6 md:px-8 md:py-7">
              <h1 className="text-3xl font-serif font-bold leading-tight md:text-4xl lg:text-[2.65rem]">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ivory/72 md:text-[15px]">{description}</p>

              <div className="mt-6 rounded-[26px] border border-white/10 bg-white/7 p-3 md:mt-7">
                <AdminNav />
              </div>
            </section>

            <section className="rounded-[32px] border border-oxford-blue/8 bg-white/84 p-4 shadow-[0_20px_80px_rgba(21,34,54,0.08)] backdrop-blur-sm sm:p-5 md:p-6">
              {children}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
