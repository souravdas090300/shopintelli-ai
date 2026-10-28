import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

const LoginForm: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const chartInstanceRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add('grid-pattern');

    // Initialize advanced chart
    function initAdvancedChart() {
      if (!canvasRef.current) return;
      
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      // Destroy existing chart if any
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
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
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#1e293b',
                font: {
                  size: 12,
                  weight: 600
                }
              }
            },
            tooltip: {
              mode: 'index',
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
                callback: function(value) {
                  return '$' + (value as number).toLocaleString();
                }
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
          }
        }
      });
    }

    // Metric cards counter animation
    function initMetrics() {
      const metrics = [
        { element: document.getElementById('revenue-value'), target: 84256, prefix: '$' },
        { element: document.getElementById('orders-value'), target: 3842 },
        { element: document.getElementById('customers-value'), target: 28451 },
        { element: document.getElementById('accuracy-value'), target: 96.8, suffix: '%' }
      ];
      
      metrics.forEach(metric => {
        if (!metric.element) return;
        
        let current = 0;
        const increment = metric.target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= metric.target) {
            current = metric.target;
            clearInterval(timer);
          }
          const value = metric.prefix ? 
            metric.prefix + Math.floor(current).toLocaleString() :
            Math.floor(current).toLocaleString();
          metric.element!.textContent = metric.suffix ? value + metric.suffix : value;
        }, 30);
      });
    }

    initAdvancedChart();
    initMetrics();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      document.body.classList.remove('grid-pattern');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {/* handled in context */}
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Analytics Preview */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-contrast mb-4">
                <span className="typewriter inline-block">AI-Powered Analytics</span>
              </h1>
              <p className="text-xl text-contrast-secondary">
                Sign in to unlock advanced insights and real-time forecasting
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Revenue Card */}
              <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center mb-3">
                    <i className="fas fa-dollar-sign text-purple-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-contrast" id="revenue-value">$84,256</h3>
                  <p className="text-sm text-contrast-secondary">Total Revenue</p>
                  <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-purple-500 to-blue-500 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Orders Card */}
              <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                    <i className="fas fa-shopping-cart text-green-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-contrast" id="orders-value">3,842</h3>
                  <p className="text-sm text-contrast-secondary">Total Orders</p>
                  <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Customers Card */}
              <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
                    <i className="fas fa-users text-blue-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-contrast" id="customers-value">28,451</h3>
                  <p className="text-sm text-contrast-secondary">Active Customers</p>
                  <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>

              {/* AI Accuracy Card */}
              <div className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center mb-3">
                    <i className="fas fa-robot text-orange-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-contrast" id="accuracy-value">96.8%</h3>
                  <p className="text-sm text-contrast-secondary">AI Accuracy</p>
                  <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="card-contrast rounded-3xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-contrast">Sales Performance & AI Forecast</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>
              <div className="h-80">
                <canvas ref={canvasRef} id="advancedChart"></canvas>
              </div>
            </div>

            {/* AI Insights */}
            <div className="card-contrast rounded-3xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-contrast">🧠 AI Live Analysis</h3>
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
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
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
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
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
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '23%'}}></div>
                        </div>
                        <span className="text-xs text-purple-600 ml-2 font-medium">23%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="sticky top-8">
            <div className="glass rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i className="fas fa-brain text-white text-2xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-contrast mb-2">Welcome back</h2>
                <p className="text-contrast-secondary">Sign in to access your analytics dashboard</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-exclamation-circle text-red-600"></i>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}
              
              {/* Feature Preview */}
              <div className="mb-6 p-6 bg-linear-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                <p className="text-xs font-semibold text-purple-700 mb-3 uppercase tracking-wide">After login, you'll have access to:</p>
                <ul className="space-y-2.5 text-sm text-contrast">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span><strong className="text-purple-700">Dashboard</strong> - Real-time analytics and insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span><strong className="text-green-700">AI Predictions</strong> - Sales forecasting and trends</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span><strong className="text-blue-700">Products</strong> - Intelligent inventory management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded-lg flex items-center justify-center shrink-0">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span><strong className="text-orange-700">Analytics</strong> - Deep performance metrics</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-contrast mb-2" htmlFor="email">
                    <i className="fas fa-envelope mr-2 text-purple-500"></i>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full glass-light rounded-2xl px-4 py-3 text-contrast focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-contrast mb-2" htmlFor="password">
                    <i className="fas fa-lock mr-2 text-purple-500"></i>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPwd ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full glass-light rounded-2xl px-4 py-3 pr-12 text-contrast focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPwd(v => !v)} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
                    >
                      <i className={`fas ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-br from-purple-500 to-blue-600 text-white rounded-2xl px-6 py-4 font-semibold hover-lift shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-contrast-secondary">
                  Don't have an account? {' '}
                  <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                    Create one now →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
