import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
type Recommendation = {
  name?: string;
  product_id?: number | string;
  reason?: string;
  revenue?: number;
};

export default function Analytics() {
  const { data: predictions, isLoading } = useQuery({
    queryKey: ['predictions'],
    queryFn: () => api.get('/ai/recommendations/products').then(res => res.data.data)
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Analytics</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Recommendations</h3>
        <div className="space-y-4">
          {predictions && Array.isArray(predictions) && predictions.map((item: Recommendation, index: number) => (
            <div key={index} className="border-l-4 border-indigo-500 pl-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name || item.product_id}</p>
                  <p className="text-sm text-gray-500">{item.reason || 'Recommended'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${(item.revenue || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
        <p className="text-sm text-gray-600">
          Connect to the AI service at http://localhost:8001 to get advanced predictions and insights.
        </p>
      </div>
    </div>
  );
}
