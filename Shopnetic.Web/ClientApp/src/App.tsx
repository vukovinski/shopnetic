import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetailsPage from './pages/ProductDetails';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import { products, categories } from './data/mockData';
import { CartItem, FilterState, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <ShopPage 
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onCartClick={() => setIsCartOpen(true)}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailsPage
                cartItems={cartItems}
                onCartClick={() => setIsCartOpen(true)}
                onAddToCart={handleAddToCart}
              />
            } 
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        {/* Global Cart */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        {/* Global Checkout */}
        <Checkout
          isOpen={isCheckoutOpen}
          onClose={handleCheckoutClose}
          cartItems={cartItems}
        />
      </Router>
    </AuthProvider>
  );
}

function ShopPage({ cartItems, onAddToCart, onCartClick }: {
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onCartClick: () => void;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 2000],
    rating: 0,
    inStock: false
  });

  // Get unique categories and brands for filters
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const uniqueBrands = [...new Set(products.map(p => p.brand))];

  // Filter products based on search, category, and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter (from category selection)
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sidebar filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    return filtered;
  }, [searchQuery, selectedCategory, filters]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Clear category filters when selecting from category section
    setFilters(prev => ({ ...prev, categories: [] }));
  };

  const clearCategorySelection = () => {
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItems={cartItems}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={onCartClick}
      />

      {/* Show category section only when no specific category is selected and no search */}
      {!selectedCategory && !searchQuery && (
        <CategorySection
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb and title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {selectedCategory && (
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={clearCategorySelection}
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  All Products
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 capitalize font-medium">
                  {selectedCategory}
                </span>
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedCategory
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                : 'Featured Products'
              }
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              categories={uniqueCategories}
              brands={uniqueBrands}
              isOpen={true}
              onToggle={() => {}}
            />
          </div>

          {/* Mobile Sidebar */}
          {/*<FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            categories={uniqueCategories}
            brands={uniqueBrands}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(false)}
          />*/}

          {/* Main Content */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={onAddToCart}
              onProductClick={() => {}} // Not used anymore since we navigate directly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;