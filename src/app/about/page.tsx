import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { withDatabaseFallback } from "@/lib/public-data";
import type { Education, Experience } from "@prisma/client";

export const revalidate = 300;

const fallbackEducationEntries = [
  {
    id: "fallback-phd",
    degree: "PhD in English",
    institution: "RTMNU, Nagpur",
    year: "2025",
    details: "Doctoral qualification awarded from RTM Nagpur University.",
  },
  {
    id: "fallback-ma",
    degree: "MA in English",
    institution: "RTMNU, Nagpur",
    year: "--",
    details: "Postgraduate study in English language and literature.",
  },
  {
    id: "fallback-ba",
    degree: "BA in English",
    institution: "RTMNU, Nagpur",
    year: "--",
    details: "Undergraduate foundation in English studies.",
  },
  {
    id: "fallback-set",
    degree: "SET Qualified",
    institution: "State Eligibility Test",
    year: "--",
    details: "Qualified through the State Eligibility Test for academic teaching standards.",
  },
] as const;

export default async function About() {
  const education = await withDatabaseFallback(
    "about education",
    () => prisma.education.findMany({ orderBy: { order: "asc" } }),
    [] as Education[]
  );
  const experience = await withDatabaseFallback(
    "about experience",
    () => prisma.experience.findMany({ orderBy: { order: "asc" } }),
    [] as Experience[]
  );

  const yearsOfService = "15+";
  const educationEntries = education.length > 0 ? education : fallbackEducationEntries;
  const profileHighlights = [
    "English Literature and literary criticism",
    "American Literature, Indian Diaspora, and Linguistics",
    "Mentorship of MA students and active PhD supervision",
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.14),transparent_26%),linear-gradient(180deg,#f9f7f2_0%,#f7f3eb_45%,#f9f7f2_100%)] pb-12 pt-[5rem] sm:pb-16 sm:pt-[5.5rem] lg:pb-20 lg:pt-[6rem] transition-colors">
        <Container>
          <div className="mx-auto max-w-6xl space-y-8 sm:space-y-10 lg:space-y-12">
            <section className="mt-4 grid gap-6 lg:mt-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
              <article className="relative overflow-hidden rounded-[34px] border border-oxford-blue/8 bg-white/82 p-7 shadow-[0_22px_70px_rgba(21,34,54,0.07)] backdrop-blur-sm sm:p-8 lg:p-9">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-deep-gold/10 blur-3xl" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Biography</p>
                <div className="relative mt-4 space-y-4 text-base leading-8 text-oxford-blue/76 sm:mt-5 sm:space-y-5 sm:text-lg">
                  <p>
                    <span className="float-left pr-3 font-serif text-6xl font-bold leading-none text-deep-gold sm:text-7xl">D</span>
                    r. Atul M. Gavaskar is a dedicated academician and researcher whose work reflects a deep commitment to English Studies, classroom excellence, and the scholarly development of students from diverse social and regional backgrounds.
                  </p>
                  <p>
                    His research interests engage with <span className="font-semibold text-oxford-blue">American Literature, Indian Diaspora, and Linguistics</span>, with a sustained concern for how literary thought intersects with contemporary realities, particularly within the tribal and rural contexts of Gadchiroli and surrounding regions.
                  </p>
                  <p className="rounded-[24px] border-l-4 border-deep-gold bg-gradient-to-r from-deep-gold/10 to-transparent px-5 py-4 text-oxford-blue/78">
                    As a mentor, he has guided numerous postgraduate learners and continues to supervise research scholars with an emphasis on careful reading, disciplined inquiry, and socially meaningful scholarship.
                  </p>
                </div>
              </article>

              <aside className="rounded-[34px] border border-oxford-blue/8 bg-[linear-gradient(180deg,rgba(27,54,93,0.96),rgba(27,54,93,0.9))] p-7 text-ivory shadow-[0_22px_70px_rgba(21,34,54,0.16)] sm:p-8 lg:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Academic Focus</p>
                <h2 className="mt-4 font-serif text-3xl font-bold text-white">Areas that define his academic profile</h2>
                <div className="mt-6 space-y-3 sm:space-y-4">
                  {profileHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-deep-gold" />
                      <p className="text-sm leading-7 text-ivory/82">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-[26px] border border-deep-gold/25 bg-deep-gold/10 p-5 sm:mt-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-deep-gold">Current Role</p>
                  <p className="mt-3 font-serif text-2xl font-bold text-white">Assistant Professor</p>
                  <p className="mt-2 text-sm leading-7 text-ivory/75">Post Graduate Teaching Department of English, Gondwana University, Gadchiroli.</p>
                </div>
              </aside>
            </section>

            <section className="rounded-[36px] border border-oxford-blue/8 bg-white/75 px-6 py-8 shadow-[0_18px_60px_rgba(21,34,54,0.06)] backdrop-blur-sm sm:px-8 sm:py-10 lg:px-10 lg:py-11">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Educational Qualifications</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-oxford-blue sm:text-4xl">Academic formation and intellectual grounding</h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-oxford-blue/65">
                  A concise timeline of qualifications that shaped his grounding in literary studies and university teaching.
                </p>
              </div>

              <div className="relative mt-8 border-l border-oxford-blue/10 pl-6 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-gradient-to-b before:from-deep-gold/60 before:via-deep-gold/20 before:to-transparent sm:mt-10 sm:pl-10">
                {educationEntries.length > 0 ? (
                  educationEntries.map((edu) => (
                    <div key={edu.id} className="group relative mb-6 last:mb-0 sm:mb-8">
                      <span className="absolute -left-[33px] top-8 h-4 w-4 rounded-full border-4 border-deep-gold bg-ivory shadow-[0_0_16px_rgba(197,160,89,0.55)] transition duration-300 group-hover:scale-125 sm:-left-[41px]" />
                      <article className="rounded-[28px] border border-oxford-blue/8 bg-ivory/90 p-5 shadow-[0_16px_40px_rgba(21,34,54,0.05)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_55px_rgba(21,34,54,0.08)] sm:p-6 lg:p-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-deep-gold">{edu.year}</p>
                            <h3 className="mt-3 font-serif text-2xl font-bold text-oxford-blue">{edu.degree}</h3>
                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-oxford-blue/55">{edu.institution}</p>
                          </div>
                        </div>
                        <p className="mt-4 border-l-2 border-oxford-blue/10 pl-4 text-sm leading-7 text-oxford-blue/72 sm:mt-5">{edu.details}</p>
                      </article>
                    </div>
                  ))
                ) : null}
              </div>
            </section>

            <section className="rounded-[36px] border border-oxford-blue/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,247,242,0.98))] px-6 py-8 shadow-[0_18px_60px_rgba(21,34,54,0.06)] sm:px-8 sm:py-10 lg:px-10 lg:py-11">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Professional Experience</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-oxford-blue sm:text-4xl">Teaching, service, and institutional contribution</h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-oxford-blue/65">
                  Roles and responsibilities that reflect his long-term engagement with literary education and academic administration.
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6">
                {experience.length > 0 ? (
                  experience.map((exp) => (
                    <article key={exp.id} className="group relative overflow-hidden rounded-[30px] border border-oxford-blue/8 bg-white/88 p-6 shadow-[0_16px_45px_rgba(21,34,54,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(21,34,54,0.1)] sm:p-7 lg:p-8">
                      <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-deep-gold/10 blur-3xl transition duration-500 group-hover:scale-125" />
                      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-deep-gold/55 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
                        <div className="max-w-3xl">
                          <h3 className="font-serif text-2xl font-bold text-oxford-blue sm:text-3xl">{exp.role}</h3>
                          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-oxford-blue/55">{exp.institution}</p>
                        </div>
                        <span className="inline-flex w-fit items-center rounded-full bg-oxford-blue px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ivory shadow-[0_10px_25px_rgba(27,54,93,0.2)]">
                          {exp.period}
                        </span>
                      </div>
                      <p className="relative mt-5 max-w-4xl text-sm leading-8 text-oxford-blue/74 sm:mt-6 sm:text-base">{exp.description}</p>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[28px] border border-dashed border-oxford-blue/15 bg-white/70 p-6 text-sm leading-7 text-oxford-blue/60">
                    Experience records will appear here once they are available from the database.
                  </div>
                )}
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
