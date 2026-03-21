import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import ContactForm from "@/app/contact/ContactForm";

const professionalChannels = [
  {
    label: "Official Email",
    value: "gavaskar.atul@unigug.ac.in",
    href: "mailto:gavaskar.atul@unigug.ac.in",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Personal Email",
    value: "gavaskaratul@gmail.com",
    href: "mailto:gavaskaratul@gmail.com",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Phone Number",
    value: "9923104703",
    href: "tel:9923104703",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "View LinkedIn Profile",
    href: "https://in.linkedin.com/in/atul-gavaskar-89b10734a?trk=org-employees",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h.01M7 12v5m5-5v5m0-5a3 3 0 013 3v2m-3-5a3 3 0 00-3 3v2m3-5V8m5 9h1a1 1 0 001-1V7a1 1 0 00-1-1H6a1 1 0 00-1 1v9a1 1 0 001 1h1" />
      </svg>
    ),
  },
  {
    label: "Office Hours",
    value: "Mon - Fri | 11:00 AM - 04:00 PM",
    icon: (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-ivory">
        <section className="relative overflow-hidden bg-oxford-blue py-20 text-ivory sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-deep-gold/20 via-[#0a1526] to-oxford-blue"></div>
          <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-deep-gold/30 to-transparent"></div>
          <Container className="relative z-10">
            <div className="relative max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-deep-gold/10 blur-[100px] sm:-right-20 sm:-top-20 sm:h-64 sm:w-64 -z-10 animate-pulse"></div>
              <h2 className="mb-4 flex items-center text-sm font-bold uppercase tracking-widest text-deep-gold font-sans">
                <span className="mr-3 h-px w-8 bg-deep-gold/50"></span>
                Official Channels
              </h2>
              <h1 className="bg-gradient-to-r from-ivory to-ivory/70 bg-clip-text text-4xl font-serif font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-7xl">
                Get in Touch with
                <br />
                Dr. Atul
              </h1>
              <p className="mt-6 max-w-2xl border-l-2 border-deep-gold/30 pl-4 text-base leading-relaxed text-ivory/70 font-sans sm:text-lg md:text-xl">
                For academic inquiries, research collaborations, or student support,
                please reach out through our professional communication channels.
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-ivory py-16 transition-colors sm:py-20 lg:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-left duration-700">
                <div className="group relative overflow-hidden rounded-[32px] border border-oxford-blue/5 bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
                  <div className="absolute -mr-8 -mt-8 right-0 top-0 h-28 w-28 rounded-bl-[80px] bg-deep-gold/5 transition-transform duration-700 group-hover:scale-110 sm:h-32 sm:w-32"></div>
                  <h3 className="mb-6 border-b border-oxford-blue/5 pb-5 text-2xl font-serif font-bold text-oxford-blue sm:mb-8 sm:text-3xl">University Address</h3>
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-oxford-blue text-ivory shadow-lg shadow-oxford-blue/20 transition-all duration-500 group-hover:bg-deep-gold group-hover:shadow-deep-gold/40 sm:h-14 sm:w-14">
                      <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-3 text-xl font-serif font-bold tracking-tight text-oxford-blue sm:text-2xl">PGTD of English</p>
                      <p className="border-l-4 border-deep-gold/30 pl-4 text-base leading-relaxed text-oxford-blue/60 font-sans sm:pl-6 sm:text-lg">
                        Gondwana University, MIDC Road,
                        <br />
                        Complex, Gadchiroli - 442605,
                        <br />
                        Maharashtra, India.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-[32px] border border-oxford-blue/5 bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
                  <div className="absolute -mr-8 -mt-8 right-0 top-0 h-28 w-28 rounded-bl-[80px] bg-deep-gold/5 transition-transform duration-700 group-hover:scale-110 sm:h-32 sm:w-32"></div>
                  <h3 className="mb-6 border-b border-oxford-blue/5 pb-5 text-2xl font-serif font-bold text-oxford-blue sm:mb-8 sm:text-3xl">Professional Channels</h3>
                  <div className="space-y-6 sm:space-y-8">
                    {professionalChannels.map((channel) => {
                      const content = (
                        <>
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-oxford-blue/5 bg-ivory text-deep-gold shadow-sm transition-all duration-500 group-hover/item:bg-oxford-blue group-hover/item:text-ivory sm:h-14 sm:w-14">
                            {channel.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-blue/30">{channel.label}</p>
                            <p className="break-words text-base font-bold tracking-tight text-oxford-blue font-sans sm:text-lg">{channel.value}</p>
                          </div>
                        </>
                      );

                      return channel.href ? (
                        <a
                          key={channel.label}
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                          className="group/item flex items-start gap-4 sm:gap-6"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={channel.label} className="group/item flex items-start gap-4 sm:gap-6">
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-oxford-blue p-6 text-ivory shadow-2xl sm:p-8 lg:p-10">
                  <div className="absolute -mr-8 -mt-8 right-0 top-0 h-28 w-28 rounded-bl-[80px] bg-deep-gold/15 transition-transform duration-700 group-hover:scale-110 sm:h-32 sm:w-32"></div>
                  <h4 className="relative z-10 mb-6 flex items-center text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-deep-gold sm:mb-8">
                    <span className="mr-3 h-px w-8 bg-deep-gold/50"></span>
                    Academic Networks
                  </h4>
                  <div className="relative z-10 flex flex-wrap gap-3 sm:gap-4">
                    <a href="https://www.researchgate.net/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md transition-all duration-500 hover:border-deep-gold hover:bg-deep-gold hover:text-oxford-blue sm:px-6">
                      ResearchGate
                    </a>
                    <a href="https://www.academia.edu/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md transition-all duration-500 hover:border-deep-gold hover:bg-deep-gold hover:text-oxford-blue sm:px-6">
                      Academia.edu
                    </a>
                    <a href="https://scholar.google.com/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md transition-all duration-500 hover:border-deep-gold hover:bg-deep-gold hover:text-oxford-blue sm:px-6">
                      Google Scholar
                    </a>
                    <a href="https://in.linkedin.com/in/atul-gavaskar-89b10734a?trk=org-employees" className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md transition-all duration-500 hover:border-deep-gold hover:bg-deep-gold hover:text-oxford-blue sm:px-6">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative z-10 animate-in fade-in slide-in-from-right duration-700 rounded-[32px] border-t-[10px] border-deep-gold bg-white p-6 shadow-2xl sm:p-8 lg:rounded-[40px] lg:p-14">
                <h3 className="mb-8 border-b border-oxford-blue/5 pb-5 text-3xl font-serif font-bold text-oxford-blue sm:text-4xl">Send a Message</h3>
                <ContactForm />
                <div className="mt-8 rounded-2xl border border-deep-gold/10 bg-deep-gold/5 p-5 sm:mt-12 sm:p-6">
                  <p className="text-center text-xs tracking-tight text-oxford-blue/60 font-sans">
                    <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-deep-gold">Note:</span>
                    Professional communications will be prioritized. Please include your scholar ID or PRN if applicable.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-oxford-blue/5 bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-oxford-blue/10 bg-zinc-100 shadow-inner sm:h-96 xl:rounded-xl">
              <iframe
                src="https://maps.google.com/maps?q=Gondwana+University,+MIDC+Rd,+Complex,+Gadchiroli,+Maharashtra+442605&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-10 h-full w-full"
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
