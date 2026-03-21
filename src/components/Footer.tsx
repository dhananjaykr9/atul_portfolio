import Link from "next/link";

const navItems = [
  { label: "About Me", href: "/about" },
  { label: "Research Publications", href: "/research" },
  { label: "Students' Corner", href: "/students" },
  { label: "Literary Insights", href: "/blog" },
  { label: "Contact Information", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-4 border-deep-gold/20 bg-oxford-blue pb-10 pt-16 text-ivory sm:pb-12 sm:pt-20 lg:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-deep-gold/15 via-oxford-blue to-oxford-blue opacity-90"></div>
      <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-deep-gold/50 to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3 md:gap-10 lg:gap-12">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="bg-gradient-to-r from-ivory to-ivory/70 bg-clip-text text-2xl font-serif font-bold tracking-tight text-transparent sm:text-3xl">
              Dr. Atul M. Gavaskar
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/70 font-sans">
              Assistant Professor, Post Graduate Teaching Department of English,
              <br />
              <span className="font-bold text-deep-gold">Gondwana University, Gadchiroli,</span>
              <br />
              Maharashtra, India.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-3 pt-2 sm:pt-4">
              <a href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-ivory/50 transition-colors duration-300 hover:text-deep-gold sm:text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-ivory/50 transition-colors duration-300 hover:text-deep-gold sm:text-sm">
                ResearchGate
              </a>
              <a href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-ivory/50 transition-colors duration-300 hover:text-deep-gold sm:text-sm">
                Google Scholar
              </a>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 md:mx-auto md:w-full md:max-w-xs">
            <h3 className="flex items-center text-sm font-sans font-bold uppercase tracking-widest text-deep-gold">
              <span className="mr-3 h-px w-8 bg-deep-gold/50"></span>
              Quick Navigation
            </h3>
            <ul className="grid gap-3 font-serif text-base sm:text-lg">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 py-1 text-ivory/80 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-deep-gold transition-all duration-300 ease-out group-hover:w-4"></span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-sm space-y-5 sm:space-y-6 md:ml-auto md:max-w-xs">
            <h3 className="flex items-center text-sm font-sans font-bold uppercase tracking-widest text-deep-gold">
              <span className="mr-3 h-px w-8 bg-deep-gold/50"></span>
              Affiliation
            </h3>
            <p className="text-sm leading-relaxed text-ivory/70 font-sans">
              Post Graduate Teaching Department of English, Gondwana University.
            </p>

            <a
              href="mailto:gavaskar.atul@unigug.ac.in"
              className="group relative mt-2 block overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/5 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-deep-gold/40 hover:bg-ivory/10 hover:shadow-xl hover:shadow-deep-gold/10 sm:mt-6 sm:p-6"
            >
              <div className="absolute -mr-4 -mt-4 right-0 top-0 h-24 w-24 rounded-bl-full bg-deep-gold/10 transition-transform duration-700 group-hover:scale-150"></div>
              <p className="relative z-10 mb-1 text-[10px] font-bold uppercase tracking-widest text-deep-gold">
                Official Direct Line
              </p>
              <p className="relative z-10 pr-8 break-all text-sm font-serif font-bold tracking-wide text-ivory transition-colors group-hover:text-white sm:break-normal sm:text-base">
                gavaskar.atul@unigug.ac.in
              </p>
              <svg
                className="absolute bottom-5 right-5 h-5 w-5 text-ivory/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-deep-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-center text-[10px] font-bold uppercase tracking-widest text-ivory/40 sm:mt-16 sm:pt-8 md:flex-row md:items-center md:justify-between md:text-left lg:mt-20">
          <p>&copy; {currentYear} Dr. Atul M. Gavaskar. All rights reserved.</p>
          <div className="flex items-center justify-center space-x-2 md:justify-end">
            <div className="h-1.5 w-1.5 rounded-full bg-deep-gold"></div>
            <p>Academic Digital Identity | Built for Gondwana University</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
