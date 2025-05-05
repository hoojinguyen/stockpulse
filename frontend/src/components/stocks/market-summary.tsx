'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Stock interface
interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  percentChange: string;
  volume: string;
  marketCap: string;
  peRatio: string;
}

// Market data interface
interface MarketData {
  index: string;
  value: string;
  change: string;
  percentChange: string;
}

interface MarketSummaryProps {
  marketData: MarketData[];
  stocks: Stock[];
}

export function MarketSummary({ marketData, stocks }: MarketSummaryProps) {
  // Get top gainers (stocks with positive change, sorted by percentChange)
  const topGainers = [...stocks]
    .filter((stock) => stock.change.startsWith('+'))
    .sort((a, b) => parseFloat(b.percentChange) - parseFloat(a.percentChange))
    .slice(0, 3);

  // Get top losers (stocks with negative change, sorted by percentChange)
  const topLosers = [...stocks]
    .filter((stock) => !stock.change.startsWith('+'))
    .sort((a, b) => parseFloat(a.percentChange) - parseFloat(b.percentChange))
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Summary</CardTitle>
        <CardDescription>Latest market indices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketData.map((market) => (
            <div
              key={market.index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <div className="font-medium">{market.index}</div>
                <div className="text-sm text-muted-foreground">{market.value}</div>
              </div>
              <div
                className={`text-right ${market.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
              >
                <div>{market.change}</div>
                <div className="text-sm">{market.percentChange}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Top Gainers</h3>
          <div className="space-y-2">
            {topGainers.map((stock) => (
              <div
                key={`gainer-${stock.symbol}`}
                className="flex justify-between items-center text-sm border-b pb-1"
              >
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-green-600">{stock.percentChange}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Top Losers</h3>
          <div className="space-y-2">
            {topLosers.map((stock) => (
              <div
                key={`loser-${stock.symbol}`}
                className="flex justify-between items-center text-sm border-b pb-1"
              >
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-red-600">{stock.percentChange}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}