import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.stubEnv('VITE_API_URL', 'https://mock-api');

afterEach(() => {
  cleanup();
});
