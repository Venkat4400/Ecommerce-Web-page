import React from 'react';
import { categories } from '../data/products';
import * as LucideIcons from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 overflow-x-auto py-3 scrollbar-hide">
          <button
            onClick={() => onCategorySelect('All')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 font-medium ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <span>All Products</span>
          </button>
          
          {categories.map((category) => {
            const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ComponentType<{className?: string}>;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 font-medium ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};