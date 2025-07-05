export interface Order {
  id: number;
  orderNumber: number;
  customer: string;
  total: number;
  status: 'Created' | 'Verified' | 'Rejected' | 'Confirmed' | 'Shipped';
  date: Date;
  items: OrderItem[];
  shippingAddress: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Shipment {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  status: 'preparing' | 'shipped' | 'in-transit' | 'delivered';
  estimatedDelivery: string;
  customer: string;
  destination: string;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
  contents?: File;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  category: string;
  categoryId: number;
  stock: number;
  lowStockThreshold: number;
  status: 'Active' | 'Inactive';
  images?: ProductImage[];
  description?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}