import React, { useState, useEffect } from 'react';
import { Edit, Eye, Search, Filter } from 'lucide-react';
import { Order } from '../../types';
import * as API from '../../server';

interface OrdersTableProps {
  onEditOrder: (order: Order) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Shipped': return 'bg-emerald-100 text-emerald-800';
    case 'Confirmed': return 'bg-blue-100 text-blue-800';
    case 'Verified': return 'bg-yellow-100 text-yellow-800';
    case 'Created': return 'bg-gray-100 text-gray-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const OrdersTable: React.FC<OrdersTableProps> = ({ onEditOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = String(order.orderNumber).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    API.server.orders.getOrders()
    .then(data => {
      if (data) {
        setOrders(data.map(order => ({
          id: order.orderId,
          orderNumber: order.orderId,
          customer: order.customerName,
          status: order.status,
          total: order.totalAmount,
          date: order.orderDate,
          items: order.items.map(item => ({
            id: item.orderItemId,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            sku: item.sku
          })),
          shippingAddress: order.customerName
        })));
      }
    })
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Orders Management</h2>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="Created">Created</option>
                <option value="Verified">Verified</option>
                <option value="Rejected">Rejected</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Order Number</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Customer</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Total</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Date</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <span className="font-medium text-gray-900">{order.orderNumber}</span>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    {/* <p className="text-sm text-gray-500">{order.email}</p> */}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditOrder(order)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Order"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;