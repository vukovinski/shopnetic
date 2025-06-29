import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {change}
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

const DashboardCards: React.FC = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$47,389',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Total Orders',
      value: '1,237',
      change: '+8.2%',
      isPositive: true,
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Products Sold',
      value: '3,842',
      change: '+15.3%',
      isPositive: true,
      icon: <Package className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Active Customers',
      value: '892',
      change: '-2.1%',
      isPositive: false,
      icon: <Users className="w-6 h-6 text-blue-600" />
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