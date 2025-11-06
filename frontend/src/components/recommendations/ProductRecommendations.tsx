import React from 'react';
import type { Product } from '../../types';

interface ProductRecommendationsProps {
  recommendations: Product[];
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Recommendations</h2>
      <div className="space-y-4">
        {recommendations.map((product, index) => (
          <div key={product.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div className="shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-bold">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-sm text-gray-500">
                ${product.price} • Stock: {product.stock_quantity}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              ${/* Revenue would be calculated from sales data */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;