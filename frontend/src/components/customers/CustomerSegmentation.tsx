import React from 'react';

const StatCard: React.FC<{ icon: string; title: string; value: string; tone: 'blue' | 'green' | 'orange' | 'purple'; note: string }>
  = ({ icon, title, value, tone, note }) => {
  const toneMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
  };
  return (
  <div className="text-center p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${toneMap[tone]}`}>
        <span className="text-xl" aria-hidden>{icon}</span>
      </div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className={`text-2xl font-bold ${toneMap[tone].split(' ')[1]}`}>{value}</p>
      <p className="text-sm text-gray-500">{note}</p>
    </div>
  );
};

const CustomerSegmentation: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="👑" title="VIP Customers" value="152" tone="blue" note="High Value" />
        <StatCard icon="🔄" title="Regulars" value="1,248" tone="green" note="Frequent Buyers" />
        <StatCard icon="🆕" title="New Customers" value="324" tone="orange" note="This Month" />
        <StatCard icon="💤" title="At Risk" value="89" tone="purple" note="Need Engagement" />
      </div>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-medium">AI Insight:</span> VIP customers show 45% higher lifetime value. Consider
          exclusive offers to maintain loyalty.
        </p>
      </div>
    </div>
  );
};

export default CustomerSegmentation;
