import { describe, expect, test } from 'vitest';

import { getCurrentUri, getUrlFromCriteria, nameFromLabel } from './utils';

describe('Utils', () => {
  test.each([
    [undefined, ''],
    [{}, ''],
    [{ key1: 'value-key1' }, 'key1=value-key1'],
    [{ key1: undefined }, ''],
    [
      { key1: 'value-key1', key2: 'value-key2' },
      'key1=value-key1&key2=value-key2',
    ],
    [{ key1: 'value-key1', key2: undefined }, 'key1=value-key1'],
  ])('getUrlFromCriteria (%s) -> %s', (criteria, expected) => {
    expect(getUrlFromCriteria(criteria)).toBe(expected);
  });

  test.each([
    ['mon label', 'MONLABEL'],
    ['mon label est un peu trop long', 'MONLABELES'],
    ['mon 1er läbél', 'MON1ERLBL'],
  ])('nameFromLabel (%s) -> %s', (label, expected) => {
    expect(nameFromLabel(label)).toEqual(expected);
  });
});

describe('getCurrentUri', () => {
  const originalLocation = globalThis.location;

  const mockLocation = (href: string, origin: string) => {
    Object.defineProperty(globalThis, 'location', {
      value: { href, origin },
    });
  };

  afterEach(() => {
    Object.defineProperty(globalThis, 'location', {
      value: originalLocation,
    });
  });

  it('should return pathname', () => {
    mockLocation('https://example.com/questionnaire', 'https://example.com');

    expect(getCurrentUri()).toBe('/questionnaire');
  });

  it('should return pathname with query params', () => {
    mockLocation(
      'https://example.com/questionnaire?param=2',
      'https://example.com',
    );

    expect(getCurrentUri()).toBe('/questionnaire?param=2');
  });

  it('should return pathname with query params and hash', () => {
    mockLocation(
      'https://example.com/questionnaire?param=2#hash',
      'https://example.com',
    );

    expect(getCurrentUri()).toBe('/questionnaire?param=2#hash');
  });

  it('should return "/" for root', () => {
    mockLocation('https://example.com/', 'https://example.com');

    expect(getCurrentUri()).toBe(undefined);
  });
});
