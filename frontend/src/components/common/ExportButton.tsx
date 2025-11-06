import React from 'react';
import { dashboardAPI } from '../../services/api';

function toCSV(rows: Array<Record<string, unknown>>): string {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(',')]
    .concat(
      rows.map((r) => headers.map((h) => JSON.stringify((r?.[h] as unknown) ?? '')).join(','))
    )
    .join('\n');
  return csv;
}

function download(filename: string, content: string, mime = 'text/csv') {
  const blob = new Blob([content], { type: mime + ';charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const ExportButton: React.FC = () => {
  const handleExport = async () => {
    const { data } = await dashboardAPI.getDashboardData();
    const d = data?.data || data; // support either shape
    const salesTrend = (d?.sales_trend || []) as Array<Record<string, unknown>>;
    const topProducts = (d?.top_products || []) as Array<Record<string, unknown>>;

    if (salesTrend.length) {
      download('sales_trend.csv', toCSV(salesTrend));
    }
    if (topProducts.length) {
      download('top_products.csv', toCSV(topProducts));
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 hover:bg-gray-50"
    >
      Export CSV
    </button>
  );
};

export default ExportButton;
