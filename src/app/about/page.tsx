import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { withDatabaseFallback } from "@/lib/public-data";
import type { Education, Experience } from "@prisma/client";

export const revalidate = 300;

export default async function About() {
  const education = await withDatabaseFallback(
    "about education",
    () => prisma.education.findMany({ orderBy: { order: 'asc' } }),
    [] as Education[]
  );
  const experience = await withDatabaseFallback(
    "about experience",
    () => prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    [] as Experience[]
  );

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-ivory  py-16 lg:py-24 transition-colors">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Biography Section */}
              <div className="relative">
                {/* Decorative glowing graphic behind the biography block */}
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-deep-gold/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="prose prose-lg text-oxford-blue/80 font-sans leading-relaxed relative z-10 bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-oxford-blue/5 shadow-xl">
                  <p className="mb-6">
                    <span className="float-left text-6xl md:text-7xl font-serif font-bold text-deep-gold leading-none pr-3 pb-1 tracking-tighter mix-blend-multiply">D</span>
                    r. Atul M. Gavaskar is a dedicated academician and researcher with over 15 years of experience 
                    in the field of English Literature. Currently serving as an Assistant Professor at the 
                    <span className="font-bold text-oxford-blue"> Post Graduate Teaching Department (PGTD) of English</span>, Gondwana University, Gadchiroli, 
                    he has been instrumental in shaping the academic landscape of the region.
                  </p>
                  <p className="mb-6">
                    His research interests span across <span className="italic">American Literature, Indian Diaspora, and Linguistics</span>. 
                    He is passionate about bridging the gap between traditional literary theory and contemporary 
                    societal contexts, especially within the tribal and rural backdrop of Gadchiroli.
                  </p>
                  <p className="relative border-l-4 border-deep-gold pl-6 mt-8 py-2 bg-gradient-to-r from-deep-gold/5 to-transparent">
                    As a mentor, he has guided numerous MA students and is currently supervising several 
                    PhD scholars, fostering a culture of rigorous inquiry and scholarly excellence.
                  </p>
                </div>
              </div>

            {/* Education Timeline */}
            <section className="mb-24">
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-widest text-sm mb-12 text-center">Educational Qualifications</h2>
              <div className="relative border-l border-oxford-blue/10  ml-4 md:ml-0 before:absolute before:inset-y-0 before:-left-px before:w-0.5 before:bg-gradient-to-b before:from-deep-gold/50 before:via-deep-gold/10 before:to-transparent">
                {education.map((edu: Education, idx: number) => (
                  <div key={idx} className="mb-12 ml-8 relative group">
                    <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-ivory border-4 border-deep-gold shadow-[0_0_15px_rgba(197,160,89,0.7)] group-hover:scale-150 group-hover:bg-deep-gold transition-all duration-500 z-10"></div>
                    <div className="bg-white/80 p-8 rounded-2xl border border-oxford-blue/5 shadow-lg hover:shadow-2xl hover:shadow-deep-gold/10 hover:-translate-y-2 group-hover:border-deep-gold/20 transition-all duration-700 backdrop-blur-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="relative z-10">
                        <span className="text-[10px] md:text-xs font-bold text-deep-gold bg-deep-gold/10 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">{edu.year}</span>
                        <h3 className="text-2xl font-serif font-bold text-oxford-blue mb-2 group-hover:text-deep-gold transition-colors duration-500">{edu.degree}</h3>
                        <p className="text-[11px] md:text-sm font-bold text-oxford-blue/60 uppercase tracking-widest mb-4">{edu.institution}</p>
                        <p className="text-oxford-blue/70 text-sm leading-relaxed border-l-2 border-oxford-blue/10 pl-4 group-hover:border-deep-gold/50 transition-colors duration-500">{edu.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Experience */}
            <section>
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-widest text-sm mb-12 text-center">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map((exp: Experience, idx: number) => (
                  <div key={idx} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-oxford-blue/20 hover:-translate-y-2 group-hover:border-deep-gold/30 transition-all duration-700 border border-oxford-blue/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-deep-gold/10 to-transparent rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700 ease-out"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-oxford-blue/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 transform origin-left"></div>
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 relative z-10">
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-oxford-blue group-hover:text-deep-gold transition-colors duration-500 mb-3">{exp.role}</h3>
                        <p className="text-xs md:text-sm font-bold text-oxford-blue/60 uppercase tracking-widest flex items-center">
                          <span className="w-4 h-px bg-oxford-blue/30 mr-2"></span>
                          {exp.institution}
                        </p>
                      </div>
                      <span className="text-[10px] md:text-xs font-bold bg-oxford-blue text-ivory px-4 py-2 rounded-full mt-6 md:mt-0 inline-flex items-center shadow-lg group-hover:bg-deep-gold group-hover:text-oxford-blue transition-colors duration-500 tracking-widest uppercase">
                        <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-oxford-blue/70 text-base md:text-lg leading-relaxed relative z-10 font-sans">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
