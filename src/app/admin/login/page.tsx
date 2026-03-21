import { redirect } from 'next/navigation';
import { loginAction } from '@/app/admin/actions';
import { isAdminAuthenticated, isAdminConfigured } from '@/lib/admin-auth';

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect('/admin');
  }

  const configured = isAdminConfigured();
  const params = await searchParams;
  const error = params.error;

  const message =
    error === 'invalid-credentials'
      ? 'Invalid email or password. Please try again.'
      : error === 'unauthorized-email'
        ? 'This Supabase user is not allowed to access the admin panel.'
        : error === 'not-configured'
          ? 'Set Supabase auth environment variables before using the admin panel.'
          : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.2),_transparent_40%),linear-gradient(135deg,_#11233f,_#1B365D_60%,_#0d1b30)] px-6 py-16 text-ivory">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[36px] border border-white/10 bg-white/6 shadow-[0_40px_120px_rgba(8,18,35,0.45)] backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-8 p-10 md:p-14">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-deep-gold">Admin Access</p>
              <h1 className="text-4xl font-serif font-bold leading-tight md:text-5xl">
                Sign in with Supabase Auth to manage the academic portfolio.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-ivory/72">
                Add publications, blog posts, student resources, and review traffic from a private dashboard backed by Supabase authentication.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                'Supabase email/password login',
                'Research and blog publishing',
                'Student corner content management',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/6 p-5 text-sm text-ivory/78">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 bg-[#fbf7ee] p-10 text-oxford-blue lg:border-l lg:border-t-0 md:p-14">
            <div className="mx-auto max-w-sm space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold">Admin Login</h2>
                <p className="text-sm text-oxford-blue/65">
                  Sign in with your Supabase user account. Optionally restrict access with <code>ADMIN_EMAIL</code>.
                </p>
              </div>

              {message && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {message}
                </div>
              )}

              <form action={loginAction} className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-oxford-blue/70">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-2xl border border-oxford-blue/15 bg-white px-4 py-3 text-base outline-none transition focus:border-deep-gold"
                    placeholder="admin@example.com"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-oxford-blue/70">Password</span>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full rounded-2xl border border-oxford-blue/15 bg-white px-4 py-3 text-base outline-none transition focus:border-deep-gold"
                    placeholder="Enter account password"
                  />
                </label>

                <button
                  type="submit"
                  disabled={!configured}
                  className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-sm font-bold uppercase tracking-[0.24em] text-ivory transition hover:bg-deep-gold hover:text-oxford-blue disabled:cursor-not-allowed disabled:bg-oxford-blue/30"
                >
                  Sign In
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

