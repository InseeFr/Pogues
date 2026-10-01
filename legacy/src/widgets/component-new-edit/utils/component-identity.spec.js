import { describe, expect, it } from 'vitest';

import {
  isBlankRequiredField,
  isMissingRequiredIdentity,
} from './component-identity';

describe('component-identity', () => {
  describe('isBlankRequiredField', () => {
    it('treats empty, whitespace and punctuation-only as blank', () => {
      expect(isBlankRequiredField('')).toBe(true);
      expect(isBlankRequiredField('   ')).toBe(true);
      expect(isBlankRequiredField('...')).toBe(true);
      expect(isBlankRequiredField('?!')).toBe(true);
      expect(isBlankRequiredField(undefined)).toBe(true);
      expect(isBlankRequiredField(null)).toBe(true);
    });

    it('accepts real text or identifiers', () => {
      expect(isBlankRequiredField('Mon libellé')).toBe(false);
      expect(isBlankRequiredField('Q1')).toBe(false);
      expect(isBlankRequiredField(' AGE ')).toBe(false);
    });
  });

  describe('isMissingRequiredIdentity', () => {
    it('is true when label or name is blank', () => {
      expect(isMissingRequiredIdentity('', 'Q1')).toBe(true);
      expect(isMissingRequiredIdentity('Label', '')).toBe(true);
      expect(isMissingRequiredIdentity('...', 'Q1')).toBe(true);
    });

    it('is false when both fields have content', () => {
      expect(isMissingRequiredIdentity('Label', 'Q1')).toBe(false);
    });
  });
});
