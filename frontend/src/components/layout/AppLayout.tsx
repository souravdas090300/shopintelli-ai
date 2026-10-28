import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

import type { ReactElement } from 'react';

interface NavItem {
  label: string;
  to: string;
  icon?: (props: { className?: string }) => ReactElement | null;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Products', to: '/products' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Design System', to: '/design-system' },
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <aside className={`transition-all duration-300 border-r bg-white/90 backdrop-blur-sm shadow-sm ${collapsed ? 'w-16' : 'w-60'}`}>
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <Link to="/dashboard" className="font-semibold text-indigo-600 tracking-tight text-sm">
            {collapsed ? 'SI' : 'ShopIntelli'}
          </Link>
          <button
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="text-gray-500 hover:text-indigo-600"
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>
        <nav className="py-3">
          <ul className="space-y-1 px-2">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                  end
                >
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-3 text-xs text-gray-400">
          {user ? (
            <button
              onClick={logout}
              className="w-full rounded-md border border-gray-200 px-3 py-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            >
              Sign out
            </button>
          ) : (
            <div className="space-y-2">
              <Link to="/login" className="block rounded border border-indigo-200 px-3 py-2 text-indigo-600 hover:bg-indigo-50 text-center">Sign in</Link>
              <Link to="/signup" className="block rounded bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500 text-center">Create account</Link>
            </div>
          )}
          <p className="mt-4 text-center">v0.2.0</p>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="glass sticky top-0 z-40 border-b border-white/20">
          <div className="px-6 py-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="search"
                placeholder="Search products, customers..."
                className="glass-light pl-10 pr-4 py-2 rounded-2xl w-full max-w-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-contrast"
              />
              <i className="fas fa-search absolute left-3 top-3 text-contrast-muted" aria-hidden="true"></i>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 glass rounded-xl flex items-center justify-center hover-lift" aria-label="Notifications">
                  <i className="fas fa-bell text-purple-500"></i>
                </button>
                <div className="flex items-center space-x-3 glass-light px-4 py-2 rounded-2xl">
                  <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full" aria-hidden="true"></div>
                  <span className="text-sm font-medium text-contrast hidden sm:inline">{user.email}</span>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="p-6 space-y-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
