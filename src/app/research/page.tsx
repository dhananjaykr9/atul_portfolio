import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { prisma } from "@/lib/prisma";
import type { Publication, Scholar, Conference } from "@prisma/client";

export const revalidate = 300;

export default async function Research() {
  const publications = await prisma.publication.findMany({
    orderBy: { year: 'desc' }
  });

  const scholars = await prisma.scholar.findMany({
    orderBy: { year: 'desc' }
  });

  const conferences = await prisma.conference.findMany({
    orderBy: { year: 'desc' }
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-ivory transition-colors">
        {/* Header Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-oxford-blue text-ivory">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/20 via-oxford-blue to-[#0f1f38] opacity-80"></div>
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-[0.2em] text-sm">Scholarly Production</h2>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">Research &amp; <br/> Publications</h1>
              <div className="w-24 h-1.5 bg-deep-gold mx-auto rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)]"></div>
              <p className="text-ivory/80 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed italic">
                 "Literature is the safe and traditional vehicle through which we learn about the world."
              </p>
            </div>
          </Container>
          {/* Decorative Orbs */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-deep-gold/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-oxford-blue/60 rounded-full blur-3xl opacity-50"></div>
        </section>

        <Container className="py-24">
          <div className="max-w-5xl mx-auto space-y-32">
            
            {/* Peer-Reviewed Publications */}
            <section id="publications" className="scroll-mt-24">
              <div className="flex items-center space-x-6 mb-16">
                <h2 className="text-4xl font-serif font-bold text-oxford-blue shrink-0">Publications</h2>
                <div className="h-px bg-oxford-blue/10 flex-grow"></div>
              </div>
              <div className="grid gap-12">
                {publications.map((pub: Publication) => (
                  <div key={pub.id} className="group relative bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-oxford-blue/5 shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(15,31,56,0.1)] hover:-translate-y-2 transition-all duration-700 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-deep-gold/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-deep-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    
                    <div className="flex flex-col lg:flex-row gap-10 items-start relative z-10">
                      <div className="w-full lg:w-1/3 aspect-[3/4] relative rounded-3xl overflow-hidden shadow-lg border border-oxford-blue/10 shrink-0 bg-zinc-200">
                         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-oxford-blue/5 to-ivory">
                           <svg className="w-12 h-12 text-oxford-blue/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                           </svg>
                           <span className="text-[10px] uppercase tracking-widest font-bold text-oxford-blue/40 px-4">Scholarly Journal Publication</span>
                         </div>
                      </div>
                      <div className="flex-grow space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold font-sans uppercase tracking-[0.2em]">
                          <span className="text-deep-gold bg-deep-gold/10 px-4 py-1.5 rounded-full border border-deep-gold/20 shadow-sm">{pub.year}</span>
                          <span className="text-oxford-blue/60">{pub.journal}</span>
                          <span className="text-oxford-blue/30 lg:border-l lg:border-oxford-blue/20 lg:pl-4">{pub.type}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-oxford-blue leading-tight group-hover:text-deep-gold transition-colors duration-500">
                          {pub.title}
                        </h3>
                        {pub.abstract && (
                          <p className="text-oxford-blue/70 text-base md:text-lg leading-relaxed font-sans border-l-2 border-deep-gold/20 pl-6 italic">
                            {pub.abstract}
                          </p>
                        )}
                        {pub.link && (
                          <div className="pt-6">
                            <a 
                              href={pub.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-oxford-blue hover:text-deep-gold transition-all duration-300 group/btn translate-y-0 hover:-translate-y-1"
                            >
                              <span className="border-b-2 border-deep-gold/50 group-hover/btn:border-deep-gold pb-1">Access Publication</span>
                              <svg className="w-4 h-4 ml-3 transform group-hover/btn:translate-x-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Current Research / PhD Supervision */}
            {scholars.length > 0 && (
              <section id="supervision" className="scroll-mt-24">
                <div className="flex items-center space-x-6 mb-16">
                  <h2 className="text-4xl font-serif font-bold text-oxford-blue shrink-0">PhD Supervision</h2>
                  <div className="h-px bg-oxford-blue/10 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {scholars.map((scholar: Scholar) => (
                    <div key={scholar.id} className="bg-white p-10 rounded-[40px] border border-oxford-blue/5 shadow-lg hover:shadow-2xl hover:shadow-oxford-blue/10 transition-all duration-700 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-deep-gold/5 rounded-bl-[60px] group-hover:scale-150 transition-transform duration-700 origin-top-right"></div>
                      <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                        <svg className="w-12 h-12 text-oxford-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <div className="space-y-6">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block ${scholar.status === 'Awarded' ? 'bg-green-100 text-green-800' : 'bg-oxford-blue text-ivory'}`}>
                          {scholar.status}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-oxford-blue leading-tight group-hover:text-deep-gold transition-colors duration-500">{scholar.name}</h3>
                        <p className="text-oxford-blue/70 text-base leading-relaxed font-sans group-hover:text-oxford-blue transition-colors duration-500 italic">
                          "{scholar.topic}"
                        </p>
                        <div className="pt-4 flex items-center text-[11px] font-bold text-oxford-blue/40 uppercase tracking-[0.2em] border-t border-oxford-blue/5">
                          Reg / Award Year: {scholar.year}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Conference Archive */}
            {conferences.length > 0 && (
              <section id="conferences" className="scroll-mt-24">
                <div className="flex items-center space-x-6 mb-16">
                  <h2 className="text-4xl font-serif font-bold text-oxford-blue shrink-0">Conference Archive</h2>
                  <div className="h-px bg-oxford-blue/10 flex-grow"></div>
                </div>
                <div className="space-y-6">
                  {conferences.map((conf: Conference) => (
                    <div key={conf.id} className="flex flex-col md:flex-row md:items-center bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-oxford-blue/5 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                      <div className="md:w-32 shrink-0 text-3xl font-serif font-bold text-deep-gold/40 mb-4 md:mb-0 group-hover:text-deep-gold transition-colors duration-500">
                        {conf.year}
                      </div>
                      <div className="flex-grow space-y-2">
                        <h4 className="text-xl font-serif font-bold text-oxford-blue tracking-wide">{conf.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans font-bold text-oxford-blue/50 uppercase tracking-widest">
                          <span className="flex items-center">
                            <span className="w-3 h-px bg-oxford-blue/30 mr-2"></span>
                            {conf.event}
                          </span>
                          <span className="flex items-center text-deep-gold/60">
                            <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {conf.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
