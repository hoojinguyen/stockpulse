'use client';

export const CtaSection = () => {
  return (
    <section className="container">
      <div className="rounded-xl bg-primary/10 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to start investing?</h2>
            <p className="text-muted-foreground">
              Create an account to track your favorite stocks, get personalized news, and access
              premium educational content.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Sign Up Now
            </button>
            <button className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
