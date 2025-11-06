import React from 'react';
import type { DashboardMetrics } from '../../types';

interface PredictionMetricsProps {
  metrics: DashboardMetrics;
}

const MetricCard: React.FC<{ title: string; value: string; subtitle?: string }> = ({
  title,
  value,
  subtitle
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">{title.charAt(0)}</span>
          </div>
        </div>
        <div className="ml-4">
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="text-2xl font-semibold text-gray-900">{value}</dd>
          {subtitle && <dd className="text-sm text-gray-500">{subtitle}</dd>}
        </div>
      </div>
    </div>
  </div>
);

const PredictionMetrics: React.FC<PredictionMetricsProps> = ({ metrics }) => {
  return (
    <>
      <MetricCard
        title="Total Products"
        value={metrics.total_products.toString()}
        subtitle="Active in catalog"
      />
      <MetricCard title="Total Revenue" value={`$${metrics.total_revenue.toLocaleString()}`} subtitle="All time sales" />
      <MetricCard
        title="Units Sold"
        value={metrics.total_sales.toLocaleString()}
        subtitle="Total quantity"
      />
      <MetricCard
        title="Avg Order Value"
        value={`$${metrics.avg_order_value.toFixed(2)}`}
        subtitle="Per transaction"
      />
    </>
  );
};

export default PredictionMetrics;