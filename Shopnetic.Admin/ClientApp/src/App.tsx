import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardCards from './components/Dashboard/DashboardCards';
import RecentOrders from './components/Dashboard/RecentOrders';
import OrdersTable from './components/Orders/OrdersTable';
import OrderEditModal from './components/Orders/OrderEditModal';
import ShipmentsTable from './components/Shipments/ShipmentsTable';
import ProductsTable from './components/Products/ProductsTable';
import ProductModal from './components/Products/ProductModal';
import { Order, Product } from './types';
import * as API from './server';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<API.Order[]>([]);
  const [dashboardData, setDashboardData] = useState<API.DashboardData | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    API.server.dashboard.getDashboardData()
    .then(response => {
      if (response) {
        setRecentOrders(response.recentOrders);
        setDashboardData(response);
      }
    })
  }, []); 

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleSaveOrder = async (updatedOrder: Order) => {
    await API.server.orders.editOrder({
      orderId: updatedOrder.id,
      status: updatedOrder.status,
      customerName: updatedOrder.customer,
      orderDate: updatedOrder.date,
      totalAmount: updatedOrder.total,
      items: updatedOrder.items.map(item => ({
        orderItemId: item.id,
        productName: item.productName,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        sku: item.sku
      }))
    });
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

  const handleSaveProduct = async (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      await API.server.products.editProduct({
        id: productData.id,
        name: productData.name,
        description: productData.description ?? '',
        category: {
          categoryId: productData.categoryId,
          categoryName: productData.category
        },
        currentPrice: {
          price: productData.price
        },
        inventory: {
          quantity: productData.stock,
          lowStockThreshold: productData.lowStockThreshold
        },
        status: productData.status,
        sku: productData.sku,
        images: productData.images?.map((pi) => ({ imageId: pi.id, primary: pi.isPrimary, imageUrl: pi.url, order: pi.order, contents: pi.contents })) ?? []
      })
    } else {
      await API.server.products.addProduct({
        id: -1,
        name: productData.name,
        description: productData.description ?? '',
        category: {
          categoryId: productData.categoryId,
          categoryName: productData.category
        },
        currentPrice: {
          price: productData.price
        },
        inventory: {
          quantity: productData.stock,
          lowStockThreshold: productData.lowStockThreshold
        },
        status: productData.status,
        sku: productData.sku,
        images: []
      }, productData.images?.map(pi => ({ imageFile: pi.contents, primary: pi.isPrimary, order: pi.order })) ?? [])
    }
    setSelectedProduct(null);
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
            <DashboardCards data={dashboardData}/>
            <RecentOrders orders={recentOrders} />
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