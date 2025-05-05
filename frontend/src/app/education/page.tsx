'use client';

import { ArticleList } from '@/components/education/article-list';
import { CategorySidebar } from '@/components/education/category-sidebar';
import { Input } from '@/components/ui/input';
import { Article } from '@/types/education';
import { useEffect, useState } from 'react';

// Mock data for articles
const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Diversification 101',
    author: 'John Smith',
    date: 'May 1, 2025',
    excerpt:
      'Learn why spreading your investments across different assets is crucial for managing risk and building a resilient portfolio.',
    category: 'Beginner Guides',
    imageUrl: '/images/diversification.jpg',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Understanding P/E Ratios',
    author: 'Sarah Johnson',
    date: 'May 3, 2025',
    excerpt:
      'Price-to-earnings ratios are essential metrics for value investors. Learn how to interpret them and use them in your investment decisions.',
    category: 'Terms',
    imageUrl: '/images/pe-ratio.jpg',
    readTime: '6 min read',
  },
  {
    id: 3,
    title: 'Dividend Investing Strategy',
    author: 'Michael Chen',
    date: 'May 5, 2025',
    excerpt:
      'Discover how to build a passive income stream through dividend-paying stocks and the key metrics to evaluate dividend sustainability.',
    category: 'Strategies',
    imageUrl: '/images/dividend.jpg',
    readTime: '10 min read',
  },
  {
    id: 4,
    title: 'Technical Analysis Fundamentals',
    author: 'Emma Wilson',
    date: 'May 7, 2025',
    excerpt:
      'Learn the basics of chart patterns, indicators, and how technical analysis can complement your fundamental research.',
    category: 'Market Analysis',
    imageUrl: '/images/technical-analysis.jpg',
    readTime: '12 min read',
  },
  {
    id: 5,
    title: 'VN-Index Historical Performance',
    author: 'Nguyen Van Minh',
    date: 'May 10, 2025',
    excerpt:
      'A detailed analysis of the VN-Index performance over the past decade and key factors that have influenced its movements.',
    category: 'Market Analysis',
    imageUrl: '/images/vn-index.jpg',
    readTime: '9 min read',
  },
  {
    id: 6,
    title: 'Dollar-Cost Averaging Explained',
    author: 'David Park',
    date: 'May 12, 2025',
    excerpt:
      'Discover how this simple investment strategy can help reduce the impact of volatility and build wealth over time.',
    category: 'Strategies',
    imageUrl: '/images/dca.jpg',
    readTime: '7 min read',
  },
];

// Available categories
const categories = ['All', 'Beginner Guides', 'Strategies', 'Market Analysis', 'Terms'];

export default function EducationPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/articles');
        // const data = await response.json();
        // setArticles(data);

        // Using mock data for now
        setArticles(mockArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to fetch articles. Using fallback data.');
        setArticles(mockArticles);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on search query and selected category
  useEffect(() => {
    let result = articles;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((article) => article.category === selectedCategory);
    }

    setFilteredArticles(result);
  }, [articles, searchQuery, selectedCategory]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Educational Resources</h1>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-md">
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      {error && <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Sidebar (Desktop) */}
        <div className="hidden lg:block">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Category Dropdown (Mobile) */}
        <div className="lg:hidden">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Article List */}
        <div className="lg:col-span-3">
          <ArticleList articles={filteredArticles} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
