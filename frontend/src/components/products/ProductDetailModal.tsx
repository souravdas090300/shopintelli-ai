import React, { useState } from 'react';
import type { Product, ProductImage } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'images' | 'videos'>('details');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const primaryImage: ProductImage | undefined = product.images?.find((img: ProductImage) => img.is_primary) || product.images?.[0];
  const currentImage: ProductImage | undefined = product.images?.[selectedImageIndex] || primaryImage;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600">SKU: {product.sku}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Media */}
          <div className="flex-1 bg-gray-100 p-6">
            <div className="flex flex-col h-full">
              {/* Main Image/Video */}
              <div className="flex-1 bg-white rounded-lg overflow-hidden mb-4" style={{ minHeight: '400px' }}>
                {activeTab === 'images' && currentImage ? (
                  <img
                    src={currentImage.image_url}
                    alt={currentImage.alt_text}
                    className="w-full h-full object-contain"
                  />
                ) : activeTab === 'videos' && product.videos && product.videos.length > 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${product.videos[0].external_id}`}
                      title={product.videos[0].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <img
                    src={primaryImage?.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'}
                    alt={primaryImage?.alt_text || product.name}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Thumbnails */}
              {(product.images && product.images.length > 0) || (product.videos && product.videos.length > 0) ? (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images && product.images.map((image: ProductImage, index: number) => (
                    <button
                      key={image.id}
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setActiveTab('images');
                      }}
                      className={`shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${
                        activeTab === 'images' && selectedImageIndex === index 
                          ? 'border-blue-500' 
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.thumbnail_url}
                        alt={image.alt_text}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  {product.videos && product.videos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => setActiveTab('videos')}
                      className={`relative shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${
                        activeTab === 'videos' ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'images'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Images ({product.images?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'videos'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Videos ({product.videos?.length || 0})
              </button>
            </div>

            {/* Content */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price
                    </label>
                    <p className="text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Compare Price
                    </label>
                    <p className="text-lg text-gray-500 line-through">
                      ${product.compare_price?.toFixed(2) || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Inventory */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inventory
                  </label>
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className="ml-2 font-semibold">{product.stock_quantity} units</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock_status === 'in_stock' 
                          ? 'bg-green-100 text-green-800'
                          : product.stock_status === 'low_stock'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock_status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specifications */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Weight:</span>
                      <span className="ml-2 font-medium">{product.weight} kg</span>
                    </div>
                    {product.brand && (
                      <div>
                        <span className="text-gray-600">Brand:</span>
                        <span className="ml-2 font-medium">{product.brand.name}</span>
                      </div>
                    )}
                    {product.category && (
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="ml-2 font-medium">{product.category.name}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Featured:</span>
                      <span className="ml-2 font-medium">
                        {product.featured ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'images' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Product Images</h4>
                {product.images && product.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {product.images.map((image: ProductImage) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.thumbnail_url}
                          alt={image.alt_text}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        {image.is_primary && (
                          <span className="absolute top-1 left-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No images available</p>
                )}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Product Videos</h4>
                {product.videos && product.videos.length > 0 ? (
                  product.videos.map((video) => (
                    <div key={video.id} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{video.title}</h5>
                      <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.external_id}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No videos available</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn btn-ghost"
          >
            Close
          </button>
          {onSave && (
            <button
              onClick={() => onSave(product)}
              className="btn btn-primary"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
