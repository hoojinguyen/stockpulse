'use client';

import { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  category: string;
  source: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

// Mock data until API is implemented
const mockNews: NewsItem[] = [
  {
    id: 1,
    category: 'Breaking',
    source: 'Bloomberg',
    date: 'May 1, 2025',
    title: "Vietnam's Economy Shows Strong Growth in Q2",
    description:
      "Vietnam's GDP grew by 6.5% in the second quarter, exceeding expectations and signaling strong economic recovery...",
    imageUrl: '/images/news-1.jpg',
  },
  {
    id: 2,
    category: 'Market Analysis',
    source: 'Reuters',
    date: 'May 2, 2025',
    title: 'FPT Shares Surge on New AI Partnership',
    description:
      'FPT Corporation announced a strategic partnership with a leading AI company, causing shares to rise by 8% in early trading...',
    imageUrl: '/images/news-2.jpg',
  },
  {
    id: 3,
    category: 'Company News',
    source: 'CafeF',
    date: 'May 3, 2025',
    title: 'Central Bank Announces New Policies for Retail Investors',
    description:
      'The State Bank of Vietnam unveiled new policies aimed at protecting retail investors and promoting market stability...',
    imageUrl: '/images/news-3.jpg',
  },
];

const ArrowIcon = () => (
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
);

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20 group-hover:to-black/30 transition-colors" />
        <div className="absolute top-4 left-4 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {news.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{news.source}</span>
          <span>•</span>
          <span>{news.date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{news.description}</p>
        <button className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          Read More
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

const NewsCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="aspect-video w-full bg-muted animate-pulse" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <span>•</span>
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-6 w-3/4 bg-muted rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-muted rounded mb-2 animate-pulse" />
        <div className="h-4 w-2/3 bg-muted rounded mb-4 animate-pulse" />
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
};

export const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news. Using fallback data.');
        setNews(mockNews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="container">
      {error && <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded-md">{error}</div>}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Latest Financial News</h2>
        <button className="text-primary hover:underline inline-flex items-center">
          View All
          <ArrowIcon />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </>
        ) : (
          news.map((newsItem) => <NewsCard key={newsItem.id} news={newsItem} />)
        )}
      </div>
    </section>
  );
};
