import React from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

interface FiltersProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  availableBrands: string[];
}

export const Filters: React.FC<FiltersProps> = ({
  isOpen,
  onToggle,
  onClose,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  selectedBrands,
  onBrandToggle,
  availableBrands,
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
  ];

  const priceRanges = [
    { label: 'Under ₹1,000', value: [0, 1000] as [number, number] },
    { label: '₹1,000 - ₹5,000', value: [1000, 5000] as [number, number] },
    { label: '₹5,000 - ₹10,000', value: [5000, 10000] as [number, number] },
    { label: '₹10,000 - ₹25,000', value: [10000, 25000] as [number, number] },
    { label: '₹25,000 - ₹50,000', value: [25000, 50000] as [number, number] },
    { label: 'Above ₹50,000', value: [50000, Infinity] as [number, number] },
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters & Sort</span>
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Filters & Sort
        </h3>

        {/* Sort By */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Price</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    priceRange[0] === range.value[0] &&
                    priceRange[1] === range.value[1]
                  }
                  onChange={() => onPriceRangeChange(range.value)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-600">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Brand</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableBrands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  className="text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white h-full w-full max-w-sm ml-auto flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Filters & Sort</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Mobile Sort By */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={
                          priceRange[0] === range.value[0] &&
                          priceRange[1] === range.value[1]
                        }
                        onChange={() => onPriceRangeChange(range.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Brands */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Brand</h4>
                <div className="space-y-2">
                  {availableBrands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => onBrandToggle(brand)}
                        className="text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};