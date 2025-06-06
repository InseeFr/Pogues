import { computeDateFromNow } from './date';

it('Compute date from now', () => {
  expect(computeDateFromNow(new Date())).toBe('il y a quelques secondes');
});
