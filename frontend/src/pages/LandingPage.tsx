import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';
import Footer from '../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="grid-pattern min-h-screen relative">
      {/* Header */}
      <Header variant="landing" />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Additional Sections can be added here */}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
