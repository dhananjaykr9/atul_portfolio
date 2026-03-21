import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@prisma/client";

export default async function Blog() {
  const posts = await prisma.blogPost.findMany({ 
    where: { published: true },
    orderBy: { date: 'desc' } 
  });


  const categories = ["All", "Literary Theory", "Book Reviews", "Regional Literature", "University News"];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-ivory">
        {/* Blog Header */}
        <section className="bg-oxford-blue text-ivory py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-deep-gold/20 via-[#0a1526] to-oxford-blue"></div>
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-deep-gold/50 to-transparent"></div>
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
              <div className="absolute left-1/2 -top-10 -translate-x-1/2 w-64 h-64 bg-deep-gold/15 rounded-full blur-[100px] -z-10 animate-pulse"></div>
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-widest text-sm mb-4 inline-flex items-center">
                <span className="w-8 h-px bg-deep-gold/50 mr-3"></span>
                The Scholarly Journal
                <span className="w-8 h-px bg-deep-gold/50 ml-3"></span>
              </h2>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ivory to-ivory/70 tracking-tight leading-tight">Literary Insights<br/>& Academic Reflections</h1>
              <p className="text-ivory/70 leading-relaxed font-sans text-lg md:text-xl max-w-2xl mx-auto italic border-x-2 border-deep-gold/20 px-8">
                &quot;Literature is where I go to explore the highest and lowest places in human society and in the human spirit.&quot;
              </p>
            </div>
          </Container>
        </section>

        {/* Filter Section */}
        <section className="py-10 bg-white border-b border-oxford-blue/5 sticky top-20 z-30 shadow-sm backdrop-blur-xl bg-white/80">
          <Container>
             <div className="flex flex-wrap justify-center gap-4">
                {categories.map((cat, idx) => (
                  <button 
                    key={idx} 
                    className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-full ${idx === 0 ? 'bg-oxford-blue text-ivory shadow-lg shadow-oxford-blue/20' : 'bg-ivory/40 text-oxford-blue/60 hover:text-oxford-blue hover:bg-ivory shadow-sm border border-oxford-blue/5'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </Container>
        </section>

        {/* Blog Posts Listing */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {posts.map((post: BlogPost) => (
                <article key={post.id} className="group relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-deep-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl -z-10"></div>
                   <div className="bg-white h-full p-10 lg:p-14 rounded-[40px] border border-oxford-blue/5 shadow-xl group-hover:shadow-[0_40px_80px_-15px_rgba(27,54,93,0.1)] group-hover:-translate-y-3 transition-all duration-700 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-deep-gold/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
                      
                      <div className="flex items-center justify-between mb-10 relative z-10">
                         <span className="text-[10px] font-bold text-deep-gold uppercase tracking-[0.2em] bg-deep-gold/5 px-4 py-1.5 rounded-full border border-deep-gold/10">
                            {post.category}
                         </span>
                         <div className="flex items-center text-[10px] font-bold text-oxford-blue/30 uppercase tracking-widest space-x-3">
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span className="w-1 h-1 bg-deep-gold/30 rounded-full"></span>
                            <span>{post.readTime}</span>
                         </div>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-oxford-blue mb-6 group-hover:text-deep-gold transition-colors leading-[1.2] tracking-tight relative z-10">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      
                      <p className="text-oxford-blue/70 text-lg leading-relaxed mb-10 font-sans flex-grow border-l-4 border-deep-gold/20 pl-6 relative z-10">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-10 border-t border-oxford-blue/5 relative z-10 mt-auto">
                         <div className="flex items-center gap-2">
                           <span className="w-6 h-px bg-deep-gold/50"></span>
                           <span className="text-[10px] font-bold text-oxford-blue/40 uppercase tracking-widest">{post.language} Edition</span>
                         </div>
                         <Link href={`/blog/${post.slug}`} className="group/link text-oxford-blue font-bold uppercase tracking-[0.2em] text-[10px] inline-flex items-center hover:text-deep-gold transition-all">
                            Read Journal
                            <div className="ml-3 w-10 h-10 border border-oxford-blue/10 rounded-full flex items-center justify-center group-hover/link:bg-deep-gold group-hover/link:border-deep-gold group-hover/link:text-ivory transition-all duration-500">
                               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                               </svg>
                            </div>
                         </Link>
                      </div>
                   </div>
                </article>
              ))}
            </div>
            
            <div className="mt-20 text-center">
               <button className="inline-flex items-center justify-center px-8 py-3 bg-oxford-blue text-ivory font-bold uppercase tracking-widest text-xs hover:bg-oxford-blue/90 transition-all">
                  Load Older Articles
               </button>
            </div>
          </Container>
        </section>

        {/* Newsletter / Subscription */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-oxford-blue/10 to-transparent"></div>
          <Container>
            <div className="max-w-4xl mx-auto bg-oxford-blue p-12 lg:p-20 rounded-[50px] relative overflow-hidden ring-1 ring-white/10 shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deep-gold/20 via-transparent to-transparent"></div>
               <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-deep-gold/5 rounded-full blur-3xl"></div>
               
               <div className="relative z-10 text-center">
                  <h3 className="text-4xl lg:text-5xl font-serif font-bold text-ivory mb-6 tracking-tight">Stay Informed</h3>
                  <p className="text-ivory/60 mb-12 font-sans text-lg max-w-xl mx-auto leading-relaxed border-l-4 border-deep-gold/50 pl-8 inline-block text-left">
                    Subscribe to receive notifications when new literary critiques, research findings, 
                    or university announcements are published.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                     <input 
                       type="email" 
                       placeholder="Enter your professional email" 
                       className="flex-grow px-8 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-deep-gold/50 text-ivory placeholder-white/20 backdrop-blur-md"
                     />
                     <button className="bg-deep-gold hover:bg-deep-gold/90 text-oxford-blue px-10 py-4 font-bold uppercase tracking-[0.2em] text-[10px] rounded-full shadow-xl shadow-deep-gold/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                       Notify Me
                     </button>
                  </form>
               </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
