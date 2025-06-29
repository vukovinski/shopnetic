import { Order, Shipment, Product, InventoryItem, ProductImage } from '../types';

const sampleImages: ProductImage[] = [
  {
    id: 'img1',
    url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Wireless Headphones',
    isPrimary: true,
    order: 0
  },
  {
    id: 'img2',
    url: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Wireless Headphones Side View',
    isPrimary: false,
    order: 1
  }
];

const speakerImages: ProductImage[] = [
  {
    id: 'img3',
    url: 'https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Bluetooth Speaker',
    isPrimary: true,
    order: 0
  }
];

const phoneCaseImages: ProductImage[] = [
  {
    id: 'img4',
    url: 'https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Phone Case',
    isPrimary: true,
    order: 0
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Smith',
    email: 'john.smith@email.com',
    total: 299.99,
    status: 'processing',
    date: '2024-01-15',
    shippingAddress: '123 Main St, New York, NY 10001',
    items: [
      { id: '1', productName: 'Wireless Headphones', quantity: 1, price: 199.99, sku: 'WH-001' },
      { id: '2', productName: 'Phone Case', quantity: 2, price: 50.00, sku: 'PC-001' }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    total: 149.99,
    status: 'shipped',
    date: '2024-01-14',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
    items: [
      { id: '3', productName: 'Bluetooth Speaker', quantity: 1, price: 149.99, sku: 'BS-001' }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Davis',
    email: 'mike.davis@email.com',
    total: 89.99,
    status: 'delivered',
    date: '2024-01-13',
    shippingAddress: '789 Pine St, Chicago, IL 60601',
    items: [
      { id: '4', productName: 'Charging Cable', quantity: 3, price: 29.99, sku: 'CC-001' }
    ]
  }
];

export const mockShipments: Shipment[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-002',
    trackingNumber: 'TRK123456789',
    carrier: 'FedEx',
    status: 'in-transit',
    estimatedDelivery: '2024-01-18',
    customer: 'Sarah Johnson',
    destination: 'Los Angeles, CA'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001',
    trackingNumber: 'TRK987654321',
    carrier: 'UPS',
    status: 'preparing',
    estimatedDelivery: '2024-01-19',
    customer: 'John Smith',
    destination: 'New York, NY'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-001',
    price: 199.99,
    category: 'Electronics',
    stock: 45,
    lowStockThreshold: 10,
    status: 'active',
    description: 'Premium wireless headphones with noise cancellation',
    images: sampleImages
  },
  {
    id: '2',
    name: 'Bluetooth Speaker',
    sku: 'BS-001',
    price: 149.99,
    category: 'Electronics',
    stock: 8,
    lowStockThreshold: 10,
    status: 'active',
    description: 'Portable Bluetooth speaker with rich sound',
    images: speakerImages
  },
  {
    id: '3',
    name: 'Phone Case',
    sku: 'PC-001',
    price: 25.00,
    category: 'Accessories',
    stock: 120,
    lowStockThreshold: 20,
    status: 'active',
    description: 'Protective phone case for various models',
    images: phoneCaseImages
  },
  {
    id: '4',
    name: 'Charging Cable',
    sku: 'CC-001',
    price: 29.99,
    category: 'Accessories',
    stock: 0,
    lowStockThreshold: 15,
    status: 'active',
    description: 'High-speed charging cable'
  }
];

export const mockInventory: InventoryItem[] = mockProducts.map(product => ({
  id: product.id,
  productId: product.id,
  productName: product.name,
  sku: product.sku,
  currentStock: product.stock,
  reservedStock: Math.floor(product.stock * 0.1),
  availableStock: product.stock - Math.floor(product.stock * 0.1),
  lowStockThreshold: product.lowStockThreshold,
  status: product.stock === 0 ? 'out-of-stock' : 
          product.stock <= product.lowStockThreshold ? 'low-stock' : 'in-stock',
  lastUpdated: '2024-01-15'
}));