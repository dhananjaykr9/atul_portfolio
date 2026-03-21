import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { withDatabaseFallback } from "@/lib/public-data";
import type { Publication } from "@prisma/client";

export const revalidate = 300;

export default async function Home() {
  // Fetch the 2 most recently added publications
  const latestPublications = await withDatabaseFallback(
    "home publications",
    () =>
      prisma.publication.findMany({
        orderBy: { createdAt: 'desc' },
        take: 2,
      }),
    [] as Publication[]
  );

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Abstract Background Typography overlay */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10 opacity-5 select-none">
          <span className="font-serif text-[40vw] font-bold text-oxford-blue leading-none tracking-tighter mix-blend-multiply -rotate-6">
            &amp;
          </span>
        </div>

        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-ivory/80 backdrop-blur-sm">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 flex flex-col space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                <div className="space-y-6 relative z-10">
                  <div className="absolute -left-10 -top-10 w-32 h-32 bg-deep-gold/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                  <h2 className="text-deep-gold font-sans font-bold uppercase tracking-widest text-sm flex items-center space-x-3">
                    <span className="w-8 h-px bg-deep-gold/50"></span>
                    <span>Assistant Professor | Post Graduate Teaching Department</span>
                  </h2>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-oxford-blue via-oxford-blue to-deep-gold leading-[1.05] drop-shadow-sm pb-2 tracking-tight">
                    Dr. Atul M.<br className="hidden md:block"/> Gavaskar
                  </h1>
                </div>

                <p className="text-base md:text-lg text-oxford-blue/80 leading-relaxed font-sans max-w-xl border-l-4 border-deep-gold pl-4">
                  Specializing in American Literature, Indian Diaspora, and Linguistics.
                  Dedicated to fostering critical thinking and literary appreciation at
                  Gondwana University, Gadchiroli.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button variant="primary" size="lg" className="rounded-none relative group overflow-hidden shadow-xl shadow-deep-gold/20">
                    <span className="absolute inset-0 bg-gradient-to-r from-deep-gold via-[#e3c280] to-deep-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></span>
                    <Link href="/research" className="relative z-10 text-ivory group-hover:text-oxford-blue font-bold tracking-widest transition-colors duration-500">View Research</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-none group hover:bg-oxford-blue hover:text-ivory transition-all duration-500 border-oxford-blue">
                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <svg className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download CV
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-serif font-bold text-oxford-blue">10+</span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-tighter text-oxford-blue/60 font-bold">Years Experience</span>
                  </div>
                  <div className="h-8 md:h-10 w-px bg-oxford-blue/10"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-serif font-bold text-oxford-blue">25+</span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-tighter text-oxford-blue/60 font-bold">Publications</span>
                  </div>
                  <div className="h-8 md:h-10 w-px bg-oxford-blue/10"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-serif font-bold text-oxford-blue">200+</span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-tighter text-oxford-blue/60 font-bold">Students Mentored</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative animate-in fade-in zoom-in-95 duration-1000 delay-150 fill-mode-both flex justify-center lg:justify-end">
                <div className="relative aspect-[4/5] w-full max-w-sm lg:max-w-md rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl shadow-oxford-blue/20 border-4 border-white/80 bg-zinc-200 group hover:-translate-y-2 transition-transform duration-700 ease-out">
                  <Image
                    src="/portrait1.jpg"
                    alt="Dr. Atul M. Gavaskar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue/60 via-oxford-blue/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700 mix-blend-multiply"></div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-deep-gold/30 -z-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -top-12 -right-8 w-64 h-64 bg-oxford-blue/15 -z-10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </Container>
        </section>

        {/* Quick Links / Sections Highlight */}
        <section className="py-32 bg-oxford-blue text-ivory relative overflow-hidden">
          {/* Subtle noise or texture could go here; using a radial gradient instead */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/15 via-oxford-blue to-[#0f1f38]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f1f38] to-transparent z-0"></div>

          <Container className="relative z-10">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 mx-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">Academic Pillars</h2>
              <div className="w-20 h-1 bg-deep-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Research Hub",
                  desc: "Explore peer-reviewed publications, current PhD scholars, and conference archives.",
                  href: "/research",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H12" />
                    </svg>
                  )
                },
                {
                  title: "Students' Corner",
                  desc: "Access structured MA English study materials and SET/NET coaching resources.",
                  href: "/students",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                },
                {
                  title: "Insights & Blog",
                  desc: "Read literary essays, semantic analyses, and bilingual scholarly musings.",
                  href: "/blog",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  )
                }
              ].map((pillar, idx) => (
                <Link key={idx} href={pillar.href} className="group flex-1">
                  <div className="bg-ivory/5 backdrop-blur-xl border border-ivory/10 p-10 h-full rounded-3xl hover:bg-gradient-to-br hover:from-ivory/10 hover:to-ivory/5 hover:-translate-y-3 hover:shadow-2xl hover:shadow-deep-gold/20 transition-all duration-700 relative overflow-hidden group-hover:border-deep-gold/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-deep-gold/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-[1.5] duration-700 ease-out"></div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-deep-gold/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="w-16 h-16 bg-deep-gold/10 text-deep-gold rounded-2xl shadow-inner flex items-center justify-center mb-10 group-hover:bg-deep-gold group-hover:text-oxford-blue transition-all duration-500 transform group-hover:-rotate-3">
                      {pillar.icon}
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-4 text-ivory group-hover:text-white transition-colors relative z-10 tracking-wide">{pillar.title}</h3>
                    <p className="text-ivory/70 text-base leading-relaxed group-hover:text-ivory/90 transition-colors relative z-10 font-sans">
                      {pillar.desc}
                    </p>

                    <div className="mt-10 flex items-center text-deep-gold text-xs font-bold tracking-widest uppercase relative z-10 group-hover:text-ivory transition-colors">
                      Enter Portal
                      <svg className="w-4 h-4 ml-3 group-hover:ml-5 transition-all duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Highlighted Research Paper */}
        <section className="py-24 bg-ivory">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between font-serif mb-12 border-b border-oxford-blue/10 pb-6 animate-in fade-in duration-700 text-center md:text-left gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-oxford-blue tracking-tight">Latest Research</h2>
              <Link href="/research" className="text-xs font-sans font-bold uppercase tracking-widest text-deep-gold hover:text-oxford-blue transition-colors flex items-center group">
                View All Publications
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="space-y-8 relative">
              {/* Decorative Background Element */}
              <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-deep-gold/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

              {latestPublications.map((pub: Publication, index: number) => (
                <div key={pub.id} className="bg-white/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl border border-oxford-blue/5 rounded-3xl relative overflow-hidden group hover:shadow-deep-gold/10 hover:-translate-y-2 transition-all duration-700">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-deep-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 transform origin-left"></div>
                  
                  <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
                    <div className="bg-gradient-to-br from-oxford-blue/5 to-transparent p-6 md:p-8 shrink-0 flex items-center justify-center rounded-2xl border border-oxford-blue/5 shadow-inner group-hover:border-deep-gold/20 transition-colors duration-500">
                      <svg className="w-16 h-16 text-deep-gold/60 transform group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="space-y-5 flex-1">
                      <div className="flex items-center space-x-3 text-[10px] md:text-xs uppercase tracking-widest font-bold font-sans">
                        <span className="text-deep-gold bg-deep-gold/10 border border-deep-gold/20 px-3 py-1 rounded-full">{pub.year}</span>
                        <span className="text-oxford-blue/70">{pub.journal}</span>
                        <span className="text-oxford-blue/40 border-l border-oxford-blue/20 pl-3">{pub.type}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-oxford-blue group-hover:text-deep-gold transition-colors duration-500 leading-snug">
                        {pub.title}
                      </h3>
                      {pub.link && (
                        <div className="pt-4">
                          <Button variant="outline" size="sm" className="group-hover:bg-oxford-blue group-hover:text-ivory group-hover:border-oxford-blue transition-all duration-500 flex items-center shadow-lg hover:shadow-xl">
                            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              Read Full Publication
                              <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
