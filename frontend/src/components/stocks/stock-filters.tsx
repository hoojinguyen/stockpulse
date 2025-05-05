'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StockFiltersProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  market: string;
  onMarketChange: (value: string) => void;
  sector: string;
  onSectorChange: (value: string) => void;
}

export function StockFilters({
  searchQuery,
  onSearchChange,
  market,
  onMarketChange,
  sector,
  onSectorChange,
}: StockFiltersProps) {
  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Stocks</h1>
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search by ticker or company name"
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <Select value={market} onValueChange={onMarketChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Markets</SelectItem>
              <SelectItem value="hose">HOSE</SelectItem>
              <SelectItem value="hnx">HNX</SelectItem>
              <SelectItem value="upcom">UPCOM</SelectItem>
              <SelectItem value="nyse">NYSE</SelectItem>
              <SelectItem value="nasdaq">NASDAQ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <Select value={sector} onValueChange={onSectorChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="finance">Finance & Banking</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="consumer">Consumer Goods</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="realestate">Real Estate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}