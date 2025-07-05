import React, { useState, useEffect } from 'react';
import { Search, Package, MapPin, RouteOff } from 'lucide-react';
import { Shipment } from '../../types';
import { mockShipments } from '../../data/mockData';
import * as API from '../../server';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return 'bg-emerald-100 text-emerald-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    case 'Shipped': return 'bg-yellow-100 text-yellow-800';
    case 'Preparing': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Delivered': return <MapPin size={16} className="text-emerald-600" />;
    case 'Cancelled': return <RouteOff size={16} className="text-red-600" />;
    case 'Shipped': return <Package size={16} className="text-yellow-600" />;
    case 'Preparing': return <Package size={16} className="text-gray-600" />;
    default: return <Package size={16} className="text-gray-600" />;
  }
};

const ShipmentsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const filteredShipments = shipments.filter(shipment =>
    String(shipment.orderNumber).toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    API.server.shipments.getShipments()
      .then(response => {
        if (response) {
          setShipments(response.map(shipment => ({
            id: shipment.shipmentId,
            orderNumber: shipment.orderId,
            trackingNumber: shipment.trackingNumber,
            carrier: 'Postal Service',
            status: shipment.status,
            customer: shipment.customer,
            destination: shipment.destination,
            estimatedDelivery: shipment.deliveryDate
          })));
        }
      })
  },[]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Shipments Tracking</h2>
          
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search shipments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Order</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Tracking Number</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Carrier</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Customer</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Destination</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Est. Delivery</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <span className="font-medium text-gray-900">{shipment.orderNumber}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {shipment.trackingNumber}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-700">
                  {shipment.carrier}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(shipment.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-700">
                  {shipment.customer}
                </td>
                <td className="py-4 px-6 text-gray-700">
                  {shipment.destination}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredShipments.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No shipments found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ShipmentsTable;