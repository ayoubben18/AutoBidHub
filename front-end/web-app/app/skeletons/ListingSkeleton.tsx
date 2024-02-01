import React from "react";

const ListingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 pt-10 sm:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-6">
      <div className="flex flex-col gap-4 aspect-w-16 ">
        <div className="skeleton w-full aspect-h-10 rounded-lg"></div>
      </div>
      <div className="flex opacity-80 flex-col gap-4 aspect-w-16 aspect-h-10 rounded-lg">
        <div className="skeleton w-full aspect-h-10 rounded-lg"></div>
      </div>
      <div className="flex opacity-60 flex-col gap-4 aspect-w-16 aspect-h-10 rounded-lg">
        <div className="skeleton w-full aspect-h-10 rounded-lg"></div>
      </div>
      <div className="flex opacity-40 flex-col gap-4 aspect-w-16 aspect-h-10 rounded-lg">
        <div className="skeleton w-full aspect-h-10 rounded-lg"></div>
      </div>
      <div className="flex opacity-20 flex-col gap-4 aspect-w-16 aspect-h-10 rounded-lg">
        <div className="skeleton w-full aspect-h-10 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ListingSkeleton;
