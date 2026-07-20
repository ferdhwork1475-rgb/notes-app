edit has a problem with tags o

Check the recent page redesigns and make your edit.
Change a tags to Links
Work on the footer category links.


 <div className="flex flex-wrap justify-center gap-8">
            {relatedArticles.map((related) => (
              <article
                key={related.id}
                onClick={() => navigate(`/articles/${related.slug}`)}
                className="group flex w-full max-w-[360px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={`${uploadPath}${related.image}`}
                    alt={related.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
                    {related.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition">
                    {related.title}
                  </h3>

                  <div className="mt-3 text-sm leading-6 text-slate-500 line-clamp-3 flex-1">
                    <ReactMarkdown>{related.content}</ReactMarkdown>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} />

                          {new Date(related.createdAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock size={13} />
                          {related.readingTime} min read
                        </div>
                      </div>

                      <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                        Read Story
                        <ArrowRight
                          size={16}
                          className="transition group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>