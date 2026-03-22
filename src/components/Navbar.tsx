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
        className={`absolute h-[2px] rounded-full bg-oxford-blue transition-all duration-300 ${isOpen ? "w-6 rotate-45" : "w-6 -translate-y-2.5"
          }`}
      />
      <span
        className={`absolute h-[2px] rounded-full bg-deep-gold transition-all duration-300 ${isOpen ? "w-6 opacity-0" : "w-8"
          }`}
      />
      <span
        className={`absolute h-[2px] rounded-full bg-oxford-blue transition-all duration-300 ${isOpen ? "w-6 -rotate-45" : "w-5 translate-y-2.5"
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav 
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-in-out ${
        scrolled ? "py-4" : "py-0"
      }`}
    >
      {/* Floating Container */}
      <div className={`mx-auto transition-all duration-500 ease-in-out ${
        scrolled 
          ? "max-w-6xl px-4 sm:px-6" 
          : "max-w-full px-0"
      }`}>
        <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          scrolled 
            ? "rounded-[32px] border border-white/20 bg-ivory/80 shadow-[0_20px_50px_rgba(10,21,38,0.15)] backdrop-blur-2xl ring-1 ring-black/5" 
            : "border-b border-oxford-blue/5 bg-ivory/95"
        }`}>
          {/* Top Gold Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-deep-gold/60 to-transparent" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className={`flex items-center justify-between gap-4 transition-all duration-500 ${
              scrolled ? "h-16 lg:h-20" : "h-[4.6rem] lg:h-[5.5rem]"
            }`}>
              <div className="min-w-0">
                <Link href="/" className="group inline-flex items-center gap-4">
                  <div className={`relative overflow-hidden rounded-2xl border border-oxford-blue/10 bg-white/50 p-1 shadow-sm transition-all duration-500 group-hover:scale-105 ${
                    scrolled ? "h-10 w-10 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-14 sm:w-14"
                  }`}>
                    <Image
                      src="/logo.png"
                      alt="Dr. Atul Gavaskar Logo"
                      fill
                      sizes="(max-width: 640px) 44px, 56px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-serif font-bold tracking-tight text-oxford-blue transition-all duration-500 group-hover:text-deep-gold ${
                      scrolled ? "text-lg sm:text-2xl" : "text-xl sm:text-[2rem]"
                    }`}>
                      Dr. Atul Gavaskar
                    </span>
                    <span className={`font-sans font-bold uppercase tracking-[0.25em] text-deep-gold/80 transition-all duration-500 ${
                      scrolled ? "text-[0.5rem] mt-0" : "text-[0.6rem] mt-0.5"
                    }`}>
                      Assistant Professor, PGTD of English
                    </span>
                  </div>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex lg:items-center">
                <div className="flex items-center gap-1 rounded-full border border-oxford-blue/5 bg-white/40 p-1.5 shadow-inner backdrop-blur-md">
                  {navLinks.map((link) => {
                    const isActive = isActivePath(pathname, link.href);

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        prefetch
                        className={`relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-full ${
                          isActive
                            ? "text-ivory bg-oxford-blue shadow-lg shadow-oxford-blue/20"
                            : "text-oxford-blue/60 hover:text-deep-gold hover:bg-deep-gold/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="group relative z-[110] lg:hidden"
                aria-expanded={isOpen}
              >
                <MobileProfileMark isOpen={isOpen} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[105] bg-oxford-blue/40 backdrop-blur-2xl transition-all duration-700 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className={`absolute inset-y-0 right-0 w-[85vw] sm:w-[400px] bg-ivory shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')] pointer-events-none" />
          
          <div className="flex flex-col h-full p-8 pt-24 sm:p-12 relative z-10">
            {/* Close Button Inside Menu */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-2xl bg-oxford-blue/5 text-oxford-blue hover:bg-oxford-blue hover:text-white transition-all duration-300"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-deep-gold font-sans font-bold uppercase tracking-[0.3em] text-[10px] mb-8 opacity-60 pl-2">Navigation Menu</h2>
            <div className="space-y-3">
              {navLinks.map((link, i) => {
                const isActive = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group flex items-center justify-between p-6 rounded-[24px] transition-all duration-500 ${
                      isActive 
                        ? "bg-oxford-blue text-ivory shadow-2xl shadow-oxford-blue/20" 
                        : "hover:bg-deep-gold/5 text-oxford-blue border border-oxford-blue/5"
                    }`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`font-serif italic text-xl ${isActive ? "text-deep-gold" : "text-deep-gold/40"}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-lg font-bold uppercase tracking-[0.15em]">{link.name}</span>
                    </div>
                    <svg className={`w-6 h-6 transition-transform duration-500 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:opacity-40"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-10 border-t border-oxford-blue/5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-oxford-blue/5">
                <div className="h-12 w-12 rounded-full bg-deep-gold/20 flex items-center justify-center text-xl">🎓</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-oxford-blue">Dr. Atul Gavaskar</p>
                  <p className="text-[10px] font-medium text-oxford-blue/60">Assistant Professor of English</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

