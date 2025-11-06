import React from 'react';

type Card = {
  title: string;
  subtitle: string;
  value: string;
  note?: string;
  tone?: 'blue' | 'orange' | 'green';
};

const toneMap: Record<NonNullable<Card['tone']>, string> = {
  blue: 'bg-blue-50 text-blue-800',
  orange: 'bg-orange-50 text-orange-800',
  green: 'bg-green-50 text-green-800',
};

const SalesPredictions: React.FC = () => {
  const cards: Card[] = [
    {
      title: 'Next 7 Days',
      subtitle: 'Expected revenue',
      value: '$28,450',
      note: '↗ 15% increase',
      tone: 'blue',
    },
    {
      title: 'Inventory Alert',
      subtitle: 'Wireless Headphones',
      value: 'Low Stock',
      note: 'Reorder suggested',
      tone: 'orange',
    },
    {
      title: 'Top Opportunity',
      subtitle: 'Gaming Laptops',
      value: 'High Demand',
      note: '87% confidence',
      tone: 'green',
    },
  ];

  return (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">AI Sales Predictions</h3>
        <span className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full border border-purple-100">🤖 AI</span>
      </div>

      <div className="space-y-4">
        {cards.map((c) => (
          <div key={c.title} className={`flex justify-between items-center p-4 rounded-lg ${c.tone ? toneMap[c.tone] : ''}`}>            
            <div>
              <p className="font-medium text-gray-900">{c.title}</p>
              <p className="text-sm text-gray-600">{c.subtitle}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{c.value}</p>
              {c.note && <p className="text-sm">{c.note}</p>}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
        View Details
      </button>
    </div>
  );
};

export default SalesPredictions;
