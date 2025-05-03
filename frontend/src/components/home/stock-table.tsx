'use client';

export const StockTable = () => {
  return (
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
                <th className="p-4 text-left font-medium text-muted-foreground">Symbol</th>
                <th className="p-4 text-left font-medium text-muted-foreground">Name</th>
                <th className="p-4 text-right font-medium text-muted-foreground">Price</th>
                <th className="p-4 text-right font-medium text-muted-foreground">Change</th>
                <th className="p-4 text-right font-medium text-muted-foreground">% Change</th>
                <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  symbol: 'VNM',
                  name: 'Vietnam Index',
                  price: '1,245.67',
                  change: '+12.45',
                  percentChange: '+1.01%',
                },
                {
                  symbol: 'VCB',
                  name: 'Vietcombank',
                  price: '89.50',
                  change: '+1.50',
                  percentChange: '+1.70%',
                },
                {
                  symbol: 'FPT',
                  name: 'FPT Corporation',
                  price: '75.20',
                  change: '-0.80',
                  percentChange: '-1.05%',
                },
                {
                  symbol: 'VIC',
                  name: 'Vingroup',
                  price: '102.30',
                  change: '+0.30',
                  percentChange: '+0.29%',
                },
                {
                  symbol: 'MSN',
                  name: 'Masan Group',
                  price: '94.70',
                  change: '-0.83',
                  percentChange: '-0.87%',
                },
              ].map((stock) => (
                <tr key={stock.symbol} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium">{stock.symbol}</td>
                  <td className="p-4">{stock.name}</td>
                  <td className="p-4 text-right">{stock.price}</td>
                  <td
                    className={`p-4 text-right ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {stock.change}
                  </td>
                  <td
                    className={`p-4 text-right ${stock.percentChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
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
  );
};
