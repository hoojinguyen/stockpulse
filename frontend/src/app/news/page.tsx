'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { NewsCard } from '@/components/news/news-card';
import { NewsCardSkeleton } from '@/components/news/news-card-skeleton';
import { NewsFilters } from '@/components/news/news-filters';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';

// Function to get category color class based on category name
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Breaking":
      return "bg-red-500 text-white";
    case "Market Analysis":
      return "bg-blue-500 text-white";
    case "Company News":
      return "bg-green-500 text-white";
    case "Economy":
      return "bg-yellow-500 text-black";
    case "Cryptocurrency":
      return "bg-purple-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

// Define the NewsItem interface
interface NewsItem {
  id: number;
  category: string;
  source: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
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
    imageUrl: '/images/news-1.svg',
    url: 'https://example.com/news/1',
  },
  {
    id: 2,
    category: 'Market Analysis',
    source: 'Reuters',
    date: 'May 2, 2025',
    title: 'FPT Shares Surge on New AI Partnership',
    description:
      'FPT Corporation announced a strategic partnership with a leading AI company, causing shares to rise by 8% in early trading...',
    imageUrl: 'https://placehold.co/600x400/2563eb/ffffff?text=FPT+Shares',
    url: 'https://example.com/news/2',
  },
  {
    id: 3,
    category: 'Company News',
    source: 'CafeF',
    date: 'May 3, 2025',
    title: 'Central Bank Announces New Policies for Retail Investors',
    description:
      'The State Bank of Vietnam unveiled new policies aimed at protecting retail investors and promoting market stability...',
    imageUrl: 'https://placehold.co/600x400/9333ea/ffffff?text=Central+Bank',
    url: 'https://example.com/news/3',
  },
  {
    id: 4,
    category: 'Economy',
    source: 'VnExpress',
    date: 'May 4, 2025',
    title: 'Inflation Rate Stabilizes at 2.8% in April',
    description: `Vietnam's inflation rate has stabilized at 2.8% in April, within the government's target range, according to the latest data from the General Statistics Office...`,
    imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Inflation+Rate',
    url: 'https://example.com/news/4',
  },
  {
    id: 5,
    category: 'Market Analysis',
    source: 'Financial Times',
    date: 'May 5, 2025',
    title: 'Foreign Investment in Vietnam Reaches New High',
    description:
      'Foreign direct investment in Vietnam has reached a new quarterly high, with technology and manufacturing sectors attracting the most capital...',
    imageUrl: 'https://placehold.co/600x400/0891b2/ffffff?text=Foreign+Investment',
    url: 'https://example.com/news/5',
  },
  {
    id: 6,
    category: 'Company News',
    source: 'Bloomberg',
    date: 'May 6, 2025',
    title: 'Vingroup Expands Electric Vehicle Production',
    description:
      'Vingroup has announced plans to expand its electric vehicle production capacity, aiming to become a major player in the Southeast Asian automotive market...',
    imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=Vingroup',
    url: 'https://example.com/news/6',
  },
  {
    id: 7,
    category: 'Technology',
    source: 'TechCrunch',
    date: 'May 7, 2025',
    title: 'Vietnamese Fintech Startup Secures $50M Funding',
    description: `A Vietnamese fintech startup has secured $50 million in Series B funding, highlighting the growing interest in Vietnam's digital economy...`,
    imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Fintech+Startup',
    url: 'https://example.com/news/7',
  },
  {
    id: 8,
    category: 'Economy',
    source: 'Reuters',
    date: 'May 8, 2025',
    title: `Vietnam's Export Growth Exceeds Forecasts`,
    description: `Vietnam's exports grew by 15% year-on-year in the first quarter, exceeding analyst forecasts and reinforcing the country's position as a manufacturing hub...`,
    imageUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Export+Growth',
    url: 'https://example.com/news/8',
  },
  {
    id: 9,
    category: 'Breaking',
    source: 'CNBC',
    date: 'May 9, 2025',
    title: 'Major Trade Agreement to Boost Vietnamese Markets',
    description:
      'A new trade agreement is expected to significantly boost Vietnamese markets, with analysts predicting increased foreign investment and export opportunities...',
    imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Trade+Agreement',
    url: 'https://example.com/news/9',
  },
];

// Available categories for filtering
const categories = ['All', 'Breaking', 'Market Analysis', 'Company News', 'Economy', 'Technology'];

// Available sources for filtering
const sources = [
  'All',
  'Bloomberg',
  'Reuters',
  'CafeF',
  'VnExpress',
  'Financial Times',
  'TechCrunch',
  'CNBC',
];

export default function NewsPage() {
  // State for news data
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [featuredNews, setFeaturedNews] = useState<NewsItem | null>(null);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch('/api/news');
        // const data = await response.json();
        // setNews(data);

        // Using mock data for now
        // Simulate API delay
        setTimeout(() => {
          // Set the first breaking news item as featured, or the first item if no breaking news
          const breakingNews = mockNews.find(item => item.category === 'Breaking');
          setFeaturedNews(breakingNews || mockNews[0]);
          
          setNews(mockNews);
          setError('');
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news data');
        setNews(mockNews); // Fallback to mock data
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle source selection
  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  // Filter news based on search query, category, and source
  const filteredNews = news.filter((item) => {
    // Exclude featured news when no filters are applied
    if (
      !searchQuery && 
      selectedCategory === "All" && 
      selectedSource === "All" && 
      featuredNews && 
      item.id === featuredNews.id
    ) {
      return false;
    }
    
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchesSource = selectedSource === 'All' || item.source === selectedSource;

    return matchesSearch && matchesCategory && matchesSource;
  });
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Breaking': return 'bg-red-500 text-white';
      case 'Market Analysis': return 'bg-blue-500 text-white';
      case 'Company News': return 'bg-purple-500 text-white';
      case 'Economy': return 'bg-green-500 text-white';
      case 'Technology': return 'bg-indigo-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        {/* Hero section skeleton */}
        <div className="w-full h-[400px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse mb-8"></div>
        
        <div className="flex justify-between items-center">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-1/3">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
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
      {/* Featured News Hero Section */}
      {featuredNews && !searchQuery && selectedCategory === 'All' && selectedSource === 'All' && (
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 group">
          {featuredNews.imageUrl && (
            <div className="absolute inset-0">
              <Image 
                src={featuredNews.imageUrl} 
                alt={featuredNews.title} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredNews.category)}`}>
                {featuredNews.category}
              </span>
              <span className="text-sm opacity-90">{featuredNews.source}</span>
              <span className="text-sm opacity-90">•</span>
              <span className="text-sm opacity-90">{featuredNews.date}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-primary-foreground transition-colors">
              {featuredNews.title}
            </h2>
            
            <p className="text-lg text-white/80 mb-4 max-w-3xl">
              {featuredNews.description}
            </p>
            
            {featuredNews.url && (
              <Button 
                onClick={() => window.open(featuredNews.url, '_blank')} 
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Read Full Article
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-lg shadow-sm border">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Financial News
        </h1>
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg shadow-sm border">
        <NewsFilters
          categories={categories}
          sources={sources}
          selectedCategory={selectedCategory}
          selectedSource={selectedSource}
          onCategorySelect={handleCategorySelect}
          onSourceSelect={handleSourceSelect}
        />
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((newsItem) => (
            <NewsCard 
              key={newsItem.id} 
              news={newsItem} 
              categoryColorClass={getCategoryColor(newsItem.category)}
            />
          ))}
        </div>
      ) : (
        <Card className="border shadow-md">
          <CardContent className="py-16 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-muted-foreground mb-4"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No news found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
