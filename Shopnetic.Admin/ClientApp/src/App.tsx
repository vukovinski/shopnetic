import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardCards from './components/Dashboard/DashboardCards';
import RecentOrders from './components/Dashboard/RecentOrders';
import OrdersTable from './components/Orders/OrdersTable';
import OrderEditModal from './components/Orders/OrderEditModal';
import ShipmentsTable from './components/Shipments/ShipmentsTable';
import InventoryTable from './components/Inventory/InventoryTable';
import ProductsTable from './components/Products/ProductsTable';
import ProductModal from './components/Products/ProductModal';
import { Order, Product, InventoryItem } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleSaveOrder = (updatedOrder: Order) => {
    // In a real app, this would make an API call
    console.log('Saving order:', updatedOrder);
    setSelectedOrder(null);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    // In a real app, this would make an API call
    if ('id' in productData) {
      console.log('Updating product:', productData);
    } else {
      const newProduct = {
        ...productData,
        id: Date.now().toString()
      };
      console.log('Adding product:', newProduct);
    }
    setSelectedProduct(null);
  };

  const handleAdjustInventory = (item: InventoryItem, adjustment: number) => {
    // In a real app, this would make an API call
    console.log(`Adjusting inventory for ${item.productName} by ${adjustment}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome to your ecommerce admin dashboard</p>
            </div>
            <DashboardCards />
            <RecentOrders />
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders Management</h1>
              <p className="text-gray-600">Manage and track all customer orders</p>
            </div>
            <OrdersTable onEditOrder={handleEditOrder} />
          </div>
        );
      case 'shipments':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Shipments Tracking</h1>
              <p className="text-gray-600">Monitor shipment status and delivery progress</p>
            </div>
            <ShipmentsTable />
          </div>
        );
      case 'inventory':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h1>
              <p className="text-gray-600">Track stock levels and manage inventory</p>
            </div>
            <InventoryTable onAdjustInventory={handleAdjustInventory} />
          </div>
        );
      case 'products':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Products Catalog</h1>
              <p className="text-gray-600">Manage your product catalog and inventory</p>
            </div>
            <ProductsTable 
              onEditProduct={handleEditProduct}
              onAddProduct={handleAddProduct}
            />
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Select a section from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Order Edit Modal */}
      {selectedOrder && (
        <OrderEditModal
          order={selectedOrder}
          isOpen={isOrderModalOpen}
          onClose={() => {
            setIsOrderModalOpen(false);
            setSelectedOrder(null);
          }}
          onSave={handleSaveOrder}
        />
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
}

export default App;