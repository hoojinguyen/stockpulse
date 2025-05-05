/**
 * Stock data interface
 */
export interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  percentChange: string;
  volume: string;
  marketCap: string;
  peRatio: string;
}

/**
 * Market data interface for indices
 */
export interface MarketData {
  index: string;
  value: string;
  change: string;
  percentChange: string;
}

/**
 * Chart data interface for stock price visualization
 */
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}