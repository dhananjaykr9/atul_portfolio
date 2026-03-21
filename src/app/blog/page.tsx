import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@prisma/client";

export const revalidate = 300;

export default async function Blog() {
  const posts = await prisma.blogPost.findMany({ 
    where: { published: true },
    orderBy: { date: 'desc' }
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
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-[0.2em] text-sm">Academic Musings</h2>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">Literary <br/> Insights</h1>
              <div className="w-24 h-1.5 bg-deep-gold mx-auto rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)]"></div>
              <p className="text-ivory/80 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed italic opacity-90">
                Exploring the intersections of language, culture, and diaspora through scholarly essays.
              </p>
            </div>
          </Container>
          {/* Animated Orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-deep-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-oxford-blue/40 rounded-full blur-3xl"></div>
        </section>

        <Container className="py-24">
          <div className="max-w-5xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {posts.map((post: BlogPost, idx: number) => (
                  <article 
                    key={post.id} 
                    className="group bg-white rounded-[40px] overflow-hidden border border-oxford-blue/5 shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(15,31,56,0.15)] hover:-translate-y-2 transition-all duration-700 flex flex-col h-full opacity-0 animate-in fade-in slide-in-from-bottom-10 fill-mode-both"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="aspect-[16/10] bg-zinc-200 relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-oxford-blue/10 to-deep-gold/10 mix-blend-multiply opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                         <h4 className="text-oxford-blue/10 font-serif font-bold text-4xl leading-tight select-none uppercase pointer-events-none group-hover:scale-110 transition-transform duration-700">
                           {post.category}
                         </h4>
                      </div>
                      <div className="absolute top-6 left-6 whitespace-nowrap">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-oxford-blue text-ivory px-4 py-1.5 rounded-full shadow-lg group-hover:bg-deep-gold group-hover:text-oxford-blue transition-colors duration-500">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
                    </div>

                    <div className="p-10 flex flex-col flex-grow space-y-6 relative">
                      <div className="flex items-center space-x-4 text-[11px] font-bold font-sans uppercase tracking-[0.2em] text-oxford-blue/40">
                         <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                         <span className="w-1.5 h-1.5 rounded-full bg-deep-gold/40"></span>
                         <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-3xl font-serif font-bold text-oxford-blue group-hover:text-deep-gold transition-colors duration-500 leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-oxford-blue/70 text-base leading-relaxed font-sans line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="pt-6 mt-auto">
                         <div className="flex items-center text-xs font-bold uppercase tracking-widest text-deep-gold group-hover:text-oxford-blue transition-colors duration-300">
                            Read Essay
                            <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-3 transition-transform duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                         </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-deep-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white/40 backdrop-blur-md rounded-[50px] border border-oxford-blue/5">
                <div className="w-20 h-20 bg-deep-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                   <svg className="w-10 h-10 text-deep-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H12" />
                   </svg>
                </div>
                <h3 className="text-3xl font-serif font-bold text-oxford-blue mb-4">No Essays Published Yet</h3>
                <p className="text-oxford-blue/60 font-sans max-w-sm mx-auto">Check back soon for scholarly insights and pedagogical reflections.</p>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
