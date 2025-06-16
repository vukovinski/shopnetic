import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 45
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 78
  },
  {
    id: 'home',
    name: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 32
  },
  {
    id: 'sports',
    name: 'Sports',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 56
  },
  {
    id: 'books',
    name: 'Books',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 124
  },
  {
    id: 'beauty',
    name: 'Beauty',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 67
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'electronics',
    brand: 'TechPro',
    rating: 4.5,
    reviewCount: 128,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    features: ['Active Noise Cancellation', '30-hour battery', 'Quick charge', 'Premium sound quality'],
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'electronics',
    brand: 'FitTech',
    rating: 4.7,
    reviewCount: 89,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Sleep Tracking'],
    inStock: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'fashion',
    brand: 'EcoWear',
    rating: 4.3,
    reviewCount: 45,
    description: 'Sustainable organic cotton t-shirt with perfect fit and comfort.',
    features: ['100% Organic Cotton', 'Sustainable Production', 'Comfortable Fit', 'Various Colors'],
    inStock: true
  },
  {
    id: '4',
    name: 'Professional Camera',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'electronics',
    brand: 'PhotoPro',
    rating: 4.8,
    reviewCount: 156,
    description: 'Professional DSLR camera with advanced autofocus and 4K video recording.',
    features: ['4K Video Recording', 'Advanced Autofocus', 'Weather Sealed', 'Professional Quality'],
    inStock: true,
    isFeatured: true
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    price: 79.99,
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'sports',
    brand: 'ZenFit',
    rating: 4.6,
    reviewCount: 73,
    description: 'Premium yoga mat with superior grip and cushioning for all yoga practices.',
    features: ['Non-slip Surface', 'Extra Cushioning', 'Eco-friendly', 'Easy to Clean'],
    inStock: true
  },
  {
    id: '6',
    name: 'Modern Table Lamp',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'home',
    brand: 'HomeStyle',
    rating: 4.4,
    reviewCount: 92,
    description: 'Elegant modern table lamp with adjustable brightness and USB charging port.',
    features: ['Adjustable Brightness', 'USB Charging Port', 'Modern Design', 'Energy Efficient'],
    inStock: true,
    isNew: true
  },
  {
    id: '7',
    name: 'Programming Fundamentals',
    price: 49.99,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'books',
    brand: 'TechBooks',
    rating: 4.9,
    reviewCount: 234,
    description: 'Comprehensive guide to programming fundamentals for beginners and professionals.',
    features: ['Beginner Friendly', 'Code Examples', 'Practice Exercises', 'Expert Insights'],
    inStock: true
  },
  {
    id: '8',
    name: 'Natural Face Serum',
    price: 34.99,
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    brand: 'PureGlow',
    rating: 4.7,
    reviewCount: 67,
    description: 'Natural anti-aging face serum with vitamin C and hyaluronic acid.',
    features: ['Vitamin C', 'Hyaluronic Acid', 'Anti-aging', 'Natural Ingredients'],
    inStock: false
  },
  {
    id: '9',
    name: 'Wireless Charging Pad',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'electronics',
    brand: 'TechPro',
    rating: 4.2,
    reviewCount: 45,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    features: ['Fast Charging', 'Universal Compatibility', 'LED Indicator', 'Compact Design'],
    inStock: true,
    isNew: true
  },
  {
    id: '10',
    name: 'Designer Handbag',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'fashion',
    brand: 'LuxStyle',
    rating: 4.5,
    reviewCount: 83,
    description: 'Elegant designer handbag with premium leather and spacious compartments.',
    features: ['Premium Leather', 'Multiple Compartments', 'Designer Quality', 'Versatile Style'],
    inStock: true
  },
  {
    id: '11',
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'sports',
    brand: 'SportMax',
    rating: 4.6,
    reviewCount: 156,
    description: 'High-performance running shoes with advanced cushioning and breathable design.',
    features: ['Advanced Cushioning', 'Breathable Material', 'Durable Sole', 'Lightweight'],
    inStock: true,
    isFeatured: true
  },
  {
    id: '12',
    name: 'Smart Home Speaker',
    price: 99.99,
    image: 'https://images.pexels.com/photos/5077040/pexels-photo-5077040.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'electronics',
    brand: 'SmartTech',
    rating: 4.4,
    reviewCount: 98,
    description: 'Voice-controlled smart speaker with premium sound quality and smart home integration.',
    features: ['Voice Control', 'Smart Home Integration', 'Premium Sound', 'Compact Design'],
    inStock: true
  }
];