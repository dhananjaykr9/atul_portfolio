"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "Students' Corner", href: "/students" },
  { name: "Insights", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function MobileProfileMark({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-oxford-blue/10 bg-white/80 shadow-sm transition-all duration-300">
      <span
        className={`absolute h-[2px] rounded-full bg-oxford-blue transition-all duration-300 ${
          isOpen ? "w-6 rotate-45" : "w-6 -translate-y-2.5"
        }`}
      />
      <span
        className={`absolute h-[2px] rounded-full bg-deep-gold transition-all duration-300 ${
          isOpen ? "w-6 opacity-0" : "w-8"
        }`}
      />
      <span
        className={`absolute h-[2px] rounded-full bg-oxford-blue transition-all duration-300 ${
          isOpen ? "w-6 -rotate-45" : "w-5 translate-y-2.5"
        }`}
      />
      {!isOpen && (
        <span className="absolute left-[11px] top-[11px] h-1.5 w-1.5 rounded-full bg-deep-gold/70" />
      )}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] border-b border-oxford-blue/10 bg-ivory/95 shadow-[0_12px_35px_rgba(10,21,38,0.08)] backdrop-blur-xl transition-colors duration-300">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-deep-gold/70 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.6rem] items-center justify-between gap-4">
          <div className="min-w-0">
            <Link href="/" className="group inline-flex items-center gap-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-oxford-blue/10 bg-white/50 p-1 shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:shadow-md sm:h-12 sm:w-12">
                <Image
                  src="/logo.png"
                  alt="Dr. Atul M. Gavaskar Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="max-w-[12rem] text-xl font-bold tracking-tight text-oxford-blue transition-colors duration-300 group-hover:text-deep-gold sm:max-w-none sm:text-[1.8rem] lg:text-[1.95rem]">
                  Dr. Atul M. Gavaskar
                </span>
                <span className="mt-0.5 text-[0.58rem] font-bold uppercase tracking-[0.28em] text-deep-gold/85 sm:text-[0.62rem]">
                  Assistant Professor, PGTD of English
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <div className="flex items-center rounded-full border border-oxford-blue/10 bg-white/75 p-1.5 shadow-lg shadow-oxford-blue/5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch
                    className={`rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-300 ${
                      isActive
                        ? "bg-oxford-blue text-ivory shadow-lg shadow-oxford-blue/15"
                        : "text-oxford-blue/75 hover:bg-deep-gold/10 hover:text-deep-gold"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="group inline-flex items-center justify-center p-0 text-left transition-all duration-300 lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <MobileProfileMark isOpen={isOpen} />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-oxford-blue/8 bg-white/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="grid gap-2">
            {navLinks.map((link, index) => {
              const isActive = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch
                  className={`flex items-center justify-between rounded-[22px] border px-4 py-4 transition-all duration-300 ${
                    isActive
                      ? "border-oxford-blue bg-oxford-blue text-ivory shadow-lg shadow-oxford-blue/15"
                      : "border-oxford-blue/8 bg-white text-oxford-blue hover:border-deep-gold/30 hover:bg-deep-gold/5"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.25em] ${
                        isActive ? "text-deep-gold/80" : "text-deep-gold"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                      {link.name}
                    </span>
                  </span>
                  <span
                    className={`text-lg transition-transform duration-300 ${
                      isActive ? "translate-x-0 text-deep-gold/80" : "text-oxford-blue/35"
                    }`}
                  >
                    &gt;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

