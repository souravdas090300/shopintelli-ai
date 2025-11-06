import axios from 'axios';
// Vite provides typed import.meta.env when vite/client types are included
const API_BASE_URL = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const dashboardAPI = {
  getDashboardData: () => api.get('/dashboard/data'),
  syncMagentoData: () => api.post('/dashboard/sync/magento'),
};

export const aiAPI = {
  getSalesPredictions: (productIds: number[], periodDays: number = 30) =>
    api.post('/ai/predictions/sales', { product_ids: productIds, period_days: periodDays }),
  getProductRecommendations: () => api.get('/ai/recommendations/products'),
  getCustomerSegmentation: () => api.get('/ai/segmentation/customers'),
};

export const productAPI = {
  getProducts: () => api.get('/products'),
  getProduct: (id: number) => api.get(`/products/${id}`),
};

export const salesAPI = {
  getSalesData: (params?: Record<string, unknown>) => api.get('/sales', { params }),
};

export default api;
