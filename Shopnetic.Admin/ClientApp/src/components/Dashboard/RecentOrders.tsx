import React from 'react';
import { Order } from '../../server';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-emerald-100 text-emerald-800';
    case 'Shipped': return 'bg-blue-100 text-blue-800';
    case 'Verified': return 'bg-yellow-100 text-yellow-800';
    case 'Created': return 'bg-gray-100 text-gray-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const RecentOrders: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const recentOrders = orders;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Order</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.orderId} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">{order.orderId}</span>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    {/* <p className="text-sm text-gray-500">{order.email}</p> */}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;