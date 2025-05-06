'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stock } from '@/types/stock';

interface WatchlistTableProps {
  stocks: Stock[];
  onRemoveFromWatchlist: (stock: Stock) => void;
}

export function WatchlistTable({ stocks, onRemoveFromWatchlist }: WatchlistTableProps) {
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
      case 'percentChange':
        valueA = parseFloat(a.percentChange);
        valueB = parseFloat(b.percentChange);
        break;
      case 'value':
        valueA = a.value || 0;
        valueB = b.value || 0;
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
                className="p-4 text-right font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('value')}
              >
                Value
                {sortColumn === 'value' && (
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
                className="border-b hover:bg-muted/30 transition-colors"
              >
                <td className="p-4 font-medium">{stock.symbol}</td>
                <td className="p-4">{stock.name}</td>
                <td className="p-4 text-right">{stock.price}</td>
                <td
                  className={`p-4 text-right ${stock.percentChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                >
                  {stock.percentChange}
                </td>
                <td className="p-4 text-right">
                  {stock.value ? `$${stock.value.toLocaleString()}` : '-'}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium shadow-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      onClick={() => window.location.href = `/stocks?symbol=${stock.symbol}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      onClick={() => onRemoveFromWatchlist(stock)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function WatchlistTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="p-4 text-left font-medium text-muted-foreground">Symbol</th>
              <th className="p-4 text-left font-medium text-muted-foreground">Company</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Price</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Change</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Value</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array(rows)
              .fill(0)
              .map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-4 bg-gray-200 rounded w-16 ml-auto animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-4 bg-gray-200 rounded w-16 ml-auto animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-4 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-8 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}