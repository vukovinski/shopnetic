import React from 'react';
import { Star, Plus, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Sale
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
        </button>

        {/* Quick Add Button */}
        {product.inStock && (
          <button
            onClick={() => onAddToCart(product)}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-700 transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {product.inStock ? (
            <button
              onClick={() => onAddToCart(product)}
              className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add to Cart
            </button>
          ) : (
            <span className="text-sm text-gray-500 font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;