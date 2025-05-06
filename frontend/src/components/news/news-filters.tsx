import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NewsFiltersProps {
  categories: string[];
  sources: string[];
  selectedCategory: string;
  selectedSource: string;
  onCategorySelect: (category: string) => void;
  onSourceSelect: (source: string) => void;
}

export function NewsFilters({
  categories,
  sources,
  selectedCategory,
  selectedSource,
  onCategorySelect,
  onSourceSelect,
}: NewsFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Categories Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <Tabs value={selectedCategory} onValueChange={onCategorySelect} className="w-full">
          <TabsList className="w-full h-auto flex flex-wrap justify-start">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="mb-1 mr-1"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Sources Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Sources</h3>
        <Tabs value={selectedSource} onValueChange={onSourceSelect} className="w-full">
          <TabsList className="w-full h-auto flex flex-wrap justify-start">
            {sources.map((source) => (
              <TabsTrigger 
                key={source} 
                value={source}
                className="mb-1 mr-1"
              >
                {source}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="relative h-48 w-full bg-gray-200 animate-pulse" />
      
      <div className="p-4 flex-grow">
        {/* Source and Date Skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        
        {/* Title Skeleton */}
        <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
        
        {/* Description Skeleton */}
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
      </div>
      
      <div className="p-4 pt-0">
        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}