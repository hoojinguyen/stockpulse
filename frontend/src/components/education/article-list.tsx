'use client';

import { Article } from '@/types/education';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
}

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

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all">
      {/* Image (top on mobile, left on desktop) */}
      <div className="md:w-[200px] h-[150px] rounded-md overflow-hidden bg-muted flex-shrink-0">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
            {article.category}
          </span>
          <span>{article.readTime}</span>
        </div>
        
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
        
        <p className="text-muted-foreground">{article.excerpt}</p>
        
        <Link 
          href={`/education/articles/${article.id}`} 
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Read More
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
};

const ArticleCardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 rounded-lg border bg-card p-6 shadow-sm">
      {/* Image skeleton */}
      <div className="md:w-[200px] h-[150px] rounded-md bg-muted animate-pulse flex-shrink-0" />
      
      {/* Content skeleton */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-muted rounded animate-pulse" />
          <div className="h-5 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-7 w-3/4 bg-muted rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <span>•</span>
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
};

export function ArticleList({ articles, isLoading = false }: ArticleListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
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
        <h3 className="text-xl font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}