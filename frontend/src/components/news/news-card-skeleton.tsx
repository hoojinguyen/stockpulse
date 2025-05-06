import React from 'react';

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