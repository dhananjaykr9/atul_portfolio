import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { prisma } from "@/lib/prisma";
import type { Publication, Scholar, Conference } from "@prisma/client";

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
      <main className="flex-grow bg-ivory  transition-colors">
        {/* Research Header */}
        <section className="bg-oxford-blue text-ivory py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-deep-gold/20 via-[#0a1526] to-oxford-blue"></div>
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-deep-gold/50 to-transparent"></div>
          <Container className="relative z-10">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
              <div className="absolute -left-10 -top-10 w-48 h-48 bg-deep-gold/15 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-widest text-sm mb-4 flex items-center">
                <span className="w-8 h-px bg-deep-gold/50 mr-3"></span>
                Research Hub
              </h2>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ivory to-ivory/70 tracking-tight leading-tight">Scholarly Contributions<br/>& Supervision</h1>
              <p className="text-ivory/70 leading-relaxed font-sans text-lg md:text-xl max-w-2xl border-l-2 border-deep-gold/30 pl-4">
                Exploring the nuances of American Literature, the complexities of the Indian Diaspora, 
                and the practical applications of Linguistics in modern education.
              </p>
            </div>
          </Container>
        </section>

        {/* Publications Section */}
        <section className="py-20">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-oxford-blue/10 pb-6">
              <h2 className="text-3xl font-serif font-bold text-oxford-blue">Selected Publications</h2>
              <span className="text-xs font-bold text-deep-gold uppercase tracking-widest mt-2 md:mt-0">Journal Articles | Peer-Reviewed</span>
            </div>

            <div className="space-y-6">
              {publications.map((pub: Publication, idx: number) => (
                <div key={idx} className="bg-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg rounded-xl border-l-4 border-deep-gold group hover:shadow-2xl hover:shadow-oxford-blue/10 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-deep-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="max-w-3xl relative z-10">
                    <div className="flex items-center space-x-3 mb-3">
                       <span className="text-[10px] font-bold bg-oxford-blue/5 text-oxford-blue/60 px-3 py-1 rounded-sm uppercase tracking-wider">{pub.type}</span>
                       <span className="text-xs font-bold text-deep-gold px-2 border-l border-oxford-blue/10">{pub.year}</span>
                    </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-oxford-blue group-hover:text-deep-gold transition-colors duration-500 leading-snug">
                        {pub.title}
                      </h3>
                      {pub.abstract && (
                        <p className="text-oxford-blue/70 text-sm md:text-base leading-relaxed font-sans border-l-2 border-deep-gold/20 pl-4 py-1 italic">
                          {pub.abstract}
                        </p>
                      )}
                      <p className="text-oxford-blue/60 italic text-sm">{pub.journal}</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-6 md:mt-0 flex-shrink-0 relative z-10 group-hover:bg-oxford-blue group-hover:text-ivory group-hover:border-oxford-blue transition-all duration-500 flex items-center">
                    PDF / View
                    <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* PhD Supervision Section */}
        {scholars.length > 0 && (
          <section className="py-32 bg-ivory/20 relative border-y border-oxford-blue/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-deep-gold/5 to-transparent -z-10"></div>
            <Container className="relative z-10">
              <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                 <div>
                   <h2 className="text-4xl lg:text-5xl font-serif font-bold text-oxford-blue mb-4 tracking-tight">PhD Supervision</h2>
                   <div className="w-20 h-1 bg-deep-gold mb-6 mx-auto md:mx-0 rounded-full"></div>
                   <p className="text-oxford-blue/70 max-w-2xl font-sans text-lg">
                     Guidance and supervision of research scholars pursuing their doctoral degrees under Gondwana University.
                   </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholars.map((scholar: Scholar, idx: number) => (
                <div key={idx} className="bg-white border border-oxford-blue/5 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-deep-gold/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-deep-gold/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-[2] duration-700 ease-out"></div>
                   
                   <div className="relative z-10">
                     <div className="flex justify-between items-start mb-8">
                        <div className="p-4 bg-oxford-blue/5 text-oxford-blue rounded-lg group-hover:bg-oxford-blue group-hover:text-ivory transition-colors duration-500 shadow-inner">
                           <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                           </svg>
                        </div>
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest transition-colors duration-500 ${scholar.status === 'Ongoing' ? 'bg-deep-gold/10 text-deep-gold border border-deep-gold/20 group-hover:bg-deep-gold group-hover:text-oxford-blue' : 'bg-green-500/10 text-green-600 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white'}`}>
                           {scholar.status}
                        </span>
                     </div>
                     <h3 className="text-xl font-serif font-bold text-oxford-blue mb-3 group-hover:text-deep-gold transition-colors duration-300">{scholar.name}</h3>
                     <p className="text-xs font-bold text-oxford-blue/50 uppercase tracking-widest mb-4">Reg. Year: <span className="text-oxford-blue/80">{scholar.year}</span></p>
                     <p className="text-sm text-oxford-blue/70 italic leading-relaxed border-l-2 border-oxford-blue/10 pl-3 group-hover:border-deep-gold transition-colors duration-500">&quot;{scholar.topic}&quot;</p>
                   </div>
                </div>
              ))}
            </div>
            
              <div className="mt-20 bg-white/60 backdrop-blur-xl p-10 lg:p-16 border border-deep-gold/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-deep-gold/5 via-transparent to-deep-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="max-w-2xl relative z-10">
                   <h4 className="text-3xl text-oxford-blue font-serif font-bold mb-4">Prospective Scholars</h4>
                   <p className="text-lg text-oxford-blue/80 mb-0 leading-relaxed border-l-4 border-deep-gold pl-4">
                     Currently accepting applications for research in American Literature and Post-Colonial Studies. 
                     Candidates must have a valid NET/SET or PET qualification.
                   </p>
                 </div>
                 <Button variant="primary" size="lg" className="flex-shrink-0 relative z-10 shadow-xl shadow-deep-gold/20">Download PET Syllabus</Button>
              </div>
            </Container>
          </section>
        )}

        {/* Conference Participation */}
        {conferences.length > 0 && (
          <section className="py-32 relative bg-white">
            <Container>
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-oxford-blue/10 pb-6">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-oxford-blue tracking-tight">Conference Archive</h2>
                <span className="text-xs font-bold text-deep-gold uppercase tracking-widest mt-2 md:mt-0 flex items-center">
                  National & International
                  <span className="w-8 h-px bg-deep-gold ml-3"></span>
                </span>
              </div>
              
              <div className="overflow-x-auto rounded-2xl border border-oxford-blue/5 shadow-2xl">
                <table className="w-full text-left border-collapse whitespace-nowrap md:whitespace-normal">
                  <thead>
                    <tr className="bg-oxford-blue border-b border-oxford-blue/10">
                      <th className="px-8 py-6 font-sans font-bold uppercase tracking-widest text-[10px] text-ivory/80">Paper Title</th>
                      <th className="px-8 py-6 font-sans font-bold uppercase tracking-widest text-[10px] text-ivory/80">Conference / Seminar</th>
                      <th className="px-8 py-6 font-sans font-bold uppercase tracking-widest text-[10px] text-ivory/80 text-right w-32">Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {conferences.map((conf: Conference, idx: number) => (
                      <tr key={idx} className="border-b border-oxford-blue/5 hover:bg-ivory/40 transition-colors group cursor-default">
                        <td className="px-8 py-6 font-serif font-bold text-oxford-blue text-lg group-hover:text-deep-gold transition-colors">{conf.title}</td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-sm text-oxford-blue/80">{conf.event}</p>
                          <p className="text-xs font-bold text-oxford-blue/50 uppercase tracking-widest mt-1 border-l-2 border-deep-gold/30 pl-2">{conf.location}</p>
                        </td>
                      <td className="px-6 py-5 text-sm font-bold text-deep-gold text-right">{conf.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
        )}
      </main>
      <Footer />
    </>
  );
}
