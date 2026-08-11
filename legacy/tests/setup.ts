import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('react-loader-spinner', () => ({
  RevolvingDot: () => null,
}));

afterEach(() => {
  cleanup();
});
