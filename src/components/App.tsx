import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { Filters } from './components/Filters';
import { ProductModal } from './components/ProductModal';
import { LoginModal } from './components/LoginModal';
import { Banner } from './components/Banner';
import { products } from './data/products';
import { Product } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Filter states
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Get available brands from products
  const availableBrands = useMemo(() => {
    const brands = [...new Set(products.map(product => product.brand))];
    return brands.sort();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, we'll sort by id (assuming higher id = newer)
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, priceRange, selectedBrands]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={setSearchQuery} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
      />
      
      <CategoryNav
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <Banner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Filters
              isOpen={isFiltersOpen}
              onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
              onClose={() => setIsFiltersOpen(false)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedBrands={selectedBrands}
              onBrandToggle={handleBrandToggle}
              availableBrands={availableBrands}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Results Header */}
            {(searchQuery || selectedCategory !== 'All') && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {searchQuery 
                        ? `Search results for "${searchQuery}"` 
                        : selectedCategory
                      }
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {filteredProducts.length} products found
                    </p>
                  </div>
                  {(searchQuery || selectedCategory !== 'All') && (
                    <button
                      onClick={clearSearch}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}

            <ProductGrid 
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

export default App;