import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface Metrics {
  revenue: number;
  orders: number;
  customers: number;
  accuracy: number;
}

const UnifiedLandingPage: React.FC = () => {
  const [metrics, setMetrics] = useState({ revenue: 0, orders: 0, customers: 0, accuracy: 0 });
  const particlesRef = useRef<HTMLDivElement>(null);

  // Metric animation
  useEffect(() => {
    const targets: Metrics = { revenue: 84256, orders: 3842, customers: 28451, accuracy: 96.8 };
    const increments: Metrics = { revenue: targets.revenue / 50, orders: targets.orders / 50, customers: targets.customers / 50, accuracy: targets.accuracy / 50 };
    const interval = setInterval(() => {
      setMetrics(prev => {
        const next: Metrics = { ...prev };
        let done = true;
        (Object.keys(targets) as (keyof Metrics)[]).forEach(k => {
          if (next[k] < targets[k]) {
            next[k] = Math.min(next[k] + increments[k], targets[k]);
            done = false;
          }
        });
        if (done) clearInterval(interval);
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Particles
  useEffect(() => {
    const container = particlesRef.current; if (!container) return; container.innerHTML='';
    for (let i=0;i<25;i++){ const p=document.createElement('div'); p.className='particle'; const size=Math.random()*3+1; p.style.width=`${size}px`; p.style.height=`${size}px`; p.style.left=`${Math.random()*100}vw`; p.style.top=`${Math.random()*100}vh`; p.style.animation=`floating ${Math.random()*6+4}s ease-in-out infinite`; p.style.animationDelay=`${Math.random()*5}s`; container.appendChild(p);} }
  ,[]);

  const chartData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      { label: 'Actual Sales', data: [22000,34000,28000,45000,39000,52000,48000,61000,55000,72000,68000,84000], borderColor:'#8b5cf6', backgroundColor:'rgba(139,92,246,0.1)', borderWidth:4, fill:true, tension:0.4, pointBackgroundColor:'#8b5cf6', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:6, pointHoverRadius:8 },
      { label: 'AI Prediction', data: [null,null,null,null,null,null,null,null,null,null,89000,95000], borderColor:'#10b981', borderWidth:4, borderDash:[8,4], fill:false, tension:0.4, pointBackgroundColor:'#10b981', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:6, pointHoverRadius:8 }
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
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#64748b',
          callback: (value) => '$' + value.toLocaleString()
        }
      },
      x: {
        ticks: {
          color: '#64748b'
        }
      }
    }
  };

  return (
    <div className="grid-pattern min-h-screen relative">
      <div ref={particlesRef} className="absolute inset-0" aria-hidden="true"></div>
      <Header variant="landing" />
      <main className="container mx-auto px-6 py-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-12 slide-in">
          <h2 className="text-5xl font-bold mb-4 typewriter text-contrast">Welcome to AI Analytics</h2>
          <p className="text-xl text-contrast-secondary max-w-2xl mx-auto">
            Real-time insights powered by advanced machine learning algorithms
          </p>
        </div>

        {/* Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[{title:'Total Revenue', value:metrics.revenue, prefix:'$', color:'purple', pct:'+12.5%', progress:'75%'},
            {title:'Total Orders', value:metrics.orders, color:'green', pct:'+8.3%', progress:'66%'},
            {title:'Active Customers', value:metrics.customers, color:'blue', pct:'+15.2%', progress:'80%'},
            {title:'AI Accuracy', value:metrics.accuracy, color:'orange', pct:'+2.1%', progress:'83%', suffix:'%'}]
            .map((m,i)=>(
              <div key={i} className="card-contrast rounded-3xl p-6 hover-lift group relative overflow-hidden">
                <div className={`absolute inset-0 bg-linear-to-br from-${m.color}-500/10 to-${m.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${m.color}-100 rounded-2xl flex items-center justify-center`}>
                      <i className={`fas ${m.title==='AI Accuracy'?'fa-robot':m.title==='Total Revenue'?'fa-dollar-sign':m.title==='Total Orders'?'fa-shopping-cart':m.title==='Active Customers'?'fa-users':'fa-chart-line'} text-${m.color}-600 text-xl`} />
                    </div>
                    <div className="text-right"><div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"/><span className="text-green-600 text-sm font-medium">{m.pct}</span></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-contrast">{m.prefix||''}{m.value.toLocaleString()}{m.suffix||''}</h3>
                  <p className="text-contrast-secondary">{m.title}</p>
                  <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden"><div className={`h-full bg-linear-to-r from-${m.color}-500 to-${m.color}-600 rounded-full`} style={{width:m.progress}}/></div>
                </div>
              </div>
            ))}
        </section>

        {/* Chart & AI Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 card-contrast rounded-3xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-contrast">Sales Performance & AI Forecast</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 glass-light rounded-xl text-contrast">7D</button>
                <button className="px-4 py-2 glass-light rounded-xl text-contrast">30D</button>
                <button className="px-4 py-2 glass-light rounded-xl bg-purple-100 text-contrast">90D</button>
              </div>
            </div>
            <div className="h-80"><Line data={chartData} options={chartOptions} /></div>
          </div>
          <div className="space-y-6">
            <div className="card-contrast rounded-3xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-semibold text-contrast">🤖 AI Live Analysis</h3><div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"/></div>
              <div className="space-y-4">
                {[{color:'green',icon:'fa-bolt',title:'Sales Spike Detected',desc:'Electronics category up 68% this week',pct:'92%'},{color:'blue',icon:'fa-chart-line',title:'Trend Prediction',desc:'Gaming accessories demand rising',pct:'87%'},{color:'purple',icon:'fa-exclamation-triangle',title:'Inventory Alert',desc:'Smartphones stock running low',pct:'23%'}].map((a,i)=>(
                  <div key={i} className={`p-4 bg-${a.color}-50 border border-${a.color}-200 rounded-2xl`}>
                    <div className="flex items-start space-x-3"><i className={`fas ${a.icon} text-${a.color}-600 mt-1`}/><div><p className={`font-semibold text-${a.color}-700`}>{a.title}</p><p className="text-sm text-contrast-secondary">{a.desc}</p><div className="flex items-center mt-2"><div className="w-full bg-slate-200 rounded-full h-2"><div className={`bg-${a.color}-500 h-2 rounded-full`} style={{width:a.pct}}/></div><span className={`text-xs text-${a.color}-600 ml-2 font-medium`}>{a.pct}</span></div></div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-contrast rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-contrast">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{icon:'fa-sync-alt',color:'purple',label:'Sync Data'},{icon:'fa-robot',color:'green',label:'AI Analysis'},{icon:'fa-chart-bar',color:'blue',label:'Reports'},{icon:'fa-cog',color:'yellow',label:'Settings'}].map((q,i)=>(
                  <button key={i} className="p-4 glass-light rounded-2xl hover-lift group text-contrast"><i className={`fas ${q.icon} text-${q.color}-600 text-lg mb-2`}/><p className="text-sm font-medium">{q.label}</p></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Sections - Live Activity and Top Products */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="card-contrast rounded-3xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-contrast">📈 Live Activity</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow" aria-hidden="true"></div>
                <span className="text-sm text-green-600 font-medium">Live</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-purple-50 transition-all">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <i className="fas fa-shopping-cart text-green-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-contrast">New High-Value Order</p>
                  <p className="text-sm text-contrast-secondary">Order #4289 - $1,247.99</p>
                </div>
                <span className="text-xs text-green-600 font-medium">Just now</span>
              </div>
              <div className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-blue-50 transition-all">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <i className="fas fa-sync-alt text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-contrast">Data Sync Complete</p>
                  <p className="text-sm text-contrast-secondary">1,245 products updated</p>
                </div>
                <span className="text-xs text-blue-600 font-medium">2 min ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-purple-50 transition-all">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <i className="fas fa-robot text-purple-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-contrast">AI Model Optimized</p>
                  <p className="text-sm text-contrast-secondary">Prediction accuracy improved</p>
                </div>
                <span className="text-xs text-purple-600 font-medium">5 min ago</span>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="card-contrast rounded-3xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-contrast">🏆 Top Products</h3>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-500" aria-label="View all top products">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-green-50 transition-all group">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop&crop=center" 
                       alt="Wireless Earbuds Pro" className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform"/>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-contrast">Wireless Earbuds Pro</p>
                  <p className="text-sm text-contrast-secondary">284 sold • $12,847 revenue</p>
                </div>
                <span className="text-green-600 font-semibold">+45%</span>
              </div>
              <div className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-blue-50 transition-all group">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop&crop=center" 
                       alt="Smart Watch X4" className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform"/>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-contrast">Smart Watch X4</p>
                  <p className="text-sm text-contrast-secondary">189 sold • $9,245 revenue</p>
                </div>
                <span className="text-blue-600 font-semibold">+32%</span>
              </div>
              <div className="flex items-center space-x-4 p-3 glass-light rounded-2xl hover:bg-purple-50 transition-all group">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=50&h=50&fit=crop&crop=center" 
                       alt="Gaming Keyboard" className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform"/>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-contrast">Gaming Keyboard</p>
                  <p className="text-sm text-contrast-secondary">156 sold • $6,892 revenue</p>
                </div>
                <span className="text-purple-600 font-semibold">+28%</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UnifiedLandingPage;
