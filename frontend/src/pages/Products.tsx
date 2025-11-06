import Section from '../components/layout/Section';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import type { ReactNode } from 'react';

type Product = {
  id: number | string;
  name: string;
  price: number;
  stock_quantity?: number;
  magento_id?: number | string;
};

function ProductsTable({ products }: { products: Product[] }): ReactNode {
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stock</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Magento ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map(product => (
              <tr key={product.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{product.id}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{product.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">${product.price}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{product.stock_quantity ?? '—'}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{product.magento_id ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then(res => res.data.data as Product[])
  });

  return (
    <div className="space-y-10">
      <Section
        title="Products"
        description="Browse and analyze your catalog performance."
        actions={(
          <div className="flex gap-2">
            <button className="rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Export</button>
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500">Add product</button>
          </div>
        )}
      >
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm text-sm text-gray-600">
          {isLoading && 'Loading product catalog…'}
          {!isLoading && products && products.length === 0 && 'No products found yet.'}
          {!isLoading && products && products.length > 0 && (
            <ProductsTable products={products} />
          )}
        </div>
      </Section>
    </div>
  );
}
