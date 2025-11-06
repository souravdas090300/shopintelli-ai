export interface Product {
  id: number;
  magento_id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  categories: string[];
  attributes: Record<string, unknown>;
  created_at: string;
  updated_at: string;
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
  total_revenue: number;
  total_sales: number;
  avg_order_value: number;
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