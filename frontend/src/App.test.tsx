import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Mock axios create and interceptors to avoid runtime errors in test
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    })),
  },
}));

// Mock components for lightweight render
vi.mock('./components/Dashboard', () => ({ default: () => <div data-testid="dashboard" /> }));
vi.mock('./components/auth/LoginForm', () => ({ default: () => <div data-testid="login" /> }));

import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });
});
