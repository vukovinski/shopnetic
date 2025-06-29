export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: OrderItem[];
  shippingAddress: string;
}

export interface OrderItem {
  id: string;
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
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive';
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