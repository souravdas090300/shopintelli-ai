import React from 'react';
import type { ProductRecommendation } from '../../types';

const TopProductsTable: React.FC<{ products: ProductRecommendation[] }> = ({ products }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-500">Product</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Revenue</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Units Sold</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.slice(0, 5).map((p) => (
              <tr key={p.product_id}>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-sm text-gray-500">#{p.product_id}</p>
                    </div>
                  </div>
                </td>
                <td className="text-right py-4">
                  <p className="font-medium text-gray-900">${(p.revenue || 0).toLocaleString()}</p>
                </td>
                <td className="text-right py-4">
                  <p className="text-gray-900">—</p>
                </td>
                <td className="text-right py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {p.reason || 'Trending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProductsTable;
