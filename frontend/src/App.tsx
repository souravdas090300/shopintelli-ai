import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';

// Pages
import HomePage from './pages/HomePage';
import UnifiedLandingPage from './pages/UnifiedLandingPage';
import ShopIntelliDashboard from './pages/ShopIntelliDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import ProductsPage from './pages/Products';
import Assistant from './pages/Assistant';
import DesignSystemShowcase from './pages/DesignSystem';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<UnifiedLandingPage />} />
        <Route path="/demo" element={<ShopIntelliDashboard />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        
        {/* Protected Routes - wrapped in AppLayout */}
        <Route element={user ? <AppLayout /> : <Navigate to="/login" replace />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/design-system" element={<DesignSystemShowcase />} />
        </Route>
        
        {/* Catch-all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;