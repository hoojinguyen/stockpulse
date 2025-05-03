'use client';

import { useEffect, useState } from 'react';

interface MarketHighlight {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

interface MarketVolume {
  totalVolume: string;
  totalValue: string;
  advancingDeclining: string;
}

// Dummy data for development
const dummyGainers: MarketHighlight[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.45, volume: 1000000 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 290.5, change: 1.85, volume: 800000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.75, change: 1.65, volume: 600000 },
];

const dummyLosers: MarketHighlight[] = [
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 280.3, change: -2.15, volume: 900000 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 380.2, change: -1.95, volume: 700000 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 130.45, change: -1.75, volume: 500000 },
];

const dummyVolume: MarketVolume = {
  totalVolume: '1.2B shares',
  totalValue: '$45.6B',
  advancingDeclining: '245/180',
};

const MarketHighlights = () => {
  const [topGainers, setTopGainers] = useState<MarketHighlight[]>([]);
  const [topLosers, setTopLosers] = useState<MarketHighlight[]>([]);
  const [marketVolume, setMarketVolume] = useState<MarketVolume>({
    totalVolume: '',
    totalValue: '',
    advancingDeclining: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setIsLoading(true);
        // Try to fetch from API first
        try {
          const [gainersRes, losersRes, volumeRes] = await Promise.all([
            fetch('/api/market/top-gainers'),
            fetch('/api/market/top-losers'),
            fetch('/api/market/volume'),
          ]);

          const gainersData = await gainersRes.json();
          const losersData = await losersRes.json();
          const volumeData = await volumeRes.json();

          setTopGainers(gainersData);
          setTopLosers(losersData);
          setMarketVolume(volumeData);
        } catch (apiError) {
          // If API fails, use dummy data
          console.log('Using dummy data as API is not implemented yet');
          setTopGainers(dummyGainers);
          setTopLosers(dummyLosers);
          setMarketVolume(dummyVolume);
        }
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();

    // Optional: Set up polling to refresh data periodically
    const interval = setInterval(fetchMarketData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading market data...</div>;
  }

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
            {topGainers.map((stock) => (
              <li key={stock.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-green-500 font-medium">+{stock.change.toFixed(2)}%</div>
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
            {topLosers.map((stock) => (
              <li key={stock.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-red-500 font-medium">{stock.change.toFixed(2)}%</div>
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
              <div className="font-medium">{marketVolume.totalVolume}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="font-medium">{marketVolume.totalValue}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Advancing/Declining</div>
              <div className="font-medium">{marketVolume.advancingDeclining}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketHighlights;
