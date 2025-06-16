import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  categories,
  brands,
  isOpen,
  onToggle
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand);
    
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: [0, 2000],
      rating: 0,
      inStock: false
    });
  };

  const sidebarClasses = `
    fixed lg:relative top-0 left-0 h-full lg:h-auto bg-white shadow-lg lg:shadow-none
    w-80 lg:w-full transform transition-transform duration-300 ease-in-out z-40
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    overflow-y-auto
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div className={sidebarClasses}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Clear All
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200 capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={(e) => handleBrandChange(brand, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center group cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.rating === rating}
                    onChange={(e) => onFiltersChange({ ...filters, rating: Number(e.target.value) })}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {rating}+ Stars
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                In Stock Only
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;