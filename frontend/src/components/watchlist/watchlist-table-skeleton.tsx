'use client';

export function WatchlistTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="p-4 text-left font-medium text-muted-foreground">Symbol</th>
              <th className="p-4 text-left font-medium text-muted-foreground">Company</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Price</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Change</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Value</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array(rows)
              .fill(0)
              .map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-4 bg-gray-200 rounded w-16 ml-auto animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-4 bg-gray-200 rounded w-16 ml-auto animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-4 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="h-8 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}