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
  // Defensive defaults in case metrics or fields are undefined
  const safe: Partial<DashboardMetrics> = metrics || {};
  const totalProducts = Number(safe.total_products ?? 0);
  const inventoryValue = Number(safe.total_inventory_value ?? 0);
  const activeProducts = Number(safe.active_products ?? 0);
  const approvedProducts = Number(safe.approved_products ?? 0);

  return (
    <>
      <MetricCard
        title="Total Products"
        value={totalProducts.toString()}
        subtitle="Active in catalog"
      />
      <MetricCard
        title="Inventory Value"
        value={`$${inventoryValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        subtitle="Total stock value"
      />
      <MetricCard
        title="Active Products"
        value={activeProducts.toLocaleString()}
        subtitle="Currently active"
      />
      <MetricCard
        title="Approved Products"
        value={approvedProducts.toLocaleString()}
        subtitle="Ready for sale"
      />
    </>
  );
};

export default PredictionMetrics;