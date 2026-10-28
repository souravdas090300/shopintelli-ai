import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold gradient-text">ShopIntelli</h1>
              <p className="text-sm text-contrast-secondary">AI-Powered E-commerce Analytics</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/products" className="text-contrast hover:text-purple-600 transition-all font-medium">
                Shop
              </Link>
              <Link to="/assistant" className="text-contrast hover:text-purple-600 transition-all font-medium">
                AI Assistant
              </Link>
              <Link to="/orders" className="text-contrast hover:text-purple-600 transition-all font-medium">
                Orders
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <input 
                type="text" 
                placeholder="AI Search..." 
                className="glass-light pl-10 pr-4 py-2 rounded-2xl w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-contrast"
              />
              <i className="fas fa-search absolute left-3 top-3 text-contrast-muted" aria-hidden="true"></i>
            </div>

            {user ? (
              <>
                {/* Notifications */}
                <div className="relative group">
                  <button className="w-10 h-10 glass rounded-xl flex items-center justify-center hover-lift" aria-label="Notifications">
                    <i className="fas fa-bell text-purple-500"></i>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full pulse-glow" aria-hidden="true"></span>
                  </button>
                </div>

                {/* User Profile */}
                <Link to="/dashboard" className="flex items-center space-x-3 glass-light px-4 py-2 rounded-2xl hover-lift cursor-pointer">
                  <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full" aria-hidden="true"></div>
                  <span className="font-medium text-contrast hidden sm:inline">AI Analyst</span>
                </Link>

                {/* Sign Out */}
                <button
                  onClick={onLogout}
                  className="hidden md:inline-flex items-center px-4 py-2 glass-light rounded-2xl text-contrast hover-lift transition-all"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 glass-light rounded-2xl text-contrast hover-lift transition-all"
                  >
                    Sign in
                  </Link>
                )}
                {location.pathname !== '/signup' && (
                  <Link
                    to="/signup"
                    className="hidden sm:inline-flex items-center px-4 py-2 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl text-white hover-lift transition-all shadow-lg"
                  >
                    Create account
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
