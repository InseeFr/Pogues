import { describe, expect, it, vi } from 'vitest';

import {
  NOMENCLATURE_FIELDS,
  clearFormFields,
  updateFormFields,
} from './suggester-lists';

describe('Form field helpers', () => {
  const mockChange = vi.fn();
  const formName = 'myForm';
  const path = 'nomenclature.';

  describe('clearFormFields', () => {
    it('should set id and label to empty string, others to undefined', () => {
      clearFormFields(mockChange, formName, path);

      // Check each field
      NOMENCLATURE_FIELDS.forEach((field) => {
        const expectedValue = ['id', 'label'].includes(field) ? '' : undefined;
        expect(mockChange).toHaveBeenCalledWith(
          formName,
          `${path}${field}`,
          expectedValue,
        );
      });

      // Check total number of calls
      expect(mockChange).toHaveBeenCalledTimes(NOMENCLATURE_FIELDS.length);
    });
  });

  describe('updateFormFields', () => {
    it('should update all fields with nomenclature values', () => {
      // Create a nomenclature object with all keys from NOMENCLATURE_FIELDS
      const nomenclature = Object.fromEntries(
        NOMENCLATURE_FIELDS.map((field) => [field, `mock_${field}`]),
      );

      updateFormFields(mockChange, formName, path, nomenclature);

      // Check each call
      NOMENCLATURE_FIELDS.forEach((field) => {
        expect(mockChange).toHaveBeenCalledWith(
          formName,
          `${path}${field}`,
          nomenclature[field],
        );
      });
    });

    it('should handle missing fields in nomenclature (sets to undefined)', () => {
      // Nomenclature with only 'id' and 'label'
      const nomenclature = {
        id: '123',
        label: 'Test',
      };

      updateFormFields(mockChange, formName, path, nomenclature);

      // Check that missing fields are set to undefined
      NOMENCLATURE_FIELDS.forEach((field) => {
        const expectedValue =
          field in nomenclature ? nomenclature[field] : undefined;
        expect(mockChange).toHaveBeenCalledWith(
          formName,
          `${path}${field}`,
          expectedValue,
        );
      });
    });
  });
});
