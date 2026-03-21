import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Button from "@/components/Button";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-ivory">
        {/* Contact Header */}
        <section className="bg-oxford-blue text-ivory py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-deep-gold/20 via-[#0a1526] to-oxford-blue"></div>
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-deep-gold/30 to-transparent"></div>
          <Container className="relative z-10">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-deep-gold/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
              <h2 className="text-deep-gold font-sans font-bold uppercase tracking-widest text-sm mb-4 flex items-center">
                <span className="w-8 h-px bg-deep-gold/50 mr-3"></span>
                Official Channels
              </h2>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ivory to-ivory/70 tracking-tight leading-tight">Get in Touch with<br/>the Department</h1>
              <p className="text-ivory/70 leading-relaxed font-sans text-lg md:text-xl max-w-2xl border-l-2 border-deep-gold/30 pl-4">
                For academic inquiries, research collaborations, or student support, 
                please reach out through our professional communication channels.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24 bg-ivory  transition-colors">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Address and Info */}
              <div className="space-y-10 animate-in fade-in slide-in-from-left duration-700">
                <div className="bg-white p-10 rounded-[40px] border border-oxford-blue/5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-deep-gold/5 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
                  <h3 className="text-3xl font-serif font-bold text-oxford-blue mb-8 border-b border-oxford-blue/5 pb-6">University Address</h3>
                  <div className="flex items-start space-x-6">
                    <div className="w-14 h-14 bg-oxford-blue text-ivory rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-oxford-blue/20 group-hover:bg-deep-gold group-hover:shadow-deep-gold/40 transition-all duration-500">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-oxford-blue text-2xl font-serif font-bold mb-3 tracking-tight">PGTD of English</p>
                      <p className="text-oxford-blue/60 font-sans text-lg leading-relaxed border-l-4 border-deep-gold/30 pl-6">
                        Gondwana University, MIDC Road,<br />
                        Complex, Gadchiroli – 442605,<br />
                        Maharashtra, India.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-oxford-blue/5 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-deep-gold/5 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
                  <h3 className="text-3xl font-serif font-bold text-oxford-blue mb-8 border-b border-oxford-blue/5 pb-6">Professional Channels</h3>
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6 group/item">
                        <div className="w-14 h-14 bg-ivory text-deep-gold rounded-2xl flex items-center justify-center shrink-0 border border-oxford-blue/5 group-hover/item:bg-oxford-blue group-hover/item:text-ivory shadow-sm transition-all duration-500">
                           <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                           </svg>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-oxford-blue/30 uppercase tracking-[0.2em] mb-1">Official Email</p>
                           <p className="text-oxford-blue text-lg font-bold font-sans tracking-tight">gavaskar.atul@unigug.ac.in</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 group/item">
                        <div className="w-14 h-14 bg-ivory text-deep-gold rounded-2xl flex items-center justify-center shrink-0 border border-oxford-blue/5 group-hover/item:bg-oxford-blue group-hover/item:text-ivory shadow-sm transition-all duration-500">
                           <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                           </svg>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-oxford-blue/30 uppercase tracking-[0.2em] mb-1">Phone Number</p>
                           <p className="text-oxford-blue text-lg font-bold font-sans tracking-tight">9923104703</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 group/item">
                        <div className="w-14 h-14 bg-ivory text-deep-gold rounded-2xl flex items-center justify-center shrink-0 border border-oxford-blue/5 group-hover/item:bg-oxford-blue group-hover/item:text-ivory shadow-sm transition-all duration-500">
                           <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                           </svg>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-oxford-blue/30 uppercase tracking-[0.2em] mb-1">Office Hours</p>
                           <p className="text-oxford-blue text-lg font-bold font-sans tracking-tight">Mon – Fri | 11:00 AM – 04:00 PM</p>
                        </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-oxford-blue text-ivory p-10 rounded-[40px] shadow-2xl border border-white/10 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-deep-gold/15 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
                   <h4 className="text-deep-gold font-serif font-bold uppercase tracking-[0.2em] text-[10px] mb-8 relative z-10 flex items-center">
                     <span className="w-8 h-px bg-deep-gold/50 mr-3"></span>
                     Academic Networks
                   </h4>
                   <div className="flex flex-wrap gap-4 relative z-10">
                      {["ResearchGate", "Academia.edu", "Google Scholar", "LinkedIn"].map((net) => (
                        <a key={net} href="#" className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-deep-gold hover:border-deep-gold hover:text-oxford-blue transition-all duration-500 shadow-sm backdrop-blur-md">
                           {net}
                        </a>
                      ))}
                   </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-10 lg:p-14 shadow-2xl rounded-[40px] border-t-[10px] border-deep-gold relative z-10 animate-in fade-in slide-in-from-right duration-700">
                <h3 className="text-4xl font-serif font-bold text-oxford-blue mb-10 border-b border-oxford-blue/5 pb-6">Send a Message</h3>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-oxford-blue/40 uppercase tracking-[0.2em] ml-2">Full Name</label>
                       <input type="text" placeholder="e.g. Rahul Sharma" className="w-full bg-ivory/30 border border-oxford-blue/10 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-gold/30 focus:border-deep-gold/50 transition-all font-sans text-oxford-blue placeholder-oxford-blue/20" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-oxford-blue/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                       <input type="email" placeholder="rahul@example.com" className="w-full bg-ivory/30 border border-oxford-blue/10 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-gold/30 focus:border-deep-gold/50 transition-all font-sans text-oxford-blue placeholder-oxford-blue/20" />
                    </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-oxford-blue/40 uppercase tracking-[0.2em] ml-2">Subject</label>
                     <input type="text" placeholder="Academic Inquiry" className="w-full bg-ivory/30 border border-oxford-blue/10 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-gold/30 focus:border-deep-gold/50 transition-all font-sans text-oxford-blue placeholder-oxford-blue/20" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-oxford-blue/40 uppercase tracking-[0.2em] ml-2">Your Message</label>
                     <textarea rows={6} placeholder="Detailed message here..." className="w-full bg-ivory/30 border border-oxford-blue/10 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-deep-gold/30 focus:border-deep-gold/50 transition-all font-sans resize-none text-oxford-blue placeholder-oxford-blue/20"></textarea>
                  </div>
                  <Button variant="primary" size="lg" className="w-full mt-6 py-5 rounded-2xl shadow-xl shadow-deep-gold/20 hover:scale-[1.02] transition-transform">
                    Submit Message
                  </Button>
                </form>
                <div className="mt-12 p-6 bg-deep-gold/5 rounded-2xl border border-deep-gold/10">
                   <p className="text-xs text-oxford-blue/60 text-center font-sans tracking-tight">
                     <span className="font-bold uppercase tracking-wider text-deep-gold mr-2 text-[10px]">Note:</span> 
                     Professional communications will be prioritized. Please include your scholar ID 
                     or PRN if applicable.
                   </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Maps Placeholder */}
        <section className="py-24 bg-white  border-t border-oxford-blue/5 ">
           <Container>
              <div className="bg-zinc-100  h-96 w-full rounded-xl border border-oxford-blue/10 shadow-inner overflow-hidden relative">
                 <iframe 
                   src="https://maps.google.com/maps?q=Gondwana+University,+MIDC+Rd,+Complex,+Gadchiroli,+Maharashtra+442605&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }}
                   allowFullScreen={true}
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="absolute inset-0 z-10 w-full h-full"
                   name="Google Maps Gondwana University"
                   title="Gondwana University Location"
                 ></iframe>
              </div>
           </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
