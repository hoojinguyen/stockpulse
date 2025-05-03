'use client';

export const NewsSection = () => {
  return (
    <section className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Latest Financial News</h2>
        <button className="text-primary hover:underline inline-flex items-center">
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20 group-hover:to-black/30 transition-colors"></div>
              <div className="absolute top-4 left-4 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                {item === 1 ? 'Breaking' : item === 2 ? 'Market Analysis' : 'Company News'}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>{item === 1 ? 'Bloomberg' : item === 2 ? 'Reuters' : 'CafeF'}</span>
                <span>•</span>
                <span>May {item}, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {item === 1
                  ? `Vietnam's Economy Shows Strong Growth in Q2`
                  : item === 2
                    ? 'FPT Shares Surge on New AI Partnership'
                    : 'Central Bank Announces New Policies for Retail Investors'}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {item === 1
                  ? `Vietnam's GDP grew by 6.5% in the second quarter, exceeding expectations and signaling strong economic recovery...`
                  : item === 2
                    ? 'FPT Corporation announced a strategic partnership with a leading AI company, causing shares to rise by 8% in early trading...'
                    : 'The State Bank of Vietnam unveiled new policies aimed at protecting retail investors and promoting market stability...'}
              </p>
              <button className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
