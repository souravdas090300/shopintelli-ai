import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass mt-16 border-t border-gray-200/50 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-brain text-white text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">ShopIntelli</h3>
              </div>
            </div>
            <p className="text-sm text-contrast-secondary mb-6 leading-relaxed">
              AI-Powered E-commerce Analytics platform for smart business decisions and growth.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: 'fa-facebook', label: 'Facebook', color: 'blue' },
                { icon: 'fa-twitter', label: 'Twitter', color: 'sky' },
                { icon: 'fa-linkedin', label: 'LinkedIn', color: 'blue' },
                { icon: 'fa-github', label: 'GitHub', color: 'purple' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-10 h-10 glass-light rounded-xl flex items-center justify-center hover-lift group transition-all`}
                  aria-label={social.label}
                >
                  <i className={`fab ${social.icon} text-${social.color}-600 group-hover:scale-110 transition-transform`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-contrast mb-4 flex items-center">
              <i className="fas fa-box text-purple-600 mr-2 text-sm"></i>
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/features', label: 'Features' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/analytics', label: 'Analytics' },
                { to: '/ai-insights', label: 'AI Insights' },
                { to: '/integrations', label: 'Integrations' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-contrast-secondary hover:text-purple-600 transition-colors inline-flex items-center group"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-contrast mb-4 flex items-center">
              <i className="fas fa-building text-blue-600 mr-2 text-sm"></i>
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/careers', label: 'Careers' },
                { to: '/blog', label: 'Blog' },
                { to: '/press', label: 'Press Kit' },
                { to: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-contrast-secondary hover:text-purple-600 transition-colors inline-flex items-center group"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h4 className="font-semibold text-contrast mb-4 flex items-center">
              <i className="fas fa-life-ring text-green-600 mr-2 text-sm"></i>
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/help', label: 'Help Center' },
                { to: '/docs', label: 'Documentation' },
                { to: '/api', label: 'API Reference' },
                { to: '/status', label: 'System Status' },
                { to: '/community', label: 'Community' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-contrast-secondary hover:text-purple-600 transition-colors inline-flex items-center group"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="card-contrast rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-contrast mb-2 flex items-center">
                <i className="fas fa-envelope text-purple-600 mr-2"></i>
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-contrast-secondary">
                Get the latest updates on AI analytics and exclusive insights.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="glass-light px-4 py-2 rounded-xl flex-1 md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 text-contrast"
                aria-label="Email address"
              />
              <button className="px-6 py-2 bg-linear-to-r from-purple-500 to-blue-600 text-white rounded-xl font-medium hover-lift whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-contrast-secondary">
              © {currentYear} ShopIntelli AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow"></div>
              <span className="text-xs text-green-600 font-medium">All systems operational</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            {[
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
              { to: '/cookies', label: 'Cookie Policy' },
              { to: '/security', label: 'Security' }
            ].map((link, index) => (
              <Link 
                key={index}
                to={link.to} 
                className="text-sm text-contrast-secondary hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Made with love badge */}
        <div className="text-center mt-6">
          <p className="text-xs text-contrast-muted">
            Made with <i className="fas fa-heart text-red-500 mx-1"></i> using AI Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
