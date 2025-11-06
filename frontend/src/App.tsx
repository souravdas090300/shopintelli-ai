import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import { useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import ProductsPage from './pages/Products';

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
      <div className="min-h-screen bg-gray-50">
        {!user && <Header />}
        <main className="py-10">
          <Routes>
            {/* Public routes */}
            <Route element={<PageLayout /> }>
              <Route path="/login" element={ user ? <Navigate to="/dashboard" replace /> : <LoginForm /> } />
              <Route path="/signup" element={ user ? <Navigate to="/dashboard" replace /> : <SignupForm /> } />
            </Route>

            {/* Authenticated app shell */}
            <Route element={ user ? <AppLayout /> : <Navigate to="/login" replace /> }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/analytics" element={<Dashboard />} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

const PageLayout: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default App;