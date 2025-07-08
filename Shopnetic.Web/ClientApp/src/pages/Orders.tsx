import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, Search, Filter, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
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
          description: 'Premium wireless headphones with active noise cancellation.',
          features: ['Active Noise Cancellation', '30-hour battery'],
          inStock: true,
          quantity: 1
        }
      ],
      subtotal: 199.99,
      tax: 16.00,
      shipping: 0,
      total: 215.99,
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      items: [
        {
          id: '2',
          name: 'Smart Fitness Watch',
          price: 299.99,
          image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'electronics',
          brand: 'FitTech',
          rating: 4.7,
          reviewCount: 89,
          description: 'Advanced fitness tracking with heart rate monitoring.',
          features: ['Heart Rate Monitor', 'GPS Tracking'],
          inStock: true,
          quantity: 1
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
          description: 'Sustainable organic cotton t-shirt.',
          features: ['100% Organic Cotton', 'Sustainable Production'],
          inStock: true,
          quantity: 2
        }
      ],
      subtotal: 359.97,
      tax: 28.80,
      shipping: 9.99,
      total: 398.76,
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-25',
      status: 'processing',
      items: [
        {
          id: '4',
          name: 'Professional Camera',
          price: 1299.99,
          image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'electronics',
          brand: 'PhotoPro',
          rating: 4.8,
          reviewCount: 156,
          description: 'Professional DSLR camera with advanced features.',
          features: ['4K Video Recording', 'Advanced Autofocus'],
          inStock: true,
          quantity: 1
        }
      ],
      subtotal: 1299.99,
      tax: 104.00,
      shipping: 0,
      total: 1403.99,
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      }
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <Link
            to="/signin"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Shop
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search orders by ID or product name..."
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : "You haven't placed any orders yet"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        {selectedOrder?.id === order.id ? 'Hide' : 'View'} Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="px-6 py-4">
                  <div className="flex items-center gap-4 overflow-x-auto">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-sm text-gray-500 flex-shrink-0">
                        +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Order Details */}
                {selectedOrder?.id === order.id && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="px-6 py-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Order Items */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{item.name}</h5>
                                  <p className="text-sm text-gray-500">{item.brand}</p>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                  {item.originalPrice && (
                                    <p className="text-sm text-gray-500 line-through">
                                      ${(item.originalPrice * item.quantity).toFixed(2)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Summary & Shipping */}
                        <div className="space-y-6">
                          {/* Order Summary */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
                            <div className="bg-white rounded-lg p-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Tax</span>
                                <span>${order.tax.toFixed(2)}</span>
                              </div>
                              <div className="border-t border-gray-200 pt-2">
                                <div className="flex justify-between font-semibold">
                                  <span>Total</span>
                                  <span>${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Shipping Information */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Shipping Information</h4>
                            <div className="bg-white rounded-lg p-4">
                              <div className="space-y-2">
                                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                                <p className="text-gray-700">{order.shippingAddress.street}</p>
                                <p className="text-gray-700">
                                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                </p>
                                <p className="text-gray-700">{order.shippingAddress.country}</p>
                                {order.trackingNumber && (
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                                    <p className="text-sm text-blue-600 font-mono">{order.trackingNumber}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;