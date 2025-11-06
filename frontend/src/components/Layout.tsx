import { Outlet, Link } from 'react-router-dom';
import { HomeIcon, ShoppingBagIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">ShopIntelli AI</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-gray-300"
                >
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Products
                </Link>
                <Link
                  to="/analytics"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
