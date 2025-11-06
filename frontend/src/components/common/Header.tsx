import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = () => { logout(); navigate('/login'); };

  const version = (import.meta as unknown as { env?: Record<string, string> })?.env?.VITE_APP_VERSION || new Date().toISOString().slice(0,10);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">SI</div>
            <span className="text-lg font-semibold text-gray-900">ShopIntelli</span>
          </Link>
          <span className="hidden sm:inline text-xs text-gray-500">v{version}</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <input
            type="search"
            placeholder="Search products, orders, customers..."
            className="w-80 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200">Dashboard</Link>
              <button onClick={onLogout} className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100">Sign out</button>
            </>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <Link to="/login" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Sign in</Link>
              )}
              {location.pathname !== '/signup' && (
                <Link to="/signup" className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200">Create account</Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
