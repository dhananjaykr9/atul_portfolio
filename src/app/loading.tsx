export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory  px-4">
      <div className="w-full max-w-4xl space-y-8 animate-pulse">
        {/* Skeleton Header */}
        <div className="space-y-4 text-center">
          <div className="h-4 bg-oxford-blue/10  rounded w-1/4 mx-auto"></div>
          <div className="h-10 bg-oxford-blue/10  rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-oxford-blue/10  rounded w-1/2 mx-auto"></div>
        </div>

        {/* Skeleton Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 border border-oxford-blue/5  rounded-sm space-y-4">
              <div className="h-32 bg-oxford-blue/5  rounded-sm"></div>
              <div className="h-4 bg-oxford-blue/10  rounded w-3/4"></div>
              <div className="h-4 bg-oxford-blue/10  rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
