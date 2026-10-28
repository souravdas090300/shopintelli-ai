import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  category: string;
}

interface AIRecommendation {
  id: number;
  name: string;
  price: number;
  image: string;
  reason: string;
}

const HomePage: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  console.log('HomePage rendering...');

  const products: Product[] = [
    {
      id: 1,
      name: 'Wireless Earbuds Pro',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 2300,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      badge: 'Hot Deal',
      badgeColor: 'from-green-500 to-emerald-500',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch X4',
      price: 249.99,
      rating: 5.0,
      reviews: 1800,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      badge: 'AI Pick',
      badgeColor: 'from-purple-500 to-blue-600',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'RGB Gaming Keyboard',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.0,
      reviews: 956,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
      category: 'Computers'
    },
    {
      id: 4,
      name: 'Ergonomic Mouse',
      price: 39.99,
      rating: 4.6,
      reviews: 723,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      badge: 'Limited',
      badgeColor: 'from-orange-500 to-red-500',
      category: 'Computers'
    },
    {
      id: 5,
      name: 'USB-C Hub Pro',
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.7,
      reviews: 1203,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
      badge: 'Hot Deal',
      badgeColor: 'from-green-500 to-emerald-500',
      category: 'Accessories'
    },
    {
      id: 6,
      name: 'Wireless Charger',
      price: 29.99,
      rating: 4.3,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1591290619762-c588f52ad1c8?w=400&h=400&fit=crop',
      category: 'Accessories'
    },
    {
      id: 7,
      name: '4K Webcam',
      price: 129.99,
      rating: 4.8,
      reviews: 654,
      image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop',
      badge: 'AI Pick',
      badgeColor: 'from-purple-500 to-blue-600',
      category: 'Electronics'
    },
    {
      id: 8,
      name: 'Mechanical Keyboard',
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 1842,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop',
      category: 'Computers'
    }
  ];

  const aiRecommendations: AIRecommendation[] = [
    {
      id: 9,
      name: 'Wireless Charging Pad',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1591290619762-c588f52ad1c8?w=300&h=300&fit=crop',
      reason: 'Frequently bought with wireless devices'
    },
    {
      id: 10,
      name: 'Portable SSD 1TB',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop',
      reason: 'Popular among tech enthusiasts'
    },
    {
      id: 11,
      name: 'Noise Cancelling Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop',
      reason: 'Trending in your category'
    },
    {
      id: 12,
      name: 'HD Monitor 27"',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop',
      reason: 'Perfect for your setup'
    }
  ];

  // Create particles
  useEffect(() => {
    const container = particlesRef.current;
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
  }, []);

  return (
    <div className="min-h-screen grid-pattern relative">
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="absolute inset-0" aria-hidden="true"></div>
      
      <Header variant="landing" />
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-12 slide-in">
          <h2 className="text-5xl font-bold mb-4 typewriter text-gray-900">Welcome to AI Analytics</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Real-time insights powered by advanced machine learning algorithms
          </p>
        </div>

        {/* Products Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-900">🛍️ Featured Products</h2>
            <Link to="/products" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center space-x-2">
              <span>View All</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl p-4 hover-lift group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {product.badge && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`bg-linear-to-r ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="product-image-wrapper mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                <div className="flex items-center mb-3 text-yellow-500 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.round(product.rating) ? '' : 'opacity-30'}`}></i>
                  ))}
                  <span className="text-xs text-gray-600 ml-2 font-semibold">
                    ({product.rating}) {product.reviews.toLocaleString()} reviews
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-purple-700">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-red-600 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  <button className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover-lift">
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-900">
              <i className="fas fa-robot text-purple-600 mr-3"></i>
              AI Recommendations for You
            </h2>
            <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiRecommendations.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-4 hover-lift group relative overflow-hidden border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute top-2 left-2 z-20">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    AI Recommended
                  </span>
                </div>
                <div className="product-image-wrapper mb-3 mt-6">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="product-image group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                <p className="text-sm text-purple-600 mb-3 flex items-center">
                  <i className="fas fa-lightbulb mr-2"></i>
                  {item.reason}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-700">${item.price}</span>
                  <button className="px-4 py-2 bg-linear-to-br from-purple-500 to-blue-600 text-white rounded-xl font-medium hover-lift flex items-center space-x-2">
                    <i className="fas fa-plus"></i>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <div className="bg-white rounded-3xl p-12 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-blue-600/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to unlock AI-powered insights?</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses using ShopIntelli AI to optimize their e-commerce operations
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl font-semibold text-lg hover-lift flex items-center space-x-2 shadow-lg"
                >
                  <span>Get Started Free</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
                <Link 
                  to="/demo" 
                  className="px-8 py-4 bg-white border-2 border-purple-300 rounded-2xl font-semibold text-lg text-gray-900 hover-lift flex items-center space-x-2 shadow-md"
                >
                  <i className="fas fa-play-circle text-purple-600"></i>
                  <span>Watch Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
