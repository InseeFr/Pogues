import { describe, expect, it, vi } from 'vitest';

import { NOMENCLATURE_FIELDS } from '../components/suggester-lists';
import { getSuggesterFormValues } from './suggester-lists-container';

describe('getSuggesterFormValues', () => {
  it('should call selector with correct paths for each field', () => {
    const mockState = {};

    const mockSelector = vi.fn((state, path) => `value-for-${path}`);

    // Base path for test
    const basePath = 'nomenclature.';

    const result = getSuggesterFormValues(mockState, mockSelector, basePath);

    NOMENCLATURE_FIELDS.forEach((field) => {
      const expectedPath = `${basePath}${field}`;
      expect(mockSelector).toHaveBeenCalledWith(mockState, expectedPath);
    });

    expect(result).toEqual({
      id: 'value-for-nomenclature.id',
      label: 'value-for-nomenclature.label',
      suggesterParameters: 'value-for-nomenclature.suggesterParameters',
      urn: 'value-for-nomenclature.urn',
      version: 'value-for-nomenclature.version',
      theme: 'value-for-nomenclature.theme',
      referenceYear: 'value-for-nomenclature.referenceYear',
    });
  });
});
