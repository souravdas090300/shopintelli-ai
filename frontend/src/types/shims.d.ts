// Ambient module declarations to satisfy the editor when node_modules is mounted only in Docker.
// These do not affect runtime inside the container where actual modules exist.

declare module 'vitest';
declare module 'vitest/config';
declare module '@testing-library/jest-dom/vitest';
declare module '@testing-library/react';
