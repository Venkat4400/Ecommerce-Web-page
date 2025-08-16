import React from 'react';

export const Banner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Big Billion Days
          </h2>
          <p className="text-lg md:text-xl mb-4">
            Unbelievable deals on your favorite products
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm md:text-base">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              Up to 80% OFF
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              Free Delivery
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              Easy Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};