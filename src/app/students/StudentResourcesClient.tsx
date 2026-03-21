"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Container from "@/components/Container";
import Button from "@/components/Button";
import type { StudentCategory, StudentResource } from "@prisma/client";

type CategoryWithResources = StudentCategory & { resources: StudentResource[] };

export default function StudentResourcesClient({ categories }: { categories: CategoryWithResources[] }) {
  const [query, setQuery] = useState("");

  const allItems = useMemo(() => {
    return categories.flatMap(cat => cat.resources.map((item: StudentResource) => ({ ...item, categoryTitle: cat.title })));
  }, [categories]);

  const fuse = useMemo(() => new Fuse(allItems, {
    keys: ["title", "categoryTitle"],
    threshold: 0.3
  }), [allItems]);

  const searchResults = query ? fuse.search(query).map(r => r.item) : null;

  return (
    <>
        {/* Search Section */}
        <section className="py-12 border-b border-oxford-blue/10  bg-white/50  backdrop-blur-md relative z-20">
          <Container>
            <div className="max-w-3xl mx-auto">
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-deep-gold/40 to-oxford-blue/40 rounded-2xl blur-xl opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"></div>
                 <input 
                   type="text" 
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   placeholder="Search for notes, syllabus, or topics (e.g. 'Drama', 'Semester I')..." 
                   className="relative w-full bg-white border border-oxford-blue/10 px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-gold/50 font-sans shadow-2xl transition-all placeholder-oxford-blue/20 text-oxford-blue"
                 />
                 <div className="absolute right-6 top-1/2 -translate-y-1/2 text-deep-gold">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                 </div>
               </div>
               {query && (
                 <p className="mt-4 text-xs text-oxford-blue/60  font-sans animate-in fade-in tracking-wider uppercase font-bold ml-2">
                   Showing results for <span className="text-deep-gold">&quot;{query}&quot;</span>
                 </p>
               )}
            </div>
          </Container>
        </section>

        {/* Resources Content */}
        <section className="py-20">
          <Container>
            {query ? (
              <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif font-bold text-oxford-blue  mb-8 border-b border-deep-gold/30 pb-4">Search Results ({searchResults?.length || 0})</h2>
                <div className="space-y-4">
                  {searchResults?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white  shadow-md border border-oxford-blue/5  rounded-xl hover:shadow-lg hover:-translate-y-1 hover:border-deep-gold/50 transition-all duration-300 group">
                      <div className="flex items-center space-x-6">
                         <div className="p-4 bg-oxford-blue/5  text-oxford-blue  rounded-lg group-hover:bg-oxford-blue group-hover:text-ivory transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                         </div>
                         <div>
                            <span className="text-[10px] text-deep-gold border border-deep-gold/20 px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest mb-2 inline-block">{item.categoryTitle}</span>
                            <h4 className="text-xl font-serif font-bold text-oxford-blue  leading-tight group-hover:text-deep-gold transition-colors">{item.title}</h4>
                            <span className="text-xs text-oxford-blue/50  font-bold uppercase tracking-widest mt-2 block">{item.type} • {item.size}</span>
                         </div>
                      </div>
                      <a href={item.url || "#"} target="_blank" rel="noopener noreferrer" className="p-3 text-oxford-blue/40 hover:text-deep-gold hover:bg-deep-gold/10 rounded-full transition-colors flex-shrink-0">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                         </svg>
                      </a>
                    </div>
                  ))}
                  {searchResults?.length === 0 && (
                    <div className="text-center py-20 bg-white/50  rounded-xl border-2 border-dashed border-oxford-blue/10 ">
                       <p className="text-oxford-blue/50  font-serif text-xl">No materials found matching your search. Try different keywords.</p>
                       <Button variant="outline" size="sm" className="mt-6" onClick={() => setQuery("")}>Clear Search</Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {categories.map((cat, idx) => (
                  <div key={idx} className="bg-white p-10 md:p-14 shadow-2xl border border-oxford-blue/5 rounded-[40px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-deep-gold/5 rounded-bl-[100px] -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-700"></div>
                    <div className="mb-12 relative z-10">
                       <h2 className="text-4xl font-serif font-bold text-oxford-blue mb-4 tracking-tight">{cat.title}</h2>
                       <div className="w-16 h-1.5 bg-deep-gold rounded-full mb-8"></div>
                       <p className="text-oxford-blue/70 text-lg leading-relaxed border-l-4 border-deep-gold/30 pl-6">{cat.description}</p>
                    </div>

                    <div className="space-y-6 relative z-10">
                      {cat.resources.map((item: StudentResource, i: number) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-ivory/30 rounded-3xl border border-oxford-blue/5 hover:border-deep-gold/40 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group/item">
                          <div className="flex items-center space-x-6">
                             <div className="w-14 h-14 bg-white text-oxford-blue rounded-2xl shadow-lg flex items-center justify-center border border-oxford-blue/5 group-hover/item:bg-oxford-blue group-hover/item:text-ivory transition-all duration-500">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                             </div>
                             <div>
                                <h4 className="text-lg md:text-xl font-serif font-bold text-oxford-blue leading-tight group-hover/item:text-deep-gold transition-colors mb-1">{item.title}</h4>
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-bold text-deep-gold bg-deep-gold/10 px-2 py-0.5 rounded uppercase tracking-widest">{item.type}</span>
                                  <span className="text-[10px] font-bold text-oxford-blue/40 uppercase tracking-widest">{item.size}</span>
                                </div>
                             </div>
                          </div>
                          <a href={item.url || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-oxford-blue/30 hover:text-deep-gold hover:bg-deep-gold/10 rounded-full transition-all duration-500">
                             <svg className="w-6 h-6 group-hover/item:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                             </svg>
                          </a>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-12 pt-10 border-t border-oxford-blue/5 relative z-10 w-full">
                       <Button variant="outline" size="lg" className="w-full justify-center rounded-2xl hover:bg-oxford-blue hover:text-ivory transition-all duration-500">Explore Course Directory</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
    </>
  );
}
