import React from 'react';
import { Link } from 'react-router-dom';

// Header Component - Updated to match HTML template exactly
interface HeaderProps {
  variant?: 'landing' | 'dashboard';
}

const Header: React.FC<HeaderProps> = ({ variant = 'landing' }) => {
  const createRipple = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.3);
      transform: scale(0);
      animation: ripple 600ms linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <header className="glass sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center floating" aria-hidden="true">
              <i className="fas fa-brain text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">ShopIntelli</h1>
              <p className="text-sm text-contrast-secondary">AI-Powered E-commerce Analytics</p>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {variant === 'landing' ? (
              <>
                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6">
                  <Link to="/" className="text-contrast hover:text-purple-600 transition-colors font-medium">Dashboard</Link>
                  <Link to="/products" className="text-contrast hover:text-purple-600 transition-colors font-medium">Products</Link>
                  <Link to="/analytics" className="text-contrast hover:text-purple-600 transition-colors font-medium">Analytics</Link>
                  <Link to="/demo" className="text-contrast hover:text-purple-600 transition-colors font-medium">Reports</Link>
                </nav>

                {/* Login Button */}
                <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl hover-lift font-medium transition-all duration-300 hover:shadow-lg">
                  Log In
                </Link>
              </>
            ) : null}

            {/* Search Bar */}
            <div className="relative">
              <label htmlFor="search" className="sr-only">Search</label>
              <input 
                type="text" 
                id="search" 
                placeholder="AI Search..." 
                className="glass-light pl-10 pr-4 py-2 rounded-2xl w-80 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-contrast"
                aria-label="Search through analytics data"
              />
              <i className="fas fa-search absolute left-3 top-3 text-contrast-muted" aria-hidden="true"></i>
            </div>

            {/* Notifications */}
            <div className="relative group">
              <button 
                className="w-10 h-10 glass rounded-xl flex items-center justify-center hover-lift" 
                aria-label="Notifications"
                onClick={createRipple}
              >
                <i className="fas fa-bell text-purple-500"></i>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full pulse-glow" aria-hidden="true"></span>
              </button>
              <div className="absolute right-0 top-12 w-80 glass-light rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <h3 className="font-semibold mb-3 text-contrast">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-purple-100 rounded-lg border border-purple-200">
                    <p className="text-sm text-contrast">🚀 AI detected sales pattern</p>
                    <p className="text-xs text-contrast-secondary">2 min ago</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg border border-green-200">
                    <p className="text-sm text-contrast">📈 Revenue target achieved</p>
                    <p className="text-xs text-contrast-secondary">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            {variant === 'landing' ? (
              <>
                {/* User Profile */}
                <div className="flex items-center space-x-3 glass-light px-4 py-2 rounded-2xl hover-lift cursor-pointer" role="button" aria-haspopup="true" aria-expanded="false" aria-label="User menu">
                  <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full" aria-hidden="true"></div>
                  <span className="font-medium text-contrast">AI Analyst</span>
                  <i className="fas fa-chevron-down text-sm text-contrast-muted" aria-hidden="true"></i>
                </div>

                {/* Theme Toggle */}
                <button 
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center hover-lift" 
                  aria-label="Toggle theme"
                >
                  <i className="fas fa-moon text-purple-600"></i>
                </button>
              </>
            ) : (
              <>
                {/* User Profile */}
                <div 
                  className="flex items-center space-x-3 glass-light px-4 py-2 rounded-2xl hover-lift cursor-pointer" 
                  role="button" 
                  aria-haspopup="true" 
                  aria-expanded="false"
                  aria-label="User menu"
                  onClick={createRipple}
                >
                  <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full" aria-hidden="true"></div>
                  <span className="font-medium text-contrast">AI Analyst</span>
                  <i className="fas fa-chevron-down text-sm text-contrast-muted" aria-hidden="true"></i>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
