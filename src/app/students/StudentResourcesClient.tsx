"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Container from "@/components/Container";
import Button from "@/components/Button";
import type { StudentCategory, StudentResource } from "@prisma/client";

type CategoryWithResources = StudentCategory & { resources: StudentResource[] };

type SearchItem = StudentResource & {
  categoryTitle: string;
};

export default function StudentResourcesClient({
  categories,
}: {
  categories: CategoryWithResources[];
}) {
  const [query, setQuery] = useState("");

  const allItems = useMemo(() => {
    return categories.flatMap((category) =>
      category.resources.map((item) => ({
        ...item,
        categoryTitle: category.title,
      }))
    );
  }, [categories]);

  const fuse = useMemo(
    () =>
      new Fuse(allItems, {
        keys: ["title", "categoryTitle"],
        threshold: 0.3,
      }),
    [allItems]
  );

  const searchResults = query ? fuse.search(query).map((result) => result.item) : null;
  const totalResources = allItems.length;

  return (
    <>
      <section className="relative z-20 rounded-[36px] border border-oxford-blue/8 bg-white/55 py-10 shadow-xl shadow-oxford-blue/5 backdrop-blur-md">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-deep-gold">
                  Quick Search
                </p>
                <h3 className="mt-2 text-2xl font-serif font-bold text-oxford-blue sm:text-3xl">
                  Find the right material fast
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-oxford-blue/10 bg-ivory px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-oxford-blue/70">
                  {categories.length} Categories
                </span>
                <span className="rounded-full border border-deep-gold/20 bg-deep-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-deep-gold">
                  {totalResources} Resources
                </span>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-deep-gold/40 to-oxford-blue/40 opacity-20 blur-xl transition duration-1000 group-hover:opacity-100 group-hover:duration-300"></div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for notes, syllabus, or topics (e.g. 'Drama', 'Semester I')..."
                className="relative w-full rounded-2xl border border-oxford-blue/10 bg-white px-6 py-5 font-sans text-oxford-blue shadow-2xl transition-all placeholder-oxford-blue/20 focus:outline-none focus:ring-2 focus:ring-deep-gold/50"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-deep-gold">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {query && (
              <p className="ml-2 mt-4 animate-in fade-in text-xs font-bold uppercase tracking-wider text-oxford-blue/60">
                Showing results for <span className="text-deep-gold">&quot;{query}&quot;</span>
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          {query ? (
            <div className="mx-auto max-w-4xl animate-in fade-in duration-500">
              <h2 className="mb-8 border-b border-deep-gold/30 pb-4 text-3xl font-serif font-bold text-oxford-blue">
                Search Results ({searchResults?.length || 0})
              </h2>

              <div className="space-y-4">
                {searchResults?.map((item: SearchItem, i: number) => (
                  <div
                    key={`${item.id}-${i}`}
                    className="group flex items-center justify-between rounded-[28px] border border-oxford-blue/5 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-deep-gold/50 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="rounded-2xl bg-oxford-blue/5 p-4 text-oxford-blue transition-colors group-hover:bg-oxford-blue group-hover:text-ivory">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="mb-2 inline-block rounded-sm border border-deep-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-deep-gold">
                          {item.categoryTitle}
                        </span>
                        <h4 className="text-xl font-serif font-bold leading-tight text-oxford-blue transition-colors group-hover:text-deep-gold">
                          {item.title}
                        </h4>
                        <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-oxford-blue/50">
                          {item.type} | {item.size}
                        </span>
                      </div>
                    </div>

                    <a
                      href={item.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 rounded-full p-3 text-oxford-blue/40 transition-colors hover:bg-deep-gold/10 hover:text-deep-gold"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  </div>
                ))}

                {searchResults?.length === 0 && (
                  <div className="rounded-[28px] border-2 border-dashed border-oxford-blue/10 bg-white/50 py-20 text-center">
                    <p className="font-serif text-xl text-oxford-blue/50">
                      No materials found matching your search. Try different keywords.
                    </p>
                    <Button variant="outline" size="sm" className="mt-6" onClick={() => setQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {categories.map((category, idx) => (
                <div
                  key={`${category.id}-${idx}`}
                  className="group relative overflow-hidden rounded-[40px] border border-oxford-blue/5 bg-white p-10 shadow-2xl md:p-14"
                >
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-bl-[100px] bg-deep-gold/5 transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-deep-gold/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

                  <div className="relative z-10 mb-12">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <h2 className="text-4xl font-serif font-bold tracking-tight text-oxford-blue">
                        {category.title}
                      </h2>
                      <span className="rounded-full border border-deep-gold/20 bg-deep-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-deep-gold">
                        {category.resources.length} files
                      </span>
                    </div>
                    <div className="mb-8 h-1.5 w-16 rounded-full bg-deep-gold"></div>
                    <p className="border-l-4 border-deep-gold/30 pl-6 text-lg leading-relaxed text-oxford-blue/70">
                      {category.description}
                    </p>
                  </div>

                  <div className="relative z-10 space-y-6">
                    {category.resources.map((item: StudentResource, i: number) => (
                      <div
                        key={`${item.id}-${i}`}
                        className="group/item flex items-center justify-between rounded-3xl border border-oxford-blue/5 bg-ivory/30 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-deep-gold/40 hover:bg-white hover:shadow-xl"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-oxford-blue/5 bg-white text-oxford-blue shadow-lg transition-all duration-500 group-hover/item:bg-oxford-blue group-hover/item:text-ivory">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="mb-1 text-lg font-serif font-bold leading-tight text-oxford-blue transition-colors group-hover/item:text-deep-gold md:text-xl">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-3">
                              <span className="rounded bg-deep-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-deep-gold">
                                {item.type}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-oxford-blue/40">
                                {item.size}
                              </span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={item.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-12 w-12 items-center justify-center rounded-full text-oxford-blue/30 transition-all duration-500 hover:bg-deep-gold/10 hover:text-deep-gold"
                        >
                          <svg className="h-6 w-6 transition-transform group-hover/item:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 mt-12 w-full border-t border-oxford-blue/5 pt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full justify-center rounded-2xl transition-all duration-500 hover:bg-oxford-blue hover:text-ivory"
                    >
                      Explore Course Directory
                    </Button>
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
