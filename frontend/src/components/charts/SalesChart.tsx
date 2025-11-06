import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
type SalesTrend = {
  date: string;
  total_sales: number;
  total_revenue: number;
};

interface SalesChartProps {
  data: SalesTrend[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                labelFormatter={formatDate}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total_revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Revenue"
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Units Sold</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [value, 'Units Sold']}
                labelFormatter={formatDate}
              />
              <Legend />
              <Bar 
                dataKey="total_sales" 
                fill="#10b981" 
                name="Units Sold"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;