'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

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

interface StockTableProps {
  stocks: Stock[];
  selectedStock: Stock | null;
  onStockSelect: (stock: Stock) => void;
  onAddToWatchlist?: (stock: Stock) => void;
}

export function StockTable({ 
  stocks, 
  selectedStock, 
  onStockSelect, 
  onAddToWatchlist 
}: StockTableProps) {
  const [sortColumn, setSortColumn] = useState('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sort stocks
  const sortedStocks = [...stocks].sort((a, b) => {
    let valueA, valueB;

    switch (sortColumn) {
      case 'symbol':
        valueA = a.symbol;
        valueB = b.symbol;
        break;
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'price':
        valueA = parseFloat(a.price.replace(/,/g, ''));
        valueB = parseFloat(b.price.replace(/,/g, ''));
        break;
      case 'change':
        valueA = parseFloat(a.change);
        valueB = parseFloat(b.change);
        break;
      case 'percentChange':
        valueA = parseFloat(a.percentChange);
        valueB = parseFloat(b.percentChange);
        break;
      case 'volume':
        valueA = a.volume.endsWith('M') ? parseFloat(a.volume) * 1000000 : parseFloat(a.volume);
        valueB = b.volume.endsWith('M') ? parseFloat(b.volume) * 1000000 : parseFloat(b.volume);
        break;
      case 'marketCap':
        valueA = a.marketCap.endsWith('B')
          ? parseFloat(a.marketCap) * 1000000000
          : parseFloat(a.marketCap);
        valueB = b.marketCap.endsWith('B')
          ? parseFloat(b.marketCap) * 1000000000
          : parseFloat(b.marketCap);
        break;
      case 'peRatio':
        valueA = parseFloat(a.peRatio);
        valueB = parseFloat(b.peRatio);
        break;
      default:
        valueA = a.symbol;
        valueB = b.symbol;
    }

    if (sortDirection === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th
                className="p-4 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('symbol')}
              >
                Symbol
                {sortColumn === 'symbol' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="p-4 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('name')}
              >
                Company
                {sortColumn === 'name' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="p-4 text-right font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('price')}
              >
                Price
                {sortColumn === 'price' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="p-4 text-right font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('percentChange')}
              >
                Change
                {sortColumn === 'percentChange' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="p-4 text-right font-medium text-muted-foreground cursor-pointer hover:text-foreground hidden md:table-cell"
                onClick={() => handleSort('volume')}
              >
                Volume
                {sortColumn === 'volume' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="p-4 text-right font-medium text-muted-foreground cursor-pointer hover:text-foreground hidden md:table-cell"
                onClick={() => handleSort('marketCap')}
              >
                Market Cap
                {sortColumn === 'marketCap' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="p-4 text-right font-medium text-muted-foreground cursor-pointer hover:text-foreground hidden md:table-cell"
                onClick={() => handleSort('peRatio')}
              >
                P/E Ratio
                {sortColumn === 'peRatio' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((stock) => (
              <tr
                key={stock.symbol}
                className={`border-b hover:bg-muted/30 transition-colors ${selectedStock?.symbol === stock.symbol ? 'bg-muted/50' : ''}`}
                onClick={() => onStockSelect(stock)}
              >
                <td className="p-4 font-medium">{stock.symbol}</td>
                <td className="p-4">{stock.name}</td>
                <td className="p-4 text-right">{stock.price}</td>
                <td
                  className={`p-4 text-right ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                >
                  {stock.percentChange}
                </td>
                <td className="p-4 text-right hidden md:table-cell">{stock.volume}</td>
                <td className="p-4 text-right hidden md:table-cell">{stock.marketCap}</td>
                <td className="p-4 text-right hidden md:table-cell">{stock.peRatio}</td>
                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddToWatchlist) {
                        onAddToWatchlist(stock);
                      }
                    }}
                  >
                    Add to Watchlist
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}