import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {/* handled in context */}
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
      <p className="text-sm text-gray-600 mb-6">Sign in to access your analytics dashboard.</p>
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPwd ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute inset-y-0 right-2 text-xs text-indigo-600">{showPwd ? 'Hide' : 'Show'}</button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center items-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-6">Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">Create one</Link></p>
    </div>
  );
};

export default LoginForm;
