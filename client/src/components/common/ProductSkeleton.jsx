import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse relative">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-100 p-4 flex items-center justify-center">
        <div className="h-32 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-5 bg-gray-200 rounded w-12 mr-1"></div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
