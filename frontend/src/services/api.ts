export const fetchStocks = async (): Promise<[]> => {
  const response = await fetch('/api/stocks');
  if (!response.ok) {
    throw new Error('Failed to fetch stocks');
  }
  return response.json();
};
