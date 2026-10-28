export interface Product {
  id: number;
  magento_id?: string;
  name: string;
  sku: string;
  description: string;
  short_description: string;
  // NOTE: Backend (Laravel + MySQL) returns DECIMAL fields as strings in JSON to preserve precision.
  // We accept number | string to make frontend resilient and avoid runtime type errors
  price: number | string;
  compare_price: number | string;
  cost_price: number | string;
  stock_quantity: number;
  quantity: number; // Alias for stock_quantity
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  category_id: number;
  brand_id: number;
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  meta_title: string;
  meta_description: string;
  tags: string[];
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  discount_percentage: number;
  categories: string[];
  attributes: Record<string, unknown>;
  
  // Relationships
  category?: Category;
  brand?: Brand;
  images: ProductImage[];
  videos: ProductVideo[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  image_url: string;
  thumbnail_url: string;
  is_primary: boolean;
  alt_text: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductVideo {
  id: number;
  product_id: number;
  video_path?: string;
  video_url?: string;
  thumbnail_url: string;
  video_type: 'upload' | 'youtube' | 'vimeo';
  external_id?: string;
  title: string;
  description: string;
  duration: number;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  image_url: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface SalesData {
  id: number;
  product_id: number;
  quantity_sold: number;
  revenue: number;
  sale_date: string;
  customer_data: Record<string, unknown>;
  product?: Product;
}

export interface AiPrediction {
  id: number;
  product_id: number;
  prediction_type: string;
  prediction_data: Record<string, unknown>;
  confidence_score: number;
  prediction_date: string;
}

export interface DashboardMetrics {
  total_products: number;
  active_products: number;
  approved_products: number;
  pending_products: number;
  low_stock_products: number;
  out_of_stock_products: number;
  in_stock_products: number;
  total_inventory_value: string | number;
  total_categories: number;
  total_brands: number;
  // Legacy fields (for backward compatibility)
  total_revenue?: number;
  total_sales?: number;
  avg_order_value?: number;
}

export interface SalesTrend {
  date: string;
  total_sales: number;
  total_revenue: number;
}

export interface ProductRecommendation {
  product_id: number;
  name: string;
  revenue: number;
  reason: string;
}