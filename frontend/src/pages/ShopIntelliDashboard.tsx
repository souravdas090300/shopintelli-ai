import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricCardProps {
  title: string;
  value: number;
  percentage: string;
  icon: string;
  color: string;
  progress: string;
  prefix?: string;
  suffix?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  percentage, 
  icon, 
  color, 
  progress, 
  prefix = '', 
  suffix = '' 
}) => (
  <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
    <div 
      className={`absolute inset-0 bg-linear-to-br from-${color}-500/10 to-${color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      aria-hidden="true"
    ></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-2xl flex items-center justify-center`}>
          <i className={`fas ${icon} text-${color}-600 text-xl`}></i>
        </div>
        <div className="text-right">
          <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow" aria-hidden="true"></div>
          <span className="text-green-600 text-sm font-medium">{percentage}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-contrast">
        {prefix}{value.toLocaleString()}{suffix}
      </h3>
      <p className="text-contrast-secondary">{title}</p>
      <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-linear-to-r from-${color}-500 to-${color}-600 rounded-full`}
          style={{ width: progress }}
          aria-hidden="true"
        ></div>
      </div>
    </div>
  </div>
);

const ShopIntelliDashboard: React.FC = () => {
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    accuracy: 0
  });

  // Chart data configuration
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Actual Sales',
        data: [22000, 34000, 28000, 45000, 39000, 52000, 48000, 61000, 55000, 72000, 68000, 84000],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 4,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'AI Prediction',
        data: [null, null, null, null, null, null, null, null, null, null, 89000, 95000],
        borderColor: '#10b981',
        borderWidth: 4,
        borderDash: [8, 4],
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#1e293b',
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#8b5cf6',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#64748b',
          callback: (value) => '$' + value.toLocaleString()
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          display: false
        },
        ticks: {
          color: '#64748b'
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

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

  const animateMetrics = () => {
    const targets = {
      revenue: 84256,
      orders: 3842,
      customers: 28451,
      accuracy: 96.8
    };

    const increments = {
      revenue: targets.revenue / 50,
      orders: targets.orders / 50,
      customers: targets.customers / 50,
      accuracy: targets.accuracy / 50
    };

    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = { ...prev };
        let allComplete = true;

        Object.keys(targets).forEach(key => {
          const metricKey = key as keyof typeof targets;
          if (newMetrics[metricKey] < targets[metricKey]) {
            newMetrics[metricKey] = Math.min(
              newMetrics[metricKey] + increments[metricKey], 
              targets[metricKey]
            );
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(interval);
        }

        return newMetrics;
      });
    }, 30);

    return () => clearInterval(interval);
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  useEffect(() => {
    createParticles();
    const cleanup = animateMetrics();
    return cleanup;
  }, []);

  return (
    <div className="grid-pattern min-h-screen relative">
      {/* Animated Background Particles */}
      <div ref={particlesContainerRef} aria-hidden="true"></div>

      {/* Main Container */}
      <div className="min-h-screen relative">
        {/* Header */}
        <Header variant="dashboard" />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12 slide-in">
            <h2 className="text-5xl font-bold mb-4 text-contrast">Welcome to AI Analytics</h2>
            <p className="text-xl text-contrast-secondary max-w-2xl mx-auto">
              Real-time insights powered by advanced machine learning algorithms
            </p>
          </div>

          {/* Animated Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Revenue"
              value={metrics.revenue}
              percentage="+12.5%"
              icon="fa-dollar-sign"
              color="purple"
              progress="75%"
              prefix="$"
            />
            <MetricCard
              title="Total Orders"
              value={metrics.orders}
              percentage="+8.3%"
              icon="fa-shopping-cart"
              color="green"
              progress="66%"
            />
            <MetricCard
              title="Active Customers"
              value={metrics.customers}
              percentage="+15.2%"
              icon="fa-users"
              color="blue"
              progress="80%"
            />
            <MetricCard
              title="AI Accuracy"
              value={metrics.accuracy}
              percentage="+2.1%"
              icon="fa-robot"
              color="orange"
              progress="83%"
              suffix="%"
            />
          </div>

          {/* Interactive Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <div className="card-contrast rounded-3xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-contrast">Sales Performance & AI Forecast</h3>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 glass-light rounded-xl hover:bg-purple-100 transition-all text-contrast">7D</button>
                    <button className="px-4 py-2 glass-light rounded-xl hover:bg-purple-100 transition-all text-contrast">30D</button>
                    <button className="px-4 py-2 glass-light rounded-xl bg-purple-100 transition-all text-contrast">90D</button>
                  </div>
                </div>
                <div className="h-80">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="space-y-6">
              {/* Real-time AI Analysis */}
              <div className="card-contrast rounded-3xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-contrast">🤖 AI Live Analysis</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"></div>
                </div>
                <div className="space-y-4">
                  <div className="ai-thinking p-4 bg-green-50 border border-green-200 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-bolt text-green-600 mt-1"></i>
                      <div>
                        <p className="font-semibold text-green-700">Sales Spike Detected</p>
                        <p className="text-sm text-contrast-secondary">Electronics category up 68% this week</p>
                        <div className="flex items-center mt-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-xs text-green-600 ml-2 font-medium">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-chart-line text-blue-600 mt-1"></i>
                      <div>
                        <p className="font-semibold text-blue-700">Trend Prediction</p>
                        <p className="text-sm text-contrast-secondary">Gaming accessories demand rising</p>
                        <div className="flex items-center mt-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                          <span className="text-xs text-blue-600 ml-2 font-medium">87%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-exclamation-triangle text-purple-600 mt-1"></i>
                      <div>
                        <p className="font-semibold text-purple-700">Inventory Alert</p>
                        <p className="text-sm text-contrast-secondary">Smartphones stock running low</p>
                        <div className="flex items-center mt-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                          </div>
                          <span className="text-xs text-purple-600 ml-2 font-medium">23%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-contrast rounded-3xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-contrast">⚡ Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'fa-sync-alt', color: 'purple', label: 'Sync Data' },
                    { icon: 'fa-robot', color: 'green', label: 'AI Analysis' },
                    { icon: 'fa-chart-bar', color: 'blue', label: 'Reports' },
                    { icon: 'fa-cog', color: 'yellow', label: 'Settings' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="p-4 glass-light rounded-2xl hover-lift group text-contrast"
                      onClick={createRipple}
                    >
                      <i className={`fas ${action.icon} text-${action.color}-600 text-lg mb-2`}></i>
                      <p className="text-sm font-medium">{action.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="card-contrast rounded-3xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-contrast">📈 Live Activity</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'fa-shopping-cart', color: 'green', title: 'New High-Value Order', desc: 'Order #4289 - $1,247.99', time: 'Just now' },
                  { icon: 'fa-sync-alt', color: 'blue', title: 'Data Sync Complete', desc: '1,245 products updated', time: '2 min ago' },
                  { icon: 'fa-robot', color: 'purple', title: 'AI Model Optimized', desc: 'Prediction accuracy improved', time: '5 min ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-purple-50 transition-all">
                    <div className={`w-10 h-10 bg-${activity.color}-100 rounded-xl flex items-center justify-center`}>
                      <i className={`fas ${activity.icon} text-${activity.color}-600`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-contrast">{activity.title}</p>
                      <p className="text-sm text-contrast-secondary">{activity.desc}</p>
                    </div>
                    <span className={`text-xs text-${activity.color}-600 font-medium`}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="card-contrast rounded-3xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-contrast">🏆 Top Products</h3>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-500">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { rank: 1, color: 'green', name: 'Wireless Earbuds Pro', desc: '284 sold • $12,847 revenue', growth: '+45%', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop&crop=center' },
                  { rank: 2, color: 'blue', name: 'Smart Watch X4', desc: '189 sold • $9,245 revenue', growth: '+32%', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop&crop=center' },
                  { rank: 3, color: 'purple', name: 'Gaming Keyboard', desc: '156 sold • $6,892 revenue', growth: '+28%', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=50&h=50&fit=crop&crop=center' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-green-50 transition-all group">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform"
                      />
                      <div className={`absolute -top-1 -right-1 w-5 h-5 bg-${product.color}-500 rounded-full flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">{product.rank}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-contrast">{product.name}</p>
                      <p className="text-sm text-contrast-secondary">{product.desc}</p>
                    </div>
                    <span className={`text-${product.color}-600 font-semibold`}>{product.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ShopIntelliDashboard;
