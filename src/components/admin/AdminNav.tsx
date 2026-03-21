'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard', eyebrow: 'Overview' },
  { href: '/admin/visits', label: 'Visits', eyebrow: 'Analytics' },
  { href: '/admin/research', label: 'Research', eyebrow: 'Scholarly' },
  { href: '/admin/blog', label: 'Blog', eyebrow: 'Writing Desk' },
  { href: '/admin/students', label: 'Student Corner', eyebrow: 'Resources' },
];

function isActive(pathname: string, href: string) {
  return href === '/admin' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {links.map((link, index) => {
        const active = isActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group rounded-[22px] border px-4 py-3 transition-all duration-300 ${
              active
                ? 'border-deep-gold/70 bg-deep-gold text-oxford-blue shadow-[0_16px_36px_rgba(197,160,89,0.24)]'
                : 'border-white/10 bg-white/8 text-ivory hover:border-deep-gold/45 hover:bg-white/12 hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className={`text-[10px] font-bold uppercase tracking-[0.26em] ${active ? 'text-oxford-blue/65' : 'text-deep-gold'}`}>
                  {link.eyebrow}
                </p>
                <h3 className="mt-1 truncate text-sm font-serif font-bold sm:text-[15px]">{link.label}</h3>
              </div>
              <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-[0.16em] ${active ? 'bg-oxford-blue/10 text-oxford-blue' : 'bg-white/10 text-ivory/65 group-hover:bg-deep-gold/12 group-hover:text-deep-gold'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
