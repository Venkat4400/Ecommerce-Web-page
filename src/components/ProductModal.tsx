import React from 'react';
import { X, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useStore();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const discountAmount = product.originalPrice 
    ? product.originalPrice - product.price 
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-sm text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex-1">
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Brand and Title */}
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                  {product.brand}
                </p>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                {discountAmount > 0 && (
                  <p className="text-green-600 font-medium">
                    You save {formatPrice(discountAmount)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-gray-600">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-gray-600">1 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RotateCcw className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-gray-600">Easy Returns</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 text-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};