import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-oxford-blue text-ivory pt-24 pb-12 relative overflow-hidden border-t-4 border-deep-gold/20">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-deep-gold/15 via-oxford-blue to-oxford-blue opacity-90"></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-deep-gold/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 pl-4 border-l border-deep-gold/20 md:border-none md:pl-0">
          {/* Brand and University */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-ivory to-ivory/70 tracking-tight">Dr. Atul M. Gavaskar</h2>
            <p className="text-ivory/70 text-sm leading-relaxed font-sans max-w-sm">
              Assistant Professor, Post Graduate Teaching Department of English,<br />
              <span className="text-deep-gold font-bold">Gondwana University, Gadchiroli,</span><br />
              Maharashtra, India.
            </p>
            <div className="flex space-x-6 pt-4">
              <a href="#" className="text-sm font-bold tracking-widest uppercase text-ivory/50 hover:text-deep-gold transition-colors duration-300">LinkedIn</a>
              <a href="#" className="text-sm font-bold tracking-widest uppercase text-ivory/50 hover:text-deep-gold transition-colors duration-300">ResearchGate</a>
              <a href="#" className="text-sm font-bold tracking-widest uppercase text-ivory/50 hover:text-deep-gold transition-colors duration-300">Google Scholar</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto space-y-6">
            <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-deep-gold flex items-center">
              <span className="w-8 h-px bg-deep-gold/50 mr-3"></span>
              Quick Navigation
            </h3>
            <ul className="space-y-4 font-serif text-lg">
              {['About Me', 'Research Publications', 'Students\' Corner', 'Literary Insights', 'Contact Information'].map((item, idx) => {
                const hrefs = ['/about', '/research', '/students', '/blog', '/contact'];
                return (
                  <li key={idx}>
                    <Link href={hrefs[idx]} className="text-ivory/80 hover:text-white transition-colors duration-300 relative group inline-flex items-center space-x-2">
                      <span className="w-0 h-px bg-deep-gold group-hover:w-4 transition-all duration-300 ease-out"></span>
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* NAAC/IQAC info or Contact */}
          <div className="md:ml-auto space-y-6 max-w-xs">
            <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-deep-gold flex items-center">
              <span className="w-8 h-px bg-deep-gold/50 mr-3"></span>
              Affiliation
            </h3>
            <p className="text-ivory/70 text-sm leading-relaxed font-sans">
              Post Graduate Teaching Department of English, Gondwana University.
            </p>
            
            <a href="mailto:gavaskar.atul@unigug.ac.in" className="group block bg-ivory/5 backdrop-blur-md p-6 rounded-2xl border border-ivory/10 hover:bg-ivory/10 hover:border-deep-gold/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-deep-gold/10 transition-all duration-500 relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-deep-gold/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700"></div>
              <p className="text-[10px] text-deep-gold uppercase tracking-widest mb-1 font-bold relative z-10">Official Direct Line</p>
              <p className="text-sm font-serif font-bold text-ivory group-hover:text-white transition-colors relative z-10 tracking-wide">gavaskar.atul@unigug.ac.in</p>
              <svg className="w-5 h-5 absolute bottom-5 right-5 text-ivory/30 group-hover:text-deep-gold transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center text-ivory/40 text-[10px] uppercase tracking-widest font-bold">
          <p className="mb-4 md:mb-0">© {currentYear} Dr. Atul M. Gavaskar. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-deep-gold"></div>
            <p>Academic Digital Identity | Built for Gondwana University</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
