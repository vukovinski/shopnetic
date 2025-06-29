import React, { useState } from 'react';
import { Search, Edit, Package, Plus, Image as ImageIcon } from 'lucide-react';
import { Product } from '../../types';
import { mockProducts } from '../../data/mockData';

interface ProductsTableProps {
  onEditProduct: (product: Product) => void;
  onAddProduct: () => void;
}

const getStockStatusColor = (stock: number, threshold: number) => {
  if (stock === 0) return 'bg-red-100 text-red-800';
  if (stock <= threshold) return 'bg-yellow-100 text-yellow-800';
  return 'bg-emerald-100 text-emerald-800';
};

const getStockStatus = (stock: number, threshold: number) => {
  if (stock === 0) return 'Out of Stock';
  if (stock <= threshold) return 'Low Stock';
  return 'In Stock';
};

const ProductsTable: React.FC<ProductsTableProps> = ({ onEditProduct, onAddProduct }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleStockAdjustment = (productId: string, adjustment: number) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          stock: Math.max(0, product.stock + adjustment)
        };
      }
      return product;
    }));
  };

  const getPrimaryImage = (product: Product) => {
    if (!product.images || product.images.length === 0) return null;
    return product.images.find(img => img.isPrimary) || product.images[0];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button
              onClick={onAddProduct}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Product</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">SKU</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Category</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Price</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Stock</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => {
              const primaryImage = getPrimaryImage(product);
              
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {primaryImage ? (
                          <img
                            src={primaryImage.url}
                            alt={primaryImage.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={24} className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        {product.description && (
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {product.sku}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{product.stock}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleStockAdjustment(product.id, -1)}
                          className="w-6 h-6 text-red-600 hover:bg-red-50 rounded flex items-center justify-center text-xs font-bold"
                          disabled={product.stock <= 0}
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleStockAdjustment(product.id, 1)}
                          className="w-6 h-6 text-emerald-600 hover:bg-emerald-50 rounded flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStockStatusColor(product.stock, product.lowStockThreshold)}`}>
                      {getStockStatus(product.stock, product.lowStockThreshold)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;