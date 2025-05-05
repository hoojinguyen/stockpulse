'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

// Chart data interface
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

interface StockChartProps {
  selectedStock: Stock | null;
  initialTimeframe?: string;
}

export function StockChart({ selectedStock, initialTimeframe = '1D' }: StockChartProps) {
  const [timeframe, setTimeframe] = useState(initialTimeframe);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  // Generate chart data based on selected stock and timeframe
  const generateChartData = (symbol: string, timeframe: string) => {
    // This would be replaced with an API call to get historical data
    // For now, we'll generate random data
    const labels: string[] = [];
    const data: number[] = [];
    let days = 0;

    switch (timeframe) {
      case '1D':
        days = 1;
        for (let i = 9; i <= 16; i++) {
          labels.push(`${i}:00`);
          data.push(Math.random() * 10 + 70); // Random price between 70-80
        }
        break;
      case '1W':
        days = 7;
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i - 1));
          labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
          data.push(Math.random() * 10 + 70);
        }
        break;
      case '1M':
        days = 30;
        for (let i = 0; i < 10; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i * 3 - 1));
          labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
          data.push(Math.random() * 15 + 65);
        }
        break;
      case '1Y':
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() - (11 - i));
          labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
          data.push(Math.random() * 20 + 60);
        }
        break;
      default:
        break;
    }

    setChartData({
      labels,
      datasets: [
        {
          label: symbol,
          data,
          borderColor: '#1E40AF',
          backgroundColor: 'rgba(30, 64, 175, 0.1)',
          tension: 0.3,
        },
      ],
    });
  };

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    if (selectedStock) {
      generateChartData(selectedStock.symbol, newTimeframe);
    }
  };

  // Update chart when selected stock changes
  useEffect(() => {
    if (selectedStock) {
      generateChartData(selectedStock.symbol, timeframe);
    }
  }, [selectedStock, timeframe]);

  if (!selectedStock || !chartData) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {selectedStock.symbol} - {selectedStock.name}
          </span>
          <span
            className={`${selectedStock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
          >
            {selectedStock.price} ({selectedStock.percentChange})
          </span>
        </CardTitle>
        <CardDescription>Historical price data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '1Y'].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                  },
                  ticks: {
                    callback: function (value) {
                      return value.toLocaleString();
                    },
                  },
                },
              },
              interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false,
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}