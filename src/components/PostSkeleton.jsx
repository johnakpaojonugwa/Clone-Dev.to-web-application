export default function PostSkeleton() {
  return (
    <div className="animate-pulse bg-white border-b p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-gray-300 rounded-full" />
        <div className="h-3 w-32 bg-gray-300 rounded" />
      </div>

      <div className="h-5 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />

      <div className="flex gap-3">
        <div className="h-3 w-12 bg-gray-200 rounded" />
        <div className="h-3 w-12 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
