import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = () => {
      const container = particlesContainerRef.current;
      if (!container) return;

      container.innerHTML = '';
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animation = `floating ${Math.random() * 6 + 4}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  const createRipple = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Particles */}
      <div ref={particlesContainerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" aria-hidden="true"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-12 slide-in">
            {/* AI Badge */}
            <div className="inline-flex items-center space-x-2 glass-light px-6 py-3 rounded-full mb-8 hover-lift">
              <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow"></div>
              <span className="text-sm font-medium text-contrast">
                <i className="fas fa-robot text-purple-600 mr-2"></i>
                Powered by Advanced AI Technology
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Welcome to AI Analytics</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-contrast-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
              Real-time insights powered by advanced machine learning algorithms.
              Transform your e-commerce business with intelligent data analytics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/signup"
                className="group relative px-8 py-4 bg-linear-to-r from-purple-500 to-blue-600 text-white rounded-2xl font-semibold text-lg hover-lift inline-flex items-center space-x-2"
                onClick={createRipple}
              >
                <span>Get Started Free</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
              
              <Link
                to="/demo"
                className="group px-8 py-4 glass-light rounded-2xl font-semibold text-lg text-contrast hover-lift inline-flex items-center space-x-2"
                onClick={createRipple}
              >
                <i className="fas fa-play-circle text-purple-600"></i>
                <span>Watch Demo</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-contrast-secondary">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-blue-500"></i>
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-purple-500"></i>
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {/* Feature Card 1 */}
            <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-chart-line text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-contrast">Real-time Analytics</h3>
                <p className="text-contrast-secondary">
                  Monitor your business metrics in real-time with AI-powered insights and predictions.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-brain text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-contrast">AI Predictions</h3>
                <p className="text-contrast-secondary">
                  Leverage machine learning to forecast trends and make data-driven decisions.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-bolt text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-contrast">Instant Insights</h3>
                <p className="text-contrast-secondary">
                  Get actionable insights instantly with our advanced AI analysis engine.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: '99.9%', label: 'Uptime', icon: 'fa-server', color: 'purple' },
              { value: '10k+', label: 'Active Users', icon: 'fa-users', color: 'blue' },
              { value: '50M+', label: 'Data Points', icon: 'fa-database', color: 'green' },
              { value: '4.9/5', label: 'Rating', icon: 'fa-star', color: 'yellow' }
            ].map((stat, index) => (
              <div key={index} className="glass-light rounded-2xl p-6 text-center hover-lift">
                <i className={`fas ${stat.icon} text-${stat.color}-600 text-2xl mb-3`}></i>
                <div className="text-3xl font-bold text-contrast mb-1">{stat.value}</div>
                <div className="text-sm text-contrast-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
