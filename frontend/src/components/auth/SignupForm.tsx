import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../common/Logo';

const SignupForm: React.FC = () => {
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add('grid-pattern');
    return () => {
      document.body.classList.remove('grid-pattern');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert('Passwords do not match');
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch {/* handled in context */}
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto">
          <div className="glass rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Logo />
                <h1 className="text-3xl font-bold gradient-text">ShopIntelli</h1>
              </div>
              <h2 className="text-3xl font-bold text-contrast mb-2">Create your account</h2>
              <p className="text-contrast-secondary">Start using AI-powered e-commerce insights</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-exclamation-circle text-red-600"></i>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-contrast mb-2" htmlFor="name">
                  <i className="fas fa-user mr-2 text-purple-500"></i>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full glass-light rounded-2xl px-4 py-3 text-contrast focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-contrast mb-2" htmlFor="email">
                  <i className="fas fa-envelope mr-2 text-purple-500"></i>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full glass-light rounded-2xl px-4 py-3 text-contrast focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-contrast mb-2" htmlFor="password">
                  <i className="fas fa-lock mr-2 text-purple-500"></i>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPwd ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full glass-light rounded-2xl px-4 py-3 pr-12 text-contrast focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPwd(v => !v)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
                  >
                    <i className={`fas ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-contrast mb-2" htmlFor="confirm">
                  <i className="fas fa-shield-alt mr-2 text-purple-500"></i>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    className="w-full glass-light rounded-2xl px-4 py-3 pr-12 text-contrast focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirm(v => !v)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
                  >
                    <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-br from-purple-500 to-blue-600 text-white rounded-2xl px-6 py-4 font-semibold hover-lift shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Creating account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i>
                    Create Account
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-contrast-secondary">
                Already have an account? {' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
