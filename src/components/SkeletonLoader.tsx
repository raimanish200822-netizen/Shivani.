import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-xs animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="aspect-4/3 w-full bg-slate-200" />
      
      {/* Body Skeleton */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-16 h-3 bg-slate-200 rounded-md" />
            <div className="w-20 h-3 bg-slate-200 rounded-md" />
          </div>
          <div className="w-4/5 h-4 bg-slate-300 rounded-md mt-2" />
          <div className="w-full h-3 bg-slate-200 rounded-md" />
          <div className="w-3/4 h-3 bg-slate-200 rounded-md" />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="w-16 h-4 bg-slate-200 rounded-md" />
          <div className="flex gap-2 w-1/2">
            <div className="flex-1 h-8 bg-slate-200 rounded-xl" />
            <div className="flex-1 h-8 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductListSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="w-48 h-4 bg-slate-200 rounded-md" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/3 w-full bg-slate-200 rounded-3xl" />
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-4/3 bg-slate-200 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Right Configurator skeleton */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 rounded-3xl border border-slate-200">
          <div className="space-y-3">
            <div className="w-24 h-5 bg-slate-200 rounded-md" />
            <div className="w-3/4 h-8 bg-slate-300 rounded-md" />
            <div className="w-1/2 h-4 bg-slate-200 rounded-md" />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="w-full h-12 bg-slate-200 rounded-xl" />
            <div className="w-full h-12 bg-slate-200 rounded-xl" />
            <div className="w-full h-12 bg-slate-200 rounded-xl" />
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <div className="flex-1 h-12 bg-slate-200 rounded-2xl" />
            <div className="flex-1 h-12 bg-slate-300 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
