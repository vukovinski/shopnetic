import React, { useState } from 'react';
import { Search, AlertTriangle, Package, Plus, Minus } from 'lucide-react';
import { InventoryItem } from '../../types';
import { mockInventory } from '../../data/mockData';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-stock': return 'bg-emerald-100 text-emerald-800';
    case 'low-stock': return 'bg-yellow-100 text-yellow-800';
    case 'out-of-stock': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface InventoryTableProps {
  onAdjustInventory: (item: InventoryItem, adjustment: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ onAdjustInventory }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdjustment = (item: InventoryItem, adjustment: number) => {
    const updatedInventory = inventory.map(inv => {
      if (inv.id === item.id) {
        const newStock = Math.max(0, inv.currentStock + adjustment);
        const newStatus = newStock === 0 ? 'out-of-stock' : 
                         newStock <= inv.lowStockThreshold ? 'low-stock' : 'in-stock';
        return {
          ...inv,
          currentStock: newStock,
          availableStock: newStock - inv.reservedStock,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return inv;
    });
    setInventory(updatedInventory);
    onAdjustInventory(item, adjustment);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Inventory Management</h2>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Product</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">SKU</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Current Stock</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Reserved</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Available</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Last Updated</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package size={20} className="text-gray-500" />
                    </div>
                    <span className="font-medium text-gray-900">{item.productName}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {item.sku}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium text-gray-900">
                  {item.currentStock}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {item.reservedStock}
                </td>
                <td className="py-4 px-6 text-gray-900">
                  {item.availableStock}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {item.status === 'low-stock' && <AlertTriangle size={16} className="text-yellow-500" />}
                    {item.status === 'out-of-stock' && <AlertTriangle size={16} className="text-red-500" />}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {new Date(item.lastUpdated).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAdjustment(item, -1)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Decrease stock"
                      disabled={item.currentStock <= 0}
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => handleAdjustment(item, 1)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Increase stock"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No inventory items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;