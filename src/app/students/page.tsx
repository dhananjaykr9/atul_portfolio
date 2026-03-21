import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Button from "@/components/Button";
import StudentResourcesClient from "./StudentResourcesClient";
import { prisma } from "@/lib/prisma";
import { withDatabaseFallback } from "@/lib/public-data";
import type { StudentCategory, StudentResource, ExtensionActivity } from "@prisma/client";

export const revalidate = 300;

type CategoryWithResources = StudentCategory & { resources: StudentResource[] };

export default async function Students() {
  const categories = await withDatabaseFallback(
    "student categories",
    () =>
      prisma.studentCategory.findMany({
        include: {
          resources: {
            orderBy: { title: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }),
    [] as CategoryWithResources[]
  );

  const extensionActivities = await withDatabaseFallback(
    "extension activities",
    () =>
      prisma.extensionActivity.findMany({
        orderBy: { createdAt: 'desc' }
      }),
    [] as ExtensionActivity[]
  );

  const totalResources = categories.reduce(
    (sum, category) => sum + category.resources.length,
    0
  );

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-ivory transition-colors">
        {/* Header Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-oxford-blue text-ivory">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/20 via-oxford-blue to-[#0f1f38] opacity-80"></div>
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-[0.2em] text-sm">Learning Portal</h2>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">Students' <br/> Corner</h1>
              <div className="w-24 h-1.5 bg-deep-gold mx-auto rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)]"></div>
              <p className="text-ivory/80 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
                 Access study materials, lecture notes, and additional resources for MA English and Competitive Exams.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
                  <div className="text-2xl font-bold text-ivory">{categories.length}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-deep-gold/90">
                    Study Tracks
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
                  <div className="text-2xl font-bold text-ivory">{totalResources}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-deep-gold/90">
                    Materials
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
                  <div className="text-2xl font-bold text-ivory">{extensionActivities.length}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-deep-gold/90">
                    Activities
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
                  <div className="text-2xl font-bold text-ivory">24x7</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-deep-gold/90">
                    Access Window
                  </div>
                </div>
              </div>
            </div>
          </Container>
          {/* Decorative Elements */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-deep-gold/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute top-12 left-12 w-64 h-64 bg-oxford-blue/40 rounded-full blur-3xl opacity-30"></div>
        </section>

        <Container className="py-24">
          <div className="max-w-6xl mx-auto space-y-32">
            
            {/* Resources Section with Client-Side Search/Filter */}
            <section id="resources" className="scroll-mt-24">
              <div className="mb-16 rounded-[36px] border border-oxford-blue/8 bg-white/70 p-8 shadow-xl shadow-oxford-blue/5 backdrop-blur-md sm:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-deep-gold">
                      Resource Gallery
                    </p>
                    <h2 className="text-4xl font-serif font-bold text-oxford-blue">
                      Study Materials
                    </h2>
                    <div className="h-1 w-16 rounded-full bg-deep-gold"></div>
                    <p className="max-w-2xl text-base leading-relaxed text-oxford-blue/65">
                      Browse category-wise notes, syllabus-oriented readings, exam preparation files,
                      and classroom support material arranged for quick academic use.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#resources"
                      className="rounded-full border border-deep-gold/20 bg-deep-gold/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-oxford-blue transition-colors hover:bg-deep-gold hover:text-oxford-blue"
                    >
                      Browse Resources
                    </a>
                    <a
                      href="#extension"
                      className="rounded-full border border-oxford-blue/10 bg-ivory px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-oxford-blue transition-colors hover:border-deep-gold/40 hover:text-deep-gold"
                    >
                      Extension Work
                    </a>
                  </div>
                </div>
              </div>
              
              <StudentResourcesClient categories={categories as any} />
            </section>

            {/* Extension Activities Section */}
            {extensionActivities.length > 0 && (
              <section id="extension" className="scroll-mt-24">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-serif font-bold text-oxford-blue mb-4">Extension Activities</h2>
                  <div className="w-20 h-1 bg-deep-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {extensionActivities.map((activity: ExtensionActivity) => (
                    <div 
                      key={activity.id} 
                      className="group relative flex h-full flex-col overflow-hidden rounded-[40px] border border-oxford-blue/5 bg-white p-8 shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-deep-gold/5 to-transparent transition-all duration-500 group-hover:scale-150"></div>
                      <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-gradient-to-r from-transparent via-deep-gold/40 to-transparent transition-transform duration-700 origin-left group-hover:scale-x-100"></div>
                      
                      <div className="relative z-10 mb-6 flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-oxford-blue/5 text-oxford-blue transition-all duration-500 group-hover:rotate-6 group-hover:bg-oxford-blue group-hover:text-ivory">
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                           </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-deep-gold px-3 py-1 bg-deep-gold/10 rounded-full w-fit mb-1">{activity.type}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-oxford-blue/40">{activity.date}</span>
                        </div>
                      </div>

                      <h3 className="mb-4 line-clamp-2 text-2xl font-serif font-bold leading-tight text-oxford-blue transition-colors duration-500 group-hover:text-deep-gold">{activity.title}</h3>
                      <p className="mb-6 flex-grow text-sm leading-relaxed text-oxford-blue/60">{activity.description}</p>
                      
                      <div className="flex items-center border-t border-oxford-blue/5 pt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-blue/30">
                        <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {activity.location}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Offline Support Notice */}
            <div className="bg-oxford-blue p-12 rounded-[50px] shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/10 via-transparent to-transparent"></div>
               <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-ivory">
                  <div className="w-24 h-24 bg-ivory/5 backdrop-blur-xl border border-ivory/10 rounded-full flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-700">
                     <svg className="w-10 h-10 text-deep-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                     <h3 className="text-3xl font-serif font-bold tracking-wide">Difficulty Accessing Materials?</h3>
                     <p className="text-ivory/70 font-sans max-w-2xl leading-relaxed">
                       If you are in a low-bandwidth area or cannot download specific files, please reach out via the contact form. Physical copies or alternative links can be arranged for enrolled scholars.
                     </p>
                  </div>
                  <div className="shrink-0">
                    <Button variant="secondary" size="lg" className="rounded-full border border-white/10 shadow-xl shadow-deep-gold/30 hover:scale-105 transition-transform duration-300">
                      <a href="/contact" className="px-6">Contact Coordinator</a>
                    </Button>
                  </div>
               </div>
            </div>

          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
