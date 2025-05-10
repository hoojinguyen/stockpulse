# StockPulse UI Design and Implementation

## 1. Introduction

**Project Name**: StockPulse  
**Version**: 1.0  
**Date**: May 3, 2025  
**Prepared by**: Grok, Solution Architect  

StockPulse is a web application designed to aggregate financial news, display stock market data, and provide educational content on long-term investment strategies, primarily for retail investors in Vietnam. This document details the user interface (UI) design for StockPulse, including layout descriptions, styling guidelines, and sample implementation code using Next.js and Tailwind CSS. As a developer with frontend expertise, you can leverage these designs to create a polished, responsive UI while learning new technologies. The design draws inspiration from modern financial apps and free UI kits, ensuring a professional and user-friendly experience.

## 2. UI Design Principles

The UI design for StockPulse adheres to the following principles:
- **Simplicity**: Clean layouts with minimal clutter, making it easy for beginners to navigate.
- **Responsiveness**: Mobile-first design that adapts seamlessly to desktop and tablet screens.
- **Professionalism**: Blue/gray color scheme with green/red accents for financial data, aligning with industry standards.
- **Accessibility**: Clear typography, sufficient contrast, and intuitive navigation.
- **Modularity**: Reusable components (e.g., news cards, stock tables) for efficient development.

## 3. Color Scheme and Typography

### 3.1 Color Palette
| **Color** | **Hex Code** | **Purpose** |
|-----------|--------------|-------------|
| Primary Blue | `#1E3A8A` | Headers, buttons, links |
| Secondary Gray | `#4B5563` | Backgrounds, text |
| Success Green | `#10B981` | Positive stock changes |
| Danger Red | `#EF4444` | Negative stock changes |
| White | `#FFFFFF` | Cards, main background |
| Light Gray | `#F3F4F6` | Alternate backgrounds |

### 3.2 Typography
- **Font**: Inter (via Google Fonts) for its clean, sans-serif readability.
- **Sizes**:
  - Headings: 24px (h1), 20px (h2), 16px (h3).
  - Body: 14px.
  - Small: 12px (e.g., timestamps, footnotes).
- **Weights**: Regular (400), Medium (500), Bold (700).

## 4. UI Layout Descriptions

### 4.1 Home Page
- **Header**:
  - Fixed at the top, 80px height.
  - Left: Logo ("StockPulse" in Primary Blue).
  - Center: Search bar (rounded, gray border, placeholder: "Search news or stocks").
  - Right: User icon (dropdown for login/register or profile/settings).
- **Hero Section**:
  - 300px height, full-width.
  - Contains a line chart (via Chart.js) showing VN-Index or S&P 500 trends.
  - Below chart: Metrics like "Top Gainer: VNM +2.5%" and "Market Volume: $1.2B".
- **Latest News Section**:
  - Grid layout (3 columns desktop, 1 column mobile, `grid grid-cols-1 md:grid-cols-3 gap-4`).
  - Each news card:
    - Image (150x150px, top).
    - Headline (16px, bold, e.g., "FPT Shares Surge on AI Partnership").
    - Summary (50 words, 14px).
    - Source and timestamp (e.g., "CafeF, 2 hours ago").
    - "Read More" button (Primary Blue, hover effect).
  - Filters above grid (buttons: "All," "Stock Market," "Economy").
- **Top Stocks Section**:
  - Table (`table-auto w-full`) with columns: Ticker, Company, Price, Change (%), Volume.
  - Rows alternate background (`bg-gray-100`).
  - Change column uses green/red for positive/negative.
  - "Add to Watchlist" button per row.
- **Investment Tips Section**:
  - Grid of cards (2 columns desktop, 1 column mobile).
  - Each card: Image, title (e.g., "Why Index Funds Work"), excerpt, "Read More" button.
- **Footer**:
  - Links to "Terms," "Privacy," "About."
  - Disclaimer: "For informational purposes only. Not investment advice."

### 4.2 Stocks Page
- **Header**: Same as home page.
- **Search Bar**: Full-width, placeholder: "Search by ticker or company".
- **Filters**: Buttons or dropdowns for markets (HOSE, HNX, NYSE) and sectors.
- **Stock Table**:
  - Columns: Ticker, Company, Price, Change (%), Volume, Market Cap, P/E Ratio.
  - Sortable headers (click to sort ascending/descending).
  - Each row has a chart icon (links to historical data) and "Add to Watchlist" button.
- **Market Summary Sidebar** (desktop only):
  - Shows VN-Index, top gainers/losers, trading volume.
- **Chart Area**:
  - Displays a line or candlestick chart for selected stock (Chart.js).
  - Options to toggle timeframes (1D, 1W, 1M, 1Y).

### 4.3 Education Page
- **Header**: Same as home page.
- **Search Bar**: For searching articles by keyword.
- **Article List**:
  - List layout (1 column, `flex flex-col gap-4`).
  - Each article:
    - Image (200x150px, left on desktop, top on mobile).
    - Title (16px, bold, e.g., "Diversification 101").
    - Author, date, excerpt (50 words).
    - "Read More" button.
- **Category Sidebar** (desktop) or Dropdown (mobile):
  - Options: Beginner Guides, Strategies, Market Analysis, Terms.

### 4.4 Watchlist Page
- **Header**: Same as home page.
- **Watchlist Table**:
  - Columns: Ticker, Company, Price, Change (%), Value (if holdings input).
  - Each row has "Remove" button and chart icon.
- **Portfolio Summary** (optional):
  - Total value, pie chart for sector allocation (Chart.js).
- **Add Stock Button**: Links to search stocks.

### 4.5 Mobile Layout
- **Navigation**: Bottom tab bar with icons for Home, Stocks, Education, Watchlist, Profile.
- **Adjustments**:
  - Grids become single-column (`grid-cols-1`).
  - Tables convert to card lists (each stock as a card).
  - Sidebar content moves to top/bottom sections.
  - Charts are simplified (e.g., smaller axes, fewer data points).

## 5. Sample Implementation Code

Below is a sample Next.js implementation for the home page, using Tailwind CSS and shadcn/ui components. This code demonstrates the header, news section, and stock table, providing a starting point for your UI development.

<xaiArtifact artifact_id="3d1a27a7-f8b5-453a-8560-83b83eceb811" artifact_version_id="d7c0efa1-ac0b-4e71-acc4-7a0a1f5dab56" title="index.jsx" contentType="text/jsx">
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

export default function Home() {
  const [news, setNews] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch news (mock API call)
    axios.get('/api/news').then(res => setNews(res.data.slice(0, 6)));
    // Fetch stocks (mock API call)
    axios.get('/api/stocks').then(res => setStocks(res.data.slice(0, 5)));
  }, []);

  const chartData = {
    datasets: [{
      label: 'VN-Index',
      data: [
        { x: '2025-05-01', y: 1200 },
        { x: '2025-05-02', y: 1210 },
        { x: '2025-05-03', y: 1220 },
      ],
      borderColor: '#1E3A8A',
      fill: false,
    }],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">StockPulse</h1>
          <Input
            className="w-1/3"
            placeholder="Search news or stocks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="ghost">Profile</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Hero Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Market Overview</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Line data={chartData} options={{ responsive: true, scales: { x: { type: 'time' } } }} />
            <div className="flex justify-between mt-4">
              <p className="text-green-500">Top Gainer: VNM +2.5%</p>
              <p className="text-red-500">Top Loser: FPT -1.2%</p>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {news.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <img src={article.image} alt={article.title} className="w-full h-32 object-cover rounded-t-lg" />
                <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
                <p className="text-gray-600 text-sm">{article.summary}</p>
                <p className="text-gray-500 text-xs mt-2">{article.source} • {article.time}</p>
                <Button variant="link" className="mt-2">Read More</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Stocks Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Top Stocks</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell>{stock.company}</TableCell>
                  <TableCell>{stock.price}</TableCell>
                  <TableCell className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {stock.change}%
                  </TableCell>
                  <TableCell>
                    <Button size="sm">Add to Watchlist</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* Investment Tips Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Investment Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold">Why Index Funds Work</h3>
              <p className="text-gray-600 text-sm">Learn how index funds provide diversification and low costs.</p>
              <Button variant="link" className="mt-2">Read More</Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold">Diversification 101</h3>
              <p className="text-gray-600 text-sm">Understand the basics of spreading your investments.</p>
              <Button variant="link" className="mt-2">Read More</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">For informational purposes only. Not investment advice.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/terms" className="text-sm hover:underline">Terms</a>
            <a href="/privacy" className="text-sm hover:underline">Privacy</a>
            <a href="/about" className="text-sm hover:underline">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}