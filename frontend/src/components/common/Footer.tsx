import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto glass border-t border-white/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
              <h3 className="text-xl font-bold gradient-text">ShopIntelli</h3>
            </div>
            <p className="text-sm text-contrast-secondary">
              Experience the future of online shopping with AI-powered recommendations and intelligent assistance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-contrast mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-contrast-secondary hover:text-purple-600 transition-colors">Shop</Link></li>
              <li><Link to="/assistant" className="text-contrast-secondary hover:text-purple-600 transition-colors">AI Assistant</Link></li>
              <li><Link to="/orders" className="text-contrast-secondary hover:text-purple-600 transition-colors">Orders</Link></li>
              <li><Link to="/dashboard" className="text-contrast-secondary hover:text-purple-600 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-contrast mb-3">Contact</h4>
            <p className="text-sm text-contrast-secondary mb-4">
              Get help from our AI assistant 24/7 or reach out to our support team.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 glass-light rounded-xl flex items-center justify-center hover-lift">
                <i className="fab fa-twitter text-purple-500"></i>
              </a>
              <a href="#" className="w-10 h-10 glass-light rounded-xl flex items-center justify-center hover-lift">
                <i className="fab fa-github text-purple-500"></i>
              </a>
              <a href="#" className="w-10 h-10 glass-light rounded-xl flex items-center justify-center hover-lift">
                <i className="fab fa-linkedin text-purple-500"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-contrast-secondary">
          <p>© {new Date().getFullYear()} ShopIntelli. Powered by AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
