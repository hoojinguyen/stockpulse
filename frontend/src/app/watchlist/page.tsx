'use client';

import { useState, useEffect } from 'react';
import { Stock } from '@/types/stock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from '@/components/ui/error-message';
import { WatchlistTable } from '@/components/watchlist/watchlist-table';
import { WatchlistSummary } from '@/components/watchlist/watchlist-summary';
import { WatchlistTableSkeleton } from '@/components/watchlist/watchlist-table-skeleton';

export default function WatchlistPage() {
  // State for watchlist data
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  // Fetch watchlist data
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch('/api/watchlist');
        // const data = await response.json();
        // setWatchlist(data);

        // Temporary mock data
        const mockWatchlist = [
          {
            symbol: 'VNM',
            name: 'Vietnam Dairy Products JSC',
            price: '78.50',
            change: '+1.50',
            percentChange: '+1.95%',
            volume: '1.2M',
            marketCap: '164.3B',
            peRatio: '16.8',
            quantity: 100, // Additional field for watchlist
            value: 7850 // Additional field for watchlist
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
            quantity: 50,
            value: 4475
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
            quantity: 200,
            value: 15040
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
            quantity: 300,
            value: 8445
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
            quantity: 150,
            value: 5190
          },
        ];

        setWatchlist(mockWatchlist);

        // Calculate total value
        const total = mockWatchlist.reduce((sum, stock) => sum + stock.value, 0);
        setTotalValue(total);
      } catch (err) {
        setError('Failed to load watchlist data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle remove from watchlist
  const handleRemoveFromWatchlist = (stock: Stock) => {
    // TODO: Implement API call to remove from watchlist
    setWatchlist(watchlist.filter(item => item.symbol !== stock.symbol));
    
    // Update total value
    const updatedTotal = watchlist
      .filter(item => item.symbol !== stock.symbol)
      .reduce((sum, stock) => sum + (stock.value || 0), 0);
    setTotalValue(updatedTotal);
  };

  // Filter watchlist
  const filteredWatchlist = watchlist.filter((stock) => {
    return (
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Render loading state
  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Watchlist</h1>
          <div className="w-1/3">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WatchlistTableSkeleton rows={5} />
          </div>
          <div className="lg:col-span-1">
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search by ticker or company"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Watchlist Table */}
        <div className="lg:col-span-2">
          {filteredWatchlist.length > 0 ? (
            <WatchlistTable
              stocks={filteredWatchlist}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          ) : (
            <div className="rounded-xl border bg-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
              <p className="text-muted-foreground mb-4">
                Add stocks to your watchlist to track their performance
              </p>
              <Button
                onClick={() => window.location.href = '/stocks'}
                className="inline-flex items-center"
              >
                Browse Stocks
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
              </Button>
            </div>
          )}
        </div>

        {/* Portfolio Summary */}
        <div className="lg:col-span-1">
          <WatchlistSummary
            stocks={watchlist}
            totalValue={totalValue}
          />
          <div className="mt-4">
            <Button
              onClick={() => window.location.href = '/stocks'}
              className="w-full"
            >
              Add Stocks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}