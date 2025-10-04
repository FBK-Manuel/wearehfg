// SkeletonCard.tsx
import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="relative w-full bg-transparent animate-pulse">
      {/* Image placeholder */}
      <div className="h-64 w-full rounded-2xl bg-gray-300"></div>

      {/* Info placeholder */}
      <div className="mt-3 space-y-2 text-center">
        <div className="h-4 w-3/4 mx-auto rounded bg-gray-200"></div>
        <div className="h-4 w-1/2 mx-auto rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
