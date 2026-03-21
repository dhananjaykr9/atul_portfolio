"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Research", href: "/research" },
  { name: "Students' Corner", href: "/students" },
  { name: "Insights", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-ivory/85 backdrop-blur-md border-b border-oxford-blue/10 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex flex-col group">
            <Link href="/" className="text-2xl font-serif font-bold text-oxford-blue tracking-tight group-hover:text-deep-gold transition-colors duration-500">
              Dr. Atul M. Gavaskar
            </Link>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-deep-gold/80 font-sans font-bold">
              Post Graduate Teaching Department
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-oxford-blue px-4 py-2 text-sm font-bold uppercase tracking-widest transition-colors duration-300 group"
              >
                <span className="relative z-10 group-hover:text-deep-gold transition-colors duration-300">{link.name}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-deep-gold -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-oxford-blue hover:text-deep-gold focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 border-b border-oxford-blue/10" : "max-h-0"}`}>
        <div className="bg-ivory/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-oxford-blue block px-4 py-3 text-base font-bold uppercase tracking-widest border-l-2 border-transparent hover:border-deep-gold hover:text-deep-gold hover:bg-deep-gold/5 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
