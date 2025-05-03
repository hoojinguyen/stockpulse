export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="p-4 bg-red-50 text-red-800 rounded-md">
      <p>{message}</p>
      <button className="mt-2 text-sm font-medium">Try Again</button>
    </div>
  );
};
