export const StockTableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full animate-pulse">
      {/* Table header */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-t-lg">
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Table rows */}
      {[...Array(rows)].map((_, index) => (
        <div key={index} className="flex items-center justify-between p-4 border-b">
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export const NewsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border rounded-lg p-4 animate-pulse">
          {/* Image placeholder */}
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>

          {/* Title placeholder */}
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

          {/* Description placeholder */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Footer placeholder */}
          <div className="flex justify-between items-center mt-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
