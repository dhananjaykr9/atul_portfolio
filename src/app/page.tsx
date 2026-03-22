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
        <section className="relative min-h-[90vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-oxford-blue">
          {/* Unified Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1e3a63] via-oxford-blue to-oxford-blue"></div>
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] rounded-full bg-deep-gold/5 blur-[120px] animate-pulse"></div>

          <Container className="relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Text Side */}
              <div className="order-2 lg:order-1 flex flex-col space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000 py-10 lg:py-20 text-center lg:text-left">
                <div className="space-y-4 lg:space-y-6 relative z-10">
                  <h2 className="text-deep-gold font-sans font-bold uppercase tracking-[0.25em] lg:tracking-[0.3em] text-[10px] sm:text-xs lg:text-sm flex items-center justify-center lg:justify-start space-x-3">
                    <span className="w-8 lg:w-12 h-px bg-deep-gold/50 hidden sm:block"></span>
                    <span>Assistant Professor | PGTD of English</span>
                  </h2>

                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-ivory via-ivory to-ivory/80 leading-[0.95] lg:leading-[0.9] drop-shadow-2xl pb-2 lg:pb-4 tracking-tighter">
                    Dr. Atul Gavaskar
                  </h1>
                </div>

                <div className="max-w-xl mx-auto lg:mx-0">
                  <p className="text-base sm:text-lg lg:text-xl text-ivory/80 leading-relaxed font-sans border-l-4 border-deep-gold pl-5 lg:pl-6 text-left">
                    Specializing in <span className="font-bold text-ivory">American Literature</span>,
                    <span className="font-bold text-ivory"> Indian Diaspora</span>, and
                    <span className="font-bold text-ivory"> Linguistics</span>.
                    Dedicated to fostering critical thinking and literary appreciation at
                    Gondwana University, Gadchiroli.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 lg:gap-6 pt-2 lg:pt-4">
                  <Button variant="secondary" size="lg" className="rounded-xl relative group overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.3)] px-8 lg:px-10 py-4 lg:py-5">
                    <span className="absolute inset-0 bg-gradient-to-r from-deep-gold via-[#e3c280] to-deep-gold z-0 animate-shimmer-fast bg-[length:200%_auto]"></span>
                    <Link href="/research" className="relative z-10 text-oxford-blue font-bold tracking-[0.15em] transition-colors duration-500 text-sm lg:text-base">
                      EXPLORE RESEARCH
                    </Link>
                  </Button>

                  <Button variant="outline" size="lg" className="rounded-xl group hover:bg-ivory hover:border-ivory transition-all duration-700 border-2 border-ivory/50 text-white bg-white/10 backdrop-blur-md px-8 lg:px-10 py-4 lg:py-5 shadow-lg">
                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center font-bold tracking-[0.15em] w-full h-full text-sm lg:text-base group-hover:text-oxford-blue transition-colors duration-500">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-3 group-hover:-translate-y-1 transition-transform text-deep-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="whitespace-nowrap">DOWNLOAD CV</span>
                    </a>
                  </Button>
                </div>

                <div className="flex flex-row justify-center lg:justify-start items-center gap-10 sm:gap-12 lg:gap-16 pt-8 lg:pt-10 border-t border-ivory/10">
                  {[
                    { label: "Experience", value: "10+" },
                    { label: "Pubs", value: "25+" },
                    { label: "Mentored", value: "2000+" }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center lg:items-start">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#FFFFFF] !opacity-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{stat.value}</span>
                      <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.25em] text-[#FFFFFF] !opacity-100 font-black mt-1 lg:mt-2 text-center lg:text-left drop-shadow-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Faded Portrait Side */}
              <div className="order-1 lg:order-2 relative h-[450px] sm:h-[550px] lg:h-full lg:min-h-[85vh] animate-in fade-in zoom-in-95 duration-1000 delay-200 -mx-4 sm:-mx-6 lg:mx-0 lg:-mr-[calc((100vw-1280px)/2)] xl:-mr-[calc((100vw-1280px)/2)] lg:w-[calc(100%+((100vw-1024px)/2))] lg:max-w-none w-screen sm:w-full">
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]"></div>

                  {/* Unified Fade Mask: Stays right on Desktop, goes Bottom on Mobile */}
                  <div className="absolute inset-0 bg-gradient-to-r from-oxford-blue via-transparent to-transparent hidden lg:block"></div>
                  <div className="absolute inset-x-0 -bottom-1 h-3/4 bg-gradient-to-t from-oxford-blue via-oxford-blue/80 via-oxford-blue/40 to-transparent lg:hidden"></div>
                </div>

                <div className="relative h-full w-full">
                  <Image
                    src="/portrait1.jpg"
                    alt="Dr. Atul Gavaskar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top lg:object-center grayscale-[15%] brightness-[0.85] contrast-[1.05]"
                    priority
                  />
                  {/* Additional Softening Overlays */}
                  <div className="absolute inset-0 bg-oxford-blue/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </Container>

          {/* Global Bottom Edge Fade - Increased for Mobile to Hide Edge */}
          <div className="absolute bottom-0 left-0 w-full h-32 lg:h-32 bg-gradient-to-t from-oxford-blue via-oxford-blue/60 to-transparent z-30"></div>
        </section>

        {/* Quick Links / Sections Highlight */}
        <section className="py-24 lg:py-32 relative bg-oxford-blue overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-deep-gold/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-deep-gold/5 blur-[100px] rounded-full"></div>

          <Container className="relative z-10">
            <div className="text-center mb-16 lg:mb-20 space-y-4">
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Academic Foundations</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-ivory">Core Pillars of Expertise</h3>
              <div className="w-24 h-1 bg-deep-gold mx-auto mt-6 rounded-full opacity-50 shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Research Hub",
                  desc: "Explore peer-reviewed publications, current PhD scholars, and conference archives.",
                  href: "/research",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H12" />
                    </svg>
                  )
                },
                {
                  title: "Students' Corner",
                  desc: "Access structured MA English study materials and SET/NET coaching resources.",
                  href: "/students",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                },
                {
                  title: "Insights & Blog",
                  desc: "Read literary essays, semantic analyses, and bilingual scholarly musings.",
                  href: "/blog",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  )
                }
              ].map((pillar, idx) => (
                <Link key={idx} href={pillar.href} className="group flex-1">
                  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 h-full rounded-[40px] hover:bg-white/10 hover:border-deep-gold/30 hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-deep-gold/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-125 duration-1000 ease-out"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-deep-gold/5 blur-[60px] rounded-full group-hover:bg-deep-gold/10 transition-colors duration-1000"></div>

                    <div className="w-20 h-20 bg-white/5 text-deep-gold rounded-[24px] border border-white/10 shadow-inner flex items-center justify-center mb-10 group-hover:bg-deep-gold group-hover:text-oxford-blue group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700">
                      {pillar.icon}
                    </div>

                    <h3 className="text-3xl font-serif font-bold mb-5 text-ivory group-hover:text-white transition-colors tracking-tight">{pillar.title}</h3>
                    <p className="text-ivory/60 text-lg leading-relaxed group-hover:text-ivory/90 transition-colors font-sans font-medium mb-8">
                      {pillar.desc}
                    </p>

                    <div className="mt-auto flex items-center text-deep-gold text-[11px] font-bold tracking-[0.25em] uppercase relative z-10 group-hover:text-ivory transition-colors">
                      <span className="mr-4 h-px w-8 bg-deep-gold/40 group-hover:w-12 group-hover:bg-ivory transition-all duration-700"></span>
                      Open Portal
                      <svg className="w-5 h-5 ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-out text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <section className="py-32 bg-[#FDFCF9] relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-ivory to-transparent"></div>

          <Container>
            <div className="flex flex-col md:flex-row items-end justify-between font-serif mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-center md:text-left gap-8">
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-deep-gold/70">Academic Contributions</h2>
                <h2 className="text-5xl md:text-6xl font-bold text-oxford-blue tracking-tighter leading-none">Latest Research</h2>
              </div>
              <Link href="/research" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-deep-gold hover:text-oxford-blue transition-all duration-500 flex items-center group bg-white border border-oxford-blue/5 px-8 py-3 rounded-full shadow-sm hover:shadow-md">
                EXPLORE RESEARCH HUB
                <svg className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="space-y-12 relative">
              {/* Timeline Connector Line */}
              <div className="absolute left-6 md:left-[56px] top-0 bottom-0 w-px bg-gradient-to-b from-deep-gold/0 via-deep-gold/20 to-deep-gold/0 hidden sm:block"></div>

              {latestPublications.map((pub: Publication, index: number) => (
                <div key={pub.id} className="relative group pl-0 sm:pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white bg-deep-gold shadow-[0_0_15px_rgba(197,160,89,0.5)] z-20 hidden sm:block group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="bg-white p-10 md:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-oxford-blue/5 rounded-[40px] relative overflow-hidden group-hover:shadow-[0_40px_100px_-20px_rgba(27,54,93,0.1)] group-hover:-translate-y-2 transition-all duration-700">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start relative z-10">
                      <div className="bg-ivory/50 p-8 shrink-0 flex items-center justify-center rounded-3xl border border-oxford-blue/5 shadow-inner group-hover:border-deep-gold/30 transition-all duration-700 group-hover:bg-white group-hover:rotate-3">
                        <svg className="w-16 h-16 text-deep-gold/50 transform group-hover:scale-110 group-hover:text-deep-gold transition-all duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>

                      <div className="space-y-6 flex-1 text-center lg:text-left">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[10px] font-bold uppercase tracking-[0.25em] font-sans">
                          <span className="text-ivory bg-oxford-blue px-5 py-2 rounded-full shadow-lg shadow-oxford-blue/10">{pub.year}</span>
                          <span className="text-oxford-blue/60">{pub.journal}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-deep-gold/30"></span>
                          <span className="text-deep-gold/80">{pub.type}</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-oxford-blue group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-oxford-blue group-hover:to-deep-gold transition-all duration-700 leading-tight tracking-tight">
                          {pub.title}
                        </h3>

                        {pub.link && (
                          <div className="pt-6">
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-[10px] font-bold tracking-[0.3em] uppercase text-oxford-blue/40 hover:text-deep-gold transition-all duration-500 group/link"
                            >
                              READ FULL MANUSCRIPT
                              <span className="ml-4 h-px w-10 bg-oxford-blue/10 group-hover/link:w-16 group-hover/link:bg-deep-gold transition-all duration-700"></span>
                              <svg className="w-5 h-5 ml-4 opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
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
