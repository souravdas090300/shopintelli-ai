import { useQuery } from '@tanstack/react-query';
import { ArrowTrendingUpIcon, ShoppingCartIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/dashboard/data').then(res => res.data.data)
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const metrics = dashboardData?.metrics || {};
  const salesTrend = dashboardData?.sales_trend || [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Total Products"
          value={metrics.total_products || 0}
          icon={ShoppingCartIcon}
          bgColor="bg-blue-500"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${(metrics.total_revenue || 0).toLocaleString()}`}
          icon={CurrencyDollarIcon}
          bgColor="bg-green-500"
        />
        <MetricCard
          title="Total Sales"
          value={metrics.total_sales || 0}
          icon={ArrowTrendingUpIcon}
          bgColor="bg-purple-500"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${(metrics.avg_order_value || 0).toFixed(2)}`}
          icon={CurrencyDollarIcon}
          bgColor="bg-yellow-500"
        />
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Trend (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_revenue" stroke="#8884d8" name="Revenue" />
            <Line type="monotone" dataKey="total_sales" stroke="#82ca9d" name="Sales" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
};

function MetricCard({ title, value, icon: Icon, bgColor }: MetricCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`shrink-0 ${bgColor} rounded-md p-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
