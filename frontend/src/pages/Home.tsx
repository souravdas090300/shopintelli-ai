import React, { useState, useEffect } from 'react';
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

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);

  const sampleProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Earbuds Pro',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 2300,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=250&h=200&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=250&h=200&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=250&h=200&fit=crop',
      category: 'Computers'
    },
    {
      id: 4,
      name: 'Ergonomic Mouse',
      price: 39.99,
      rating: 4.6,
      reviews: 723,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=250&h=200&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=250&h=200&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1591290619762-c588f52ad1c8?w=250&h=200&fit=crop',
      category: 'Accessories'
    },
    {
      id: 7,
      name: 'Laptop Stand',
      price: 59.99,
      rating: 4.8,
      reviews: 1567,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=250&h=200&fit=crop',
      badge: 'AI Pick',
      badgeColor: 'from-purple-500 to-blue-600',
      category: 'Accessories'
    },
    {
      id: 8,
      name: 'Webcam HD Pro',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.4,
      reviews: 643,
      image: 'https://images.unsplash.com/photo-1589739900243-c1982ea580a6?w=250&h=200&fit=crop',
      category: 'Electronics'
    }
  ];

  const sampleRecommendations: AIRecommendation[] = [
    {
      id: 9,
      name: 'Wireless Charging Pad',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1591290619762-c588f52ad1c8?w=250&h=200&fit=crop',
      reason: 'Frequently bought with wireless devices'
    },
    {
      id: 10,
      name: 'Portable SSD 1TB',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=250&h=200&fit=crop',
      reason: 'Popular among tech enthusiasts'
    },
    {
      id: 11,
      name: 'Noise Cancelling Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=250&h=200&fit=crop',
      reason: 'Trending in your category'
    }
  ];

  useEffect(() => {
    // Initialize with sample data
    setProducts(sampleProducts);
    setAiRecommendations(sampleRecommendations);
    
    // Add grid pattern to body
    document.body.classList.add('grid-pattern');
    
    return () => {
      document.body.classList.remove('grid-pattern');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecommendations = aiRecommendations.filter(rec =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className="min-h-screen grid-pattern">
      <Header variant="landing" />
      
      {/* Hero Section Enhanced */}
      <section className="container mx-auto px-6 pt-20 pb-12 relative">
        <div className="text-center mb-12 slide-in">
          <div className="inline-flex items-center space-x-2 glass-light px-6 py-3 rounded-full mb-6 hover-lift">
            <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow" aria-hidden="true"></div>
            <span className="text-sm font-medium text-contrast">
              <i className="fas fa-robot text-purple-600 mr-2" aria-hidden="true"></i>
              Powered by Advanced AI Technology
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight typewriter text-contrast">
            Welcome to AI Analytics
          </h2>
          <p className="text-xl md:text-2xl text-contrast-secondary max-w-3xl mx-auto leading-relaxed">
            Real-time insights powered by advanced machine learning algorithms. Transform your e-commerce business with intelligent data analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/analytics"
              className="group relative px-8 py-4 bg-linear-to-r from-purple-500 to-blue-600 text-white rounded-2xl font-semibold text-lg hover-lift inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
            </Link>
            <Link
              to="/demo"
              className="group px-8 py-4 glass-light rounded-2xl font-semibold text-lg text-contrast hover-lift inline-flex items-center space-x-2"
            >
              <i className="fas fa-play-circle text-purple-600" aria-hidden="true"></i>
              <span>Watch Demo</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-contrast-secondary mt-10">
            <div className="flex items-center space-x-2"><i className="fas fa-check-circle text-green-500" aria-hidden="true"></i><span>No credit card required</span></div>
            <div className="flex items-center space-x-2"><i className="fas fa-shield-alt text-blue-500" aria-hidden="true"></i><span>Enterprise-grade security</span></div>
            <div className="flex items-center space-x-2"><i className="fas fa-clock text-purple-500" aria-hidden="true"></i><span>Setup in 5 minutes</span></div>
          </div>
        </div>
      </section>

      {/* Products Section - WHITE BACKGROUND so BLACK TEXT */}
      <main className="container mx-auto px-6 py-16 bg-white">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2 drop-shadow-sm">
              {searchQuery ? `Search Results for "${searchQuery}"` : '🔥 Trending Products'}
            </h2>
            <p className="text-black font-medium text-lg">
              {searchQuery 
                ? `Found ${filteredProducts.length + filteredRecommendations.length} results` 
                : 'Handpicked items just for you'
              }
            </p>
          </div>
        </div>

        {/* Products Grid - WHITE CARDS so BLACK TEXT */}
        {filteredProducts.length > 0 && (
          <div className="mb-16">
            {searchQuery && <h3 className="text-2xl font-bold text-black mb-6">Products</h3>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl p-4 hover:shadow-2xl transition-all group relative overflow-hidden border-4 border-purple-300">
                  {product.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`bg-linear-to-r ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white`}>
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">{product.name}</h4>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-500 text-sm drop-shadow-sm">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-black ml-2 font-semibold">
                      ({product.rating}) {product.reviews.toLocaleString()} reviews
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-purple-700">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-red-600 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {/* PURPLE BG = WHITE TEXT */}
                    <button className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all">
                      <i className="fas fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations - WHITE CARDS so BLACK TEXT */}
        {filteredRecommendations.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-black">🧠 AI Recommendations</h3>
              <div className="flex items-center space-x-2">
                <i className="fas fa-robot text-purple-600"></i>
                <span className="text-sm text-black font-medium">Powered by AI</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((rec) => (
                <div key={rec.id} className="bg-white rounded-3xl p-6 hover:shadow-xl transition-all group border-4 border-purple-300">
                  <div className="product-image-wrapper relative">
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="product-image group-hover:scale-105"
                    />
                    {/* PURPLE BG = WHITE TEXT */}
                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold border-2 border-white">
                      AI Pick
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2">{rec.name}</h4>
                  <p className="text-black text-sm mb-3 font-medium">{rec.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-700">${rec.price}</span>
                    {/* PURPLE BG = WHITE TEXT */}
                    <button className="px-4 py-2 bg-linear-to-br from-purple-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all border-2 border-purple-800">
                      <i className="fas fa-cart-plus mr-2"></i>
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results State - WHITE BG so BLACK TEXT */}
        {searchQuery && filteredProducts.length === 0 && filteredRecommendations.length === 0 && (
          <div className="text-center py-16 bg-white">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-purple-300">
              <i className="fas fa-search text-purple-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">No products found</h3>
            <p className="text-black mb-6 font-medium">
              Try adjusting your search terms or browse our categories
            </p>
            {/* PURPLE BG = WHITE TEXT */}
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-linear-to-br from-purple-500 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all border-2 border-purple-800"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* Call to Action - LIGHT BG so BLACK TEXT */}
      <section className="bg-linear-to-br from-purple-50 to-blue-50 rounded-3xl mx-6 mb-16 p-12 text-center border-4 border-purple-300">
        <h2 className="text-4xl font-bold text-black mb-4">
          Ready for Advanced Analytics?
        </h2>
        <p className="text-xl text-black mb-8 max-w-2xl mx-auto font-medium">
          Sign in to access powerful AI analytics, sales predictions, and business insights
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/* PURPLE BG = WHITE TEXT */}
          <Link
            to="/login"
            className="px-8 py-4 bg-linear-to-br from-purple-500 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all shadow-lg border-2 border-purple-800"
          >
            <i className="fas fa-chart-line mr-2"></i>
            Access Analytics
          </Link>
          {/* WHITE BG = BLACK TEXT */}
          <Link
            to="/signup"
            className="px-8 py-4 bg-white rounded-2xl font-semibold hover:shadow-xl transition-all border-4 border-purple-600 text-black"
          >
            <i className="fas fa-user-plus mr-2 text-purple-600"></i>
            Create Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
