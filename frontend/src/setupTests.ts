import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Minimal ResizeObserver mock for libraries that expect it (e.g., charts)
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}
// @ts-expect-error - Polyfill ResizeObserver for JSDOM tests
global.ResizeObserver = global.ResizeObserver || ResizeObserverMock;

// Mock localStorage for test environment
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};
// @ts-expect-error - Polyfill localStorage for JSDOM tests
global.localStorage = localStorageMock;

// Mock axios to avoid real network calls in component tests
vi.mock('axios', () => {
	const get = vi.fn().mockResolvedValue({ data: {} });
	const post = vi.fn().mockResolvedValue({ data: {} });
	return {
		default: { create: () => ({ get, post, interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } } }) },
		get,
		post,
	};
});

