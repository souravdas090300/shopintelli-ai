import React from 'react';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'medium', 
  showText = true,
  className = '' 
}) => {
  // Size configurations matching the instructions
  const sizeConfig = {
    small: {
      container: 'w-10 h-10',
      icon: 'text-lg',
      title: 'text-xl',
      subtitle: 'text-xs'
    },
    medium: {
      container: 'w-12 h-12', // 48x48px as per instructions
      icon: 'text-xl',
      title: 'text-2xl',
      subtitle: 'text-sm'
    },
    large: {
      container: 'w-16 h-16',
      icon: 'text-3xl',
      title: 'text-3xl',
      subtitle: 'text-base'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Logo Icon - Gradient Purple-500 to Blue-600 */}
      <div 
        className={`${config.container} rounded-2xl flex items-center justify-center shadow-lg`}
        style={{ 
          backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #2563eb 100%)',
          animation: 'floating 3s ease-in-out infinite'
        }}
      >
        <i className={`fas fa-brain ${config.icon}`} style={{ color: '#ffffff' }}></i>
      </div>

      {/* Logo Text */}
      {showText && (
        <div>
          <h1 className={`${config.title} font-bold gradient-text`}>
            ShopIntelli
          </h1>
          <p className={`${config.subtitle} text-contrast-secondary`}>
            AI-Powered E-commerce Analytics
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
