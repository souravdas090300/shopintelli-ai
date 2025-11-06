import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../services/api';
import SalesChart from './charts/SalesChart';
import PredictionMetrics from './metrics/PredictionMetrics';
import ProductRecommendations from './recommendations/ProductRecommendations';
import SalesPredictions from './ai/SalesPredictions';
import CustomerSegmentation from './customers/CustomerSegmentation';
import TopProductsTable from './products/TopProductsTable';
import SyncButton from './common/SyncButton';
import DateRangePicker, { type DateRange } from './common/DateRangePicker';
import ExportButton from './common/ExportButton';
import ProductPerformanceChart from './charts/ProductPerformanceChart';

const Dashboard: React.FC = () => {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  const { data: dashboardData, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard', range?.from, range?.to],
    queryFn: () => dashboardAPI.getDashboardData().then(res => res.data.data),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Failed to load dashboard data
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
  <div className="bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">        
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">ShopIntelli AI Dashboard</h1>
              <p className="text-gray-600 mt-1">Insights, trends, and recommendations for your store</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <DateRangePicker value={range} onApply={setRange} />
              <ExportButton />
              <SyncButton onSyncComplete={refetch} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PredictionMetrics metrics={dashboardData.metrics} />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <SalesChart data={dashboardData.sales_trend} />
            <CustomerSegmentation />
          </div>
          <div className="space-y-6">
            <SalesPredictions />
            <ProductRecommendations recommendations={dashboardData.top_products} />
            <TopProductsTable products={dashboardData.top_products} />
          </div>
        </div>

        {/* Additional chart inspired by analytics suites */}
        <div className="mt-6">
          <ProductPerformanceChart products={dashboardData.top_products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;