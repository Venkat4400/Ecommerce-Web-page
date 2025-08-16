import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, Heart, Bell } from 'lucide-react';
import { useStore } from '../store/useStore';

interface HeaderProps {
  onSearch: (query: string) => void;
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onLoginClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, user } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-white hover:text-blue-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-white">
                Flip<span className="text-yellow-300">kart</span>
              </h1>
              <div className="hidden sm:block ml-2 text-xs text-blue-200 italic">
                Explore <span className="text-yellow-300 font-semibold">Plus</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full px-4 py-2.5 pl-12 text-gray-900 bg-white rounded-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* User Account */}
            <button
              onClick={onLoginClick}
              className="hidden md:flex items-center space-x-2 text-white hover:text-blue-200 transition-colors font-medium"
            >
              <User className="h-5 w-5" />
              <span>{user ? user.name : 'Login'}</span>
            </button>

            {/* Mobile Search */}
            <button className="md:hidden text-white hover:text-blue-200 transition-colors">
              <Search className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:block text-white hover:text-blue-200 transition-colors">
              <Heart className="h-6 w-6" />
            </button>

            {/* Notifications */}
            <button className="hidden sm:block text-white hover:text-blue-200 transition-colors">
              <Bell className="h-6 w-6" />
            </button>

            {/* Cart */}
            <button className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors font-medium relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 pl-12 text-gray-900 bg-white rounded-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-600">
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-3 text-white hover:text-blue-200 transition-colors w-full text-left"
            >
              <User className="h-5 w-5" />
              <span>{user ? user.name : 'Login'}</span>
            </button>
            <button className="flex items-center space-x-3 text-white hover:text-blue-200 transition-colors w-full text-left">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </button>
            <button className="flex items-center space-x-3 text-white hover:text-blue-200 transition-colors w-full text-left">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};