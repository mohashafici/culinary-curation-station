
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-orange-200 text-lg">Cooking up something delicious...</p>
    </div>
  );
};

export default LoadingSpinner;
