'use client';

import { MarketSummary } from '@/components/stocks/market-summary';
import { StockChart } from '@/components/stocks/stock-chart';
import { StockFilters } from '@/components/stocks/stock-filters';
import { StockTable } from '@/components/stocks/stock-table';
import { ErrorMessage } from '@/components/ui/error-message';
import { StockTableSkeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

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

export default function StocksPage() {
  // State for stocks data
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [market, setMarket] = useState('all');
  const [sector, setSector] = useState('all');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  // Fetch stocks data
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch('/api/stocks');
        // const data = await response.json();
        // setStocks(data);

        // Temporary mock data
        const mockStocks = [
          {
            symbol: 'VNM',
            name: 'Vietnam Dairy Products JSC',
            price: '78.50',
            change: '+1.50',
            percentChange: '+1.95%',
            volume: '1.2M',
            marketCap: '164.3B',
            peRatio: '16.8',
          },
          {
            symbol: 'VCB',
            name: 'Vietcombank',
            price: '89.50',
            change: '+1.50',
            percentChange: '+1.70%',
            volume: '2.5M',
            marketCap: '332.1B',
            peRatio: '18.2',
          },
          {
            symbol: 'FPT',
            name: 'FPT Corporation',
            price: '75.20',
            change: '-0.80',
            percentChange: '-1.05%',
            volume: '1.8M',
            marketCap: '85.7B',
            peRatio: '14.5',
          },
          {
            symbol: 'VIC',
            name: 'Vingroup',
            price: '102.30',
            change: '+0.30',
            percentChange: '+0.29%',
            volume: '3.1M',
            marketCap: '356.9B',
            peRatio: '22.3',
          },
          {
            symbol: 'MSN',
            name: 'Masan Group',
            price: '94.70',
            change: '-0.83',
            percentChange: '-0.87%',
            volume: '1.5M',
            marketCap: '111.2B',
            peRatio: '19.7',
          },
          {
            symbol: 'HPG',
            name: 'Hoa Phat Group',
            price: '28.15',
            change: '+0.65',
            percentChange: '+2.36%',
            volume: '4.2M',
            marketCap: '125.8B',
            peRatio: '10.2',
          },
          {
            symbol: 'VHM',
            name: 'Vinhomes',
            price: '58.40',
            change: '-0.20',
            percentChange: '-0.34%',
            volume: '2.3M',
            marketCap: '254.3B',
            peRatio: '15.6',
          },
          {
            symbol: 'VRE',
            name: 'Vincom Retail',
            price: '27.80',
            change: '+0.40',
            percentChange: '+1.46%',
            volume: '1.7M',
            marketCap: '63.5B',
            peRatio: '13.9',
          },
          {
            symbol: 'MWG',
            name: 'Mobile World Group',
            price: '43.25',
            change: '-1.15',
            percentChange: '-2.59%',
            volume: '2.8M',
            marketCap: '62.7B',
            peRatio: '12.8',
          },
          {
            symbol: 'TCB',
            name: 'Techcombank',
            price: '34.60',
            change: '+0.75',
            percentChange: '+2.22%',
            volume: '3.5M',
            marketCap: '121.4B',
            peRatio: '8.5',
          },
        ];

        setStocks(mockStocks);

        // Set market data
        setMarketData([
          {
            index: 'VN-Index',
            value: '1,245.67',
            change: '+12.45',
            percentChange: '+1.01%',
          },
          {
            index: 'HNX-Index',
            value: '234.56',
            change: '+2.34',
            percentChange: '+1.01%',
          },
          {
            index: 'UPCOM-Index',
            value: '89.75',
            change: '+0.67',
            percentChange: '+0.75%',
          },
        ]);

        // Set default selected stock
        setSelectedStock(mockStocks[0]);
      } catch (err) {
        setError('Failed to load stock data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle stock selection
  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
  };

  // Filter stocks
  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMarket = market === 'all' ? true : true; // TODO: Implement market filtering
    const matchesSector = sector === 'all' ? true : true; // TODO: Implement sector filtering
    return matchesSearch && matchesMarket && matchesSector;
  });

  // Render loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Stocks</h1>
          <div className="w-1/3">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <StockTableSkeleton rows={10} />
      </div>
    );
  }

  // Render error state
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-8">
      {/* Filters Component */}
      <StockFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        market={market}
        onMarketChange={setMarket}
        sector={sector}
        onSectorChange={setSector}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stock Table and Chart - 3 columns on large screens */}
        <div className="lg:col-span-3">
          <StockTable
            stocks={filteredStocks}
            selectedStock={selectedStock}
            onStockSelect={handleStockSelect}
            onAddToWatchlist={(stock) => alert(`Added ${stock.symbol} to watchlist`)}
          />

          {/* Chart Area */}
          {selectedStock && <StockChart selectedStock={selectedStock} />}
        </div>

        {/* Market Summary Sidebar - 1 column on large screens */}
        <div className="lg:col-span-1">
          <MarketSummary marketData={marketData} stocks={stocks} />
        </div>
      </div>
    </div>
  );
}
