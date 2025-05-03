'use client';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background py-16">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10"></div>
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Smart Investing <br />
              <span className="text-primary">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              StockPulse helps Vietnamese retail investors make informed decisions with real-time
              market data, curated news, and educational resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Get Started
              </button>
              <button className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-sm font-medium">VN-Index</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold">1,245.67</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      +12.45 (+1.01%)
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80">
                      1D
                    </button>
                    <button className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground">
                      1W
                    </button>
                    <button className="px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80">
                      1M
                    </button>
                    <button className="px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80">
                      1Y
                    </button>
                  </div>
                </div>
                <div className="h-40 w-full bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 rounded-lg relative overflow-hidden">
                  <svg viewBox="0 0 100 20" className="absolute bottom-0 w-full h-full">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                      d="M0,10 L5,8 L10,12 L15,10 L20,13 L25,11 L30,14 L35,12 L40,15 L45,13 L50,16 L55,14 L60,17 L65,15 L70,18 L75,16 L80,19 L85,17 L90,20 L95,18 L100,21"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
