import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { DashboardData } from '../../server';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  isPositive: boolean;
  icon: React.ReactNode;
  fixed: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon, fixed }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{fixed ? value.toFixed(2) : value}</p>
        <div className="flex items-center mt-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {change} %
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

const DashboardCards: React.FC<{ data: DashboardData | null }> = ({ data }) => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: data?.totalRevenue ?? 0,
      change: data?.revenuePercentChangeMoM ?? 0,
      isPositive: (data?.revenuePercentChangeMoM ?? 0) >= 0,
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      fixed: true
    },
    {
      title: 'Total Orders',
      value: data?.totalOrders ?? 0,
      change: data?.ordersPercentChangeMoM ?? 0,
      isPositive: (data?.ordersPercentChangeMoM ?? 0) >= 0,
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      fixed: false
    },
    {
      title: 'Products Sold',
      value: data?.totalProducts ?? 0,
      change: data?.productsPercentChangeMoM ?? 0,
      isPositive: (data?.productsPercentChangeMoM ?? 0) >= 0,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      fixed: false
    },
    {
      title: 'Active Customers',
      value: data?.totalCustomers ?? 0,
      change: data?.customersPercentChangeMoM ?? 0,
      isPositive: (data?.customersPercentChangeMoM ?? 0) >= 0,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      fixed: false
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default DashboardCards;