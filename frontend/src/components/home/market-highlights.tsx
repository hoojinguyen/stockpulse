'use client';

interface MarketHighlight {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

const topGainers: MarketHighlight[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.72,
    change: 2.45,
    volume: 52436789,
  },
  // Add more stocks here
];

const topLosers: MarketHighlight[] = [
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 238.45,
    change: -3.21,
    volume: 31245678,
  },
  // Add more stocks here
];

const MarketHighlights = () => {
  return (
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
              { symbol: 'VCB', name: 'Vietcombank', change: '+1.70%' },
              { symbol: 'VIC', name: 'Vingroup', change: '+0.29%' },
              { symbol: 'VNM', name: 'Vinamilk', change: '+1.25%' },
            ].map((stock) => (
              <li key={stock.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-green-500 font-medium">{stock.change}</div>
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
              { symbol: 'FPT', name: 'FPT Corporation', change: '-1.05%' },
              { symbol: 'MSN', name: 'Masan Group', change: '-0.87%' },
              { symbol: 'HPG', name: 'Hoa Phat Group', change: '-0.65%' },
            ].map((stock) => (
              <li key={stock.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
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
              <div className="text-sm text-muted-foreground">Total Volume</div>
              <div className="font-medium">1.2B shares</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="font-medium">$3.5B</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Advancing/Declining</div>
              <div className="font-medium">156/124</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketHighlights;
