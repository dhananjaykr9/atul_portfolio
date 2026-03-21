'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/visits', label: 'Visits' },
  { href: '/admin/research', label: 'Research' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/students', label: 'Student Corner' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-3">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full border px-4 py-2 text-sm font-bold tracking-wide transition-colors ${
              isActive
                ? 'border-deep-gold bg-deep-gold text-oxford-blue'
                : 'border-white/15 bg-white/5 text-ivory/75 hover:border-deep-gold/50 hover:text-ivory'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
