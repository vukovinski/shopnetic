import React, { useState } from 'react';
import { X, Star, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen || !product) return null;

  // Mock additional images for gallery
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different angles
    product.image,
    product.image
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Absolutely love this product! The quality is outstanding and it exceeded my expectations.',
      verified: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great value for money. Fast shipping and exactly as described.',
      verified: true
    },
    {
      id: 3,
      name: 'Emma Wilson',
      rating: 5,
      date: '2024-01-08',
      comment: 'Perfect! Will definitely buy again. Highly recommended.',
      verified: false
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      rating: 4,
      date: '2024-01-05',
      comment: 'Good quality product. Delivery was quick and packaging was excellent. Would recommend to others.',
      verified: true
    },
    {
      id: 5,
      name: 'Jessica Taylor',
      rating: 5,
      date: '2024-01-03',
      comment: 'Outstanding product! Exceeded all my expectations. The build quality is superb and it works flawlessly. Customer service was also very helpful when I had questions.',
      verified: true
    },
    {
      id: 6,
      name: 'David Kim',
      rating: 4,
      date: '2024-01-01',
      comment: 'Very satisfied with this purchase. The product arrived quickly and was exactly as described. Great customer service too.',
      verified: true
    },
    {
      id: 7,
      name: 'Lisa Brown',
      rating: 5,
      date: '2023-12-28',
      comment: 'Fantastic quality and excellent value. I would definitely purchase from this brand again.',
      verified: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 z-10 ml-auto mr-4 mt-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 flex"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Main Content Container */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Images */}
            <div className="lg:w-1/2 p-6 pt-0">
              {/* Main Image */}
              <div className="relative mb-6 bg-gray-50 rounded-xl overflow-hidden">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
                      isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-3 justify-center lg:justify-start">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="lg:w-1/2 border-l border-gray-200 p-6">
              {/* Product Header */}
              <div className="mb-6">
                <p className="text-sm text-blue-600 font-medium mb-2">{product.brand}</p>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded-full">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              {product.inStock && (
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-3 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-3 font-medium text-gray-900 min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-3 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>
              )}

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">2-year warranty included</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-orange-600" />
                  <span className="text-gray-700">30-day return policy</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex border-b border-gray-200 mb-4">
                  {['description', 'reviews', 'specifications'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-4 py-2 font-medium text-sm capitalize transition-colors duration-200 border-b-2 ${
                        selectedTab === tab
                          ? 'text-blue-600 border-blue-600'
                          : 'text-gray-500 border-transparent hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                  {selectedTab === 'description' && (
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        This premium product combines cutting-edge technology with elegant design to deliver 
                        an exceptional user experience. Crafted with attention to detail and built to last, 
                        it represents the perfect balance of form and function.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Whether you're a professional or enthusiast, this product delivers the performance 
                        and reliability you need. Every component has been carefully selected and tested to 
                        ensure maximum durability and optimal performance in any environment.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Experience the difference that quality makes. This isn't just another product – 
                        it's a commitment to excellence that you can see and feel in every detail.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The innovative design incorporates user feedback and the latest technological advances 
                        to create a product that not only meets but exceeds expectations. From the moment you 
                        unbox it, you'll notice the premium materials and meticulous craftsmanship.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Backed by our comprehensive warranty and dedicated customer support, this product 
                        represents a smart investment in quality and performance that will serve you well 
                        for years to come.
                      </p>
                    </div>
                  )}

                  {selectedTab === 'reviews' && (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{review.name}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'specifications' && (
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Brand</span>
                        <span className="text-gray-700">{product.brand}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Category</span>
                        <span className="text-gray-700 capitalize">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">SKU</span>
                        <span className="text-gray-700">{product.id.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Availability</span>
                        <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Weight</span>
                        <span className="text-gray-700">2.5 lbs</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Dimensions</span>
                        <span className="text-gray-700">12" x 8" x 3"</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Material</span>
                        <span className="text-gray-700">Premium Grade Materials</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Warranty</span>
                        <span className="text-gray-700">2 Years</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Country of Origin</span>
                        <span className="text-gray-700">USA</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Model Number</span>
                        <span className="text-gray-700">PRO-{product.id.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Color Options</span>
                        <span className="text-gray-700">Black, White, Silver</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Power Requirements</span>
                        <span className="text-gray-700">AC 100-240V, 50/60Hz</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Operating Temperature</span>
                        <span className="text-gray-700">32°F to 95°F (0°C to 35°C)</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Humidity Range</span>
                        <span className="text-gray-700">10% to 90% non-condensing</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Certifications</span>
                        <span className="text-gray-700">CE, FCC, RoHS</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;