import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Button from "@/components/Button";
import StudentResourcesClient from "./StudentResourcesClient";
import { prisma } from "@/lib/prisma";
import type { ExtensionActivity } from "@prisma/client";

export default async function Students() {
  const categories = await prisma.studentCategory.findMany({
    include: {
      resources: true
    },
    orderBy: {
      order: 'asc'
    }
  });

  const extensionActivities = await prisma.extensionActivity.findMany({
    orderBy: {
      order: 'asc'
    }
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-ivory ">
        {/* Header Section */}
        <section className="bg-oxford-blue text-ivory py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/20 via-[#0a1526] to-oxford-blue"></div>
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-deep-gold/30 to-transparent"></div>
          <Container className="relative z-10">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-deep-gold/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-widest text-sm mb-4 flex items-center">
                <span className="w-8 h-px bg-deep-gold/50 mr-3"></span>
                Digital Academy
              </h2>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ivory to-ivory/70 tracking-tight leading-tight">Student Learning Hub<br/>& Resources</h1>
              <p className="text-ivory/70 leading-relaxed font-sans text-lg md:text-xl max-w-2xl border-l-2 border-deep-gold/30 pl-4">
                Empowering the next generation of scholars with curated academic materials, 
                syllabus guides, and specialized coaching for competitive excellence.
              </p>
            </div>
          </Container>
        </section>

        <StudentResourcesClient categories={categories} />

        {/* Extension Activities */}
        <section className="py-32 bg-ivory/30 relative border-y border-oxford-blue/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent -z-10"></div>
          <Container>
             <div className="text-center md:text-left mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div className="max-w-2xl">
                   <h2 className="text-4xl lg:text-5xl font-serif font-bold text-oxford-blue mb-4 tracking-tight">Academic Extension</h2>
                   <div className="w-20 h-1 bg-deep-gold mb-6 mx-auto md:mx-0 rounded-full"></div>
                   <p className="text-oxford-blue/70 font-sans text-lg md:text-xl border-l-4 border-deep-gold pl-4">
                      Workshops, Guest Lectures, and Departmental Initiatives coordinated by Dr. Atul M. Gavaskar.
                   </p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {extensionActivities.map((act: ExtensionActivity, idx: number) => (
                  <div key={idx} className="bg-white group p-8 rounded-3xl border border-oxford-blue/5 shadow-xl hover:shadow-2xl hover:shadow-deep-gold/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                     <div className="absolute bottom-0 right-0 w-24 h-24 bg-deep-gold/5 rounded-tl-full transition-transform group-hover:scale-[2] duration-700"></div>
                     <div className="w-14 h-14 bg-oxford-blue text-ivory rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-oxford-blue/20 group-hover:bg-deep-gold group-hover:shadow-deep-gold/40 transition-all duration-500">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                     </div>
                     <h3 className="font-serif font-bold text-xl text-oxford-blue mb-3 group-hover:text-deep-gold transition-colors">{act.title}</h3>
                     <p className="text-sm text-oxford-blue/60 leading-relaxed font-sans">{act.description}</p>
                  </div>
                ))}
             </div>
          </Container>
        </section>

        {/* Can't find section */}
        <section className="py-32 bg-white relative">
          <Container>
            <div className="bg-oxford-blue p-10 lg:p-16 shadow-2xl rounded-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-deep-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-deep-gold/5 rounded-full blur-3xl group-hover:bg-deep-gold/10 transition-colors duration-700"></div>
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="max-w-2xl text-center md:text-left">
                    <h3 className="text-3xl lg:text-4xl font-serif font-bold text-ivory mb-4">Can&apos;t find what you&apos;re looking for?</h3>
                    <p className="text-ivory/60 text-lg md:text-xl font-sans leading-relaxed border-l-4 border-deep-gold/50 pl-6">
                      Request specific academic materials or specialized coaching resources 
                      directly from the department.
                    </p>
                 </div>
                 <Button variant="primary" size="lg" className="flex-shrink-0 shadow-2xl shadow-deep-gold/20 hover:scale-105 transition-transform px-10">
                   Contact Department
                 </Button>
               </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
