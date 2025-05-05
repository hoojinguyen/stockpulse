/**
 * Interface for article data in the Education section
 */
export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  readTime: string;
  content?: string; // Full article content (for article detail page)
}