'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/types/education';
import Link from 'next/link';

// Mock articles data (in a real app, this would come from an API)
const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Diversification 101',
    author: 'John Smith',
    date: 'May 1, 2025',
    excerpt: 'Learn why spreading your investments across different assets is crucial for managing risk and building a resilient portfolio.',
    category: 'Beginner Guides',
    imageUrl: '/images/diversification.jpg',
    readTime: '8 min read',
    content: `
      <h2>Why Diversification Matters</h2>
      <p>Diversification is one of the most fundamental principles in investing. By spreading your investments across various asset classes, sectors, and geographic regions, you can reduce the impact of volatility on your overall portfolio.</p>
      
      <p>The concept is simple: different assets often respond differently to the same economic event. When one investment is performing poorly, another might be doing well, helping to offset losses and smooth out your returns over time.</p>
      
      <h2>How to Diversify Your Portfolio</h2>
      <p>Here are some key strategies for effective diversification:</p>
      <ul>
        <li><strong>Asset Class Diversification:</strong> Spread investments across stocks, bonds, real estate, and cash equivalents.</li>
        <li><strong>Sector Diversification:</strong> Invest in companies from different industries like technology, healthcare, finance, and consumer goods.</li>
        <li><strong>Geographic Diversification:</strong> Include investments from both domestic and international markets.</li>
        <li><strong>Investment Style Diversification:</strong> Mix growth and value investments, as well as different market capitalizations.</li>
      </ul>
      
      <h2>Common Diversification Mistakes</h2>
      <p>Even experienced investors can make these diversification errors:</p>
      <ul>
        <li><strong>Over-diversification:</strong> Having too many investments can dilute returns and make your portfolio difficult to manage.</li>
        <li><strong>False diversification:</strong> Owning multiple investments that behave similarly doesn't provide true diversification.</li>
        <li><strong>Neglecting correlation:</strong> Not considering how different assets move in relation to each other.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Diversification doesn't guarantee profits or protect against losses in declining markets, but it remains one of the most powerful risk management tools available to investors. Regular portfolio reviews and rebalancing are essential to maintain proper diversification as market conditions change.</p>
    `,
  },
  {
    id: 2,
    title: 'Understanding P/E Ratios',
    author: 'Sarah Johnson',
    date: 'May 3, 2025',
    excerpt: 'Price-to-earnings ratios are essential metrics for value investors. Learn how to interpret them and use them in your investment decisions.',
    category: 'Terms',
    imageUrl: '/images/pe-ratio.jpg',
    readTime: '6 min read',
    content: `
      <h2>What is a P/E Ratio?</h2>
      <p>The Price-to-Earnings (P/E) ratio is one of the most widely used valuation metrics in the investment world. It compares a company's share price to its earnings per share (EPS), giving investors an idea of how much they're paying for each dollar of earnings.</p>
      
      <p>The formula is simple: P/E Ratio = Share Price ÷ Earnings Per Share</p>
      
      <h2>Types of P/E Ratios</h2>
      <ul>
        <li><strong>Trailing P/E:</strong> Uses the company's actual earnings from the past 12 months.</li>
        <li><strong>Forward P/E:</strong> Uses projected earnings for the next 12 months.</li>
        <li><strong>Shiller P/E (CAPE):</strong> Uses average inflation-adjusted earnings from the previous 10 years.</li>
      </ul>
      
      <h2>Interpreting P/E Ratios</h2>
      <p>A high P/E ratio might indicate that:</p>
      <ul>
        <li>Investors expect high earnings growth in the future</li>
        <li>The stock might be overvalued</li>
        <li>The company operates in a high-growth industry</li>
      </ul>
      
      <p>A low P/E ratio might indicate that:</p>
      <ul>
        <li>The stock might be undervalued</li>
        <li>Investors expect earnings to decline</li>
        <li>The company operates in a mature or declining industry</li>
      </ul>
      
      <h2>Limitations of P/E Ratios</h2>
      <p>While useful, P/E ratios have several limitations:</p>
      <ul>
        <li>They don't account for company growth rates</li>
        <li>Earnings can be manipulated through accounting practices</li>
        <li>P/E ratios vary widely across different industries</li>
        <li>They don't work well for companies with negative earnings</li>
      </ul>
      
      <h2>Using P/E Ratios in Your Investment Strategy</h2>
      <p>To make the most of P/E ratios:</p>
      <ul>
        <li>Compare a company's P/E to its historical average</li>
        <li>Compare P/E ratios among companies in the same industry</li>
        <li>Consider P/E alongside other valuation metrics like PEG ratio, P/B ratio, and dividend yield</li>
        <li>Use P/E as one tool in your broader investment analysis, not as the sole decision factor</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: 'Dividend Investing Strategy',
    author: 'Michael Chen',
    date: 'May 5, 2025',
    excerpt: 'Discover how to build a passive income stream through dividend-paying stocks and the key metrics to evaluate dividend sustainability.',
    category: 'Strategies',
    imageUrl: '/images/dividend.jpg',
    readTime: '10 min read',
    content: `
      <h2>The Power of Dividend Investing</h2>
      <p>Dividend investing is a strategy that focuses on building a portfolio of stocks that regularly distribute a portion of their earnings to shareholders. This approach can provide a steady income stream while also offering potential for long-term capital appreciation.</p>
      
      <h2>Key Benefits of Dividend Investing</h2>
      <ul>
        <li><strong>Passive Income:</strong> Regular dividend payments can supplement your income or be reinvested for compound growth.</li>
        <li><strong>Lower Volatility:</strong> Dividend-paying companies tend to be more established and less volatile than non-dividend payers.</li>
        <li><strong>Inflation Protection:</strong> Many quality dividend companies increase their payouts over time, helping to combat inflation.</li>
        <li><strong>Downside Protection:</strong> Dividends can cushion the blow during market downturns.</li>
      </ul>
      
      <h2>Essential Metrics for Dividend Investors</h2>
      <p>When evaluating dividend stocks, consider these key metrics:</p>
      <ul>
        <li><strong>Dividend Yield:</strong> Annual dividend payment divided by share price, expressed as a percentage.</li>
        <li><strong>Dividend Payout Ratio:</strong> Percentage of earnings paid as dividends. Lower ratios (40-60%) often indicate more sustainable dividends.</li>
        <li><strong>Dividend Growth Rate:</strong> How quickly the company has increased its dividend over time.</li>
        <li><strong>Dividend Coverage Ratio:</strong> How many times the company could pay its dividend from its earnings.</li>
        <li><strong>Free Cash Flow:</strong> Cash available after capital expenditures, which supports dividend payments.</li>
      </ul>
      
      <h2>Building a Dividend Portfolio</h2>
      <p>A well-constructed dividend portfolio typically includes:</p>
      <ul>
        <li><strong>Dividend Aristocrats:</strong> Companies that have increased dividends for 25+ consecutive years.</li>
        <li><strong>Dividend Kings:</strong> Companies with 50+ years of consecutive dividend increases.</li>
        <li><strong>REITs:</strong> Real Estate Investment Trusts that must distribute 90% of taxable income to shareholders.</li>
        <li><strong>Utilities:</strong> Companies that typically offer higher yields with regulated, stable businesses.</li>
        <li><strong>Dividend ETFs:</strong> Exchange-traded funds that hold a basket of dividend-paying stocks.</li>
      </ul>
      
      <h2>Common Dividend Investing Mistakes</h2>
      <ul>
        <li><strong>Chasing Yield:</strong> Extremely high yields often signal unsustainable dividends or troubled companies.</li>
        <li><strong>Ignoring Dividend Growth:</strong> A growing dividend often matters more than a high current yield.</li>
        <li><strong>Neglecting Diversification:</strong> Spreading investments across sectors reduces risk.</li>
        <li><strong>Overlooking Tax Implications:</strong> Different dividend types have different tax treatments.</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: 'Technical Analysis Fundamentals',
    author: 'Emma Wilson',
    date: 'May 7, 2025',
    excerpt: 'Learn the basics of chart patterns, indicators, and how technical analysis can complement your fundamental research.',
    category: 'Market Analysis',
    imageUrl: '/images/technical-analysis.jpg',
    readTime: '12 min read',
  },
  {
    id: 5,
    title: 'VN-Index Historical Performance',
    author: 'Nguyen Van Minh',
    date: 'May 10, 2025',
    excerpt: 'A detailed analysis of the VN-Index performance over the past decade and key factors that have influenced its movements.',
    category: 'Market Analysis',
    imageUrl: '/images/vn-index.jpg',
    readTime: '9 min read',
  },
  {
    id: 6,
    title: 'Dollar-Cost Averaging Explained',
    author: 'David Park',
    date: 'May 12, 2025',
    excerpt: 'Discover how this simple investment strategy can help reduce the impact of volatility and build wealth over time.',
    category: 'Strategies',
    imageUrl: '/images/dca.jpg',
    readTime: '7 min read',
  },
];

export default function ArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/articles/${params.id}`);
        // const data = await response.json();
        // setArticle(data);

        // Using mock data for now
        const articleId = parseInt(params.id);
        const foundArticle = mockArticles.find((a) => a.id === articleId);
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to fetch article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="flex gap-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-4 bg-muted rounded-full" />
            <div className="h-4 w-24 bg-muted rounded" />
          </div>
          <div className="h-64 w-full bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center py-12 text-center">
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
          <h3 className="text-xl font-semibold mb-2">{error || 'Article not found'}</h3>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/education"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Back to Education
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        href="/education"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1 h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Education
      </Link>

      <div className="space-y-6">
        <div>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold mt-2">{article.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {article.imageUrl && (
          <div className="rounded-lg overflow-hidden h-[300px] md:h-[400px] bg-muted">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {article.content ? (
          <div 
            className="prose prose-slate max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg">{article.excerpt}</p>
            <p className="text-muted-foreground italic">
              Full article content coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}