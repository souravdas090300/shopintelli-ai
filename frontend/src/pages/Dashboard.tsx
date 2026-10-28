import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  ShoppingCartIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Type definitions
interface SalesTrendItem {
  date: string;
  total_sales: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconType = any; // Heroicons don't export a specific type

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/dashboard/data').then(res => res.data.data)
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const metrics = dashboardData?.metrics || {};
  const salesTrend = dashboardData?.sales_trend || [];

  // Prepare chart data
  const chartData = {
    labels: salesTrend.slice(0, 7).map((item: SalesTrendItem) => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Sales',
        data: salesTrend.slice(0, 7).map((item: SalesTrendItem) => item.total_sales),
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#dc2626',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderColor: 'rgba(220, 38, 38, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          callback: function(value: number | string) {
            return '$' + Number(value).toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
          AI Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Real-time insights and AI-powered predictions for your e-commerce performance
        </p>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <EnhancedMetricCard
          title="Sales Prediction Accuracy"
          value="94.2%"
          trend="+2.1%"
          trendUp={true}
          icon={ChartBarIcon}
          description="AI model accuracy for next 30 days"
          gradientClass="from-red-600 to-red-800"
        />
        <EnhancedMetricCard
          title="Total Products"
          value={metrics.total_products || 0}
          trend="+8.7%"
          trendUp={true}
          icon={ShoppingCartIcon}
          description="Active products in inventory"
          gradientClass="from-pink-600 to-pink-800"
        />
        <EnhancedMetricCard
          title="Inventory Value"
          value={`$${Number(metrics.total_inventory_value || 0).toLocaleString()}`}
          trend="+12.4%"
          trendUp={true}
          icon={CurrencyDollarIcon}
          description="Total inventory worth"
          gradientClass="from-green-600 to-green-800"
        />
        <EnhancedMetricCard
          title="Low Stock Items"
          value={metrics.low_stock_products || 0}
          trend="-1.2%"
          trendUp={false}
          icon={UserGroupIcon}
          description="Items requiring restock"
          gradientClass="from-orange-600 to-orange-800"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Sales Performance</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  1W
                </button>
                <button className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white">
                  1M
                </button>
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  1Y
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-72">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold">
                <ChartBarIcon className="w-3 h-3" />
                AI Powered
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <AIRecommendationCard
              type="Pricing"
              confidence="94%"
              title="Optimize Product Pricing"
              description="Adjust pricing for 15 products based on competitor analysis"
              impact="Potential 12% revenue increase"
              impactPositive={true}
            />
            <AIRecommendationCard
              type="Inventory"
              confidence="87%"
              title="Restock High-Demand Items"
              description="Increase inventory for summer collection"
              impact="Prevent $8.2K in lost sales"
              impactPositive={true}
            />
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Stock Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-600">In Stock</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 mt-1 block">
                {metrics.in_stock_products || 0}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium text-gray-600">Low Stock</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 mt-1 block">
                {metrics.low_stock_products || 0}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-gray-600">Out of Stock</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 mt-1 block">
                {metrics.out_of_stock_products || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Metric Card Component
function EnhancedMetricCard({ 
  title, 
  value, 
  trend, 
  trendUp, 
  icon: Icon, 
  description, 
  gradientClass 
}: { 
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  icon: IconType;
  description: string;
  gradientClass: string;
}): React.ReactElement {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Gradient top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${gradientClass}`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {title}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${gradientClass} flex items-center justify-center text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
          trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {trendUp ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}

// AI Recommendation Card Component
function AIRecommendationCard({
  type,
  confidence,
  title,
  description,
  impact,
  impactPositive
}: {
  type: string;
  confidence: string;
  title: string;
  description: string;
  impact: string;
  impactPositive: boolean;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
          {type}
        </span>
        <div className="text-xs text-gray-500">
          {confidence} confidence
        </div>
      </div>
      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
        {title}
      </h4>
      <p className="text-sm text-gray-600 mb-3">
        {description}
      </p>
      <div className="flex items-center gap-2 text-sm mb-3">
        <ChartBarIcon className={`w-4 h-4 ${impactPositive ? 'text-green-500' : 'text-red-500'}`} />
        <span className="font-medium text-gray-700">{impact}</span>
      </div>
      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
          Implement
        </button>
        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}

// Metric Card (keep for backwards compatibility) - removed duplicate code
