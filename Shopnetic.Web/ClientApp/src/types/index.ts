export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  reviews: {
    user: string;
    comment: string;
    date: Date;
    rating: number;
  }[];
  description: string;
  features: string[];
  inStock: boolean;
  inventory: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}