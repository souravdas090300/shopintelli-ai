import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { ProductRecommendation } from '../../types';

type Props = {
  products: ProductRecommendation[];
};

const ProductPerformanceChart: React.FC<Props> = ({ products }) => {
  const data = products.slice(0, 8).map((p) => ({ name: p.name, revenue: p.revenue }));
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products by Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
          <Bar dataKey="revenue" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductPerformanceChart;
