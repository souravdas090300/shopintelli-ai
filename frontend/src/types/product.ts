export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  short_description: string;
  price: number;
  compare_price: number;
  cost_price: number;
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

export interface ProductAnalytics {
  product_id: number;
  product_name: string;
  total_sales: number;
  total_revenue: number;
  average_order_value: number;
  stock_status: string;
  current_stock: number;
  profit_margin: number;
  views_count: number;
  conversion_rate: number;
}

export interface ProductFormData {
  name: string;
  sku: string;
  description: string;
  short_description?: string;
  price: number;
  compare_price?: number;
  cost_price?: number;
  stock_quantity: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  category_id?: number;
  brand_id?: number;
  status?: 'active' | 'inactive' | 'draft';
  featured?: boolean;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
}
