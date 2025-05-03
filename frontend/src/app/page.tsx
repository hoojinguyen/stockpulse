import React from "react";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
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
                StockPulse helps Vietnamese retail investors make informed
                decisions with real-time market data, curated news, and
                educational resources.
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
                    <svg
                      viewBox="0 0 100 20"
                      className="absolute bottom-0 w-full h-full"
                    >
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

      {/* Market Highlights */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Gainers</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-green-500"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <ul className="space-y-3">
              {[
                { symbol: "VCB", name: "Vietcombank", change: "+1.70%" },
                { symbol: "VIC", name: "Vingroup", change: "+0.29%" },
                { symbol: "VNM", name: "Vinamilk", change: "+1.25%" },
              ].map((stock) => (
                <li
                  key={stock.symbol}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-green-500 font-medium">
                    {stock.change}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Losers</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-red-500"
              >
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                <polyline points="16 17 22 17 22 11" />
              </svg>
            </div>
            <ul className="space-y-3">
              {[
                { symbol: "FPT", name: "FPT Corporation", change: "-1.05%" },
                { symbol: "MSN", name: "Masan Group", change: "-0.87%" },
                { symbol: "HPG", name: "Hoa Phat Group", change: "-0.65%" },
              ].map((stock) => (
                <li
                  key={stock.symbol}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-red-500 font-medium">{stock.change}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Market Volume</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary"
              >
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-6" />
              </svg>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Total Volume
                </div>
                <div className="font-medium">1.2B shares</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="font-medium">$3.5B</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Advancing/Declining
                </div>
                <div className="font-medium">156/124</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Latest Financial News
          </h2>
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
                  {item === 1
                    ? "Breaking"
                    : item === 2
                      ? "Market Analysis"
                      : "Company News"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>
                    {item === 1
                      ? "Bloomberg"
                      : item === 2
                        ? "Reuters"
                        : "CafeF"}
                  </span>
                  <span>•</span>
                  <span>May {item}, 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item === 1
                    ? `Vietnam's Economy Shows Strong Growth in Q2`
                    : item === 2
                      ? "FPT Shares Surge on New AI Partnership"
                      : "Central Bank Announces New Policies for Retail Investors"}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {item === 1
                    ? `Vietnam's GDP grew by 6.5% in the second quarter, exceeding expectations and signaling strong economic recovery...`
                    : item === 2
                      ? "FPT Corporation announced a strategic partnership with a leading AI company, causing shares to rise by 8% in early trading..."
                      : "The State Bank of Vietnam unveiled new policies aimed at protecting retail investors and promoting market stability..."}
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

      {/* Stock Market Section */}
      <section className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Market Overview</h2>
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
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Symbol
                  </th>
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="p-4 text-right font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="p-4 text-right font-medium text-muted-foreground">
                    Change
                  </th>
                  <th className="p-4 text-right font-medium text-muted-foreground">
                    % Change
                  </th>
                  <th className="p-4 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    symbol: "VNM",
                    name: "Vietnam Index",
                    price: "1,245.67",
                    change: "+12.45",
                    percentChange: "+1.01%",
                  },
                  {
                    symbol: "VCB",
                    name: "Vietcombank",
                    price: "89.50",
                    change: "+1.50",
                    percentChange: "+1.70%",
                  },
                  {
                    symbol: "FPT",
                    name: "FPT Corporation",
                    price: "75.20",
                    change: "-0.80",
                    percentChange: "-1.05%",
                  },
                  {
                    symbol: "VIC",
                    name: "Vingroup",
                    price: "102.30",
                    change: "+0.30",
                    percentChange: "+0.29%",
                  },
                  {
                    symbol: "MSN",
                    name: "Masan Group",
                    price: "94.70",
                    change: "-0.83",
                    percentChange: "-0.87%",
                  },
                ].map((stock) => (
                  <tr
                    key={stock.symbol}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 font-medium">{stock.symbol}</td>
                    <td className="p-4">{stock.name}</td>
                    <td className="p-4 text-right">{stock.price}</td>
                    <td
                      className={`p-4 text-right ${stock.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {stock.change}
                    </td>
                    <td
                      className={`p-4 text-right ${stock.percentChange.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {stock.percentChange}
                    </td>
                    <td className="p-4 text-right">
                      <button className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                        Add to Watchlist
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Educational Content Preview */}
      <section className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Educational Resources
          </h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-colors"></div>
            <div className="p-6 relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 6 7 17l-5-5" />
                  <path d="m22 10-7.5 7.5L13 16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Investment Strategies for Beginners
              </h3>
              <p className="text-muted-foreground mb-4">
                Learn the basics of investing, including diversification, risk
                management, and long-term planning strategies tailored for the
                Vietnamese market.
              </p>
              <div className="flex items-center justify-between">
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
                <div className="text-sm text-muted-foreground">10 min read</div>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-colors"></div>
            <div className="p-6 relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Understanding the Vietnamese Stock Market
              </h3>
              <p className="text-muted-foreground mb-4">
                Get familiar with HOSE, HNX, and how the Vietnamese stock market
                operates compared to global markets. Learn about local
                regulations and trading practices.
              </p>
              <div className="flex items-center justify-between">
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
                <div className="text-sm text-muted-foreground">15 min read</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container">
        <div className="rounded-xl bg-primary/10 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to start investing?
              </h2>
              <p className="text-muted-foreground">
                Create an account to track your favorite stocks, get
                personalized news, and access premium educational content.
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
    </div>
  );
}
