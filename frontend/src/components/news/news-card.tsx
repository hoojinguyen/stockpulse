import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

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

interface NewsCardProps {
  news: NewsItem;
  categoryColorClass?: string;
}

export function NewsCard({ news, categoryColorClass }: NewsCardProps) {
  const { category, source, date, title, description, imageUrl, url } = news;

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      {/* News Image */}
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
          <Badge className={`absolute top-2 left-2 z-10 ${categoryColorClass || ''}`} variant={categoryColorClass ? "outline" : "secondary"}>
            {category}
          </Badge>
        </div>
      )}

      <CardContent className="flex-grow p-4">
        {/* Source and Date */}
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <span>{source}</span>
          <span>{date}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {url && (
          <Button variant="outline" className="w-full" onClick={() => window.open(url, '_blank')}>
            Read Full Article
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
