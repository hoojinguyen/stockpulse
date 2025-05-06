'use client';

import { useEffect, useRef } from 'react';
import { Stock } from '@/types/stock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WatchlistSummaryProps {
  stocks: Stock[];
  totalValue: number;
}

export function WatchlistSummary({ stocks, totalValue }: WatchlistSummaryProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Calculate sector allocation
  const sectorAllocation = stocks.reduce((acc, stock) => {
    // This is a simplified example - in a real app, you would have sector information
    // For now, we'll use the first letter of the stock symbol as a mock "sector"
    const sector = stock.symbol.charAt(0);
    const value = stock.value || 0;
    
    if (!acc[sector]) {
      acc[sector] = 0;
    }
    acc[sector] += value;
    return acc;
  }, {} as Record<string, number>);

  // Create pie chart
  useEffect(() => {
    if (chartRef.current && stocks.length > 0) {
      // In a real implementation, you would use Chart.js or another charting library
      // For this example, we'll just create a simple representation
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Define colors for sectors
      const colors = [
        '#4f46e5', // indigo
        '#0ea5e9', // sky
        '#10b981', // emerald
        '#f59e0b', // amber
        '#ef4444', // red
        '#8b5cf6', // violet
        '#ec4899', // pink
      ];

      // Draw pie chart
      const centerX = chartRef.current.width / 2;
      const centerY = chartRef.current.height / 2;
      const radius = Math.min(centerX, centerY) - 10;

      let startAngle = 0;
      let colorIndex = 0;

      Object.entries(sectorAllocation).forEach(([sector, value]) => {
        const sliceAngle = (value / totalValue) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = colors[colorIndex % colors.length];
        ctx.fill();
        
        // Add sector label
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sector, labelX, labelY);
        
        startAngle += sliceAngle;
        colorIndex++;
      });
    }
  }, [stocks, totalValue, sectorAllocation]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Total Value */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Value:</span>
            <span className="text-xl font-bold">${totalValue.toLocaleString()}</span>
          </div>
          
          {/* Number of Stocks */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Stocks:</span>
            <span>{stocks.length}</span>
          </div>
          
          {/* Sector Allocation */}
          <div>
            <h4 className="text-sm font-medium mb-2">Sector Allocation</h4>
            {stocks.length > 0 ? (
              <div>
                <canvas 
                  ref={chartRef} 
                  width={200} 
                  height={200}
                  className="mx-auto mb-4"
                ></canvas>
                <div className="space-y-2">
                  {Object.entries(sectorAllocation).map(([sector, value], index) => (
                    <div key={sector} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ 
                            backgroundColor: [
                              '#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', 
                              '#ef4444', '#8b5cf6', '#ec4899'
                            ][index % 7] 
                          }}
                        ></div>
                        <span>{sector}</span>
                      </div>
                      <div className="flex items-center">
                        <span>${value.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-2">
                          ({Math.round((value / totalValue) * 100)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Add stocks to see allocation
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}