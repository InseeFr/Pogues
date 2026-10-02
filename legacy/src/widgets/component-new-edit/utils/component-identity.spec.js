import { describe, expect, it } from 'vitest';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import {
  isBlankRequiredField,
  isMissingRequiredIdentity,
} from './component-identity';

const { FILTER, LOOP, QUESTION } = COMPONENT_TYPE;

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
    it('is true when label or name is blank for questions', () => {
      expect(isMissingRequiredIdentity('', 'Q1', QUESTION)).toBe(true);
      expect(isMissingRequiredIdentity('Label', '', QUESTION)).toBe(true);
      expect(isMissingRequiredIdentity('...', 'Q1', QUESTION)).toBe(true);
    });

    it('is false when both fields have content', () => {
      expect(isMissingRequiredIdentity('Label', 'Q1', QUESTION)).toBe(false);
      expect(isMissingRequiredIdentity('Label', 'Q1')).toBe(false);
    });

    it('never blocks FILTER or LOOP (no Libellé/Identifiant fields)', () => {
      expect(isMissingRequiredIdentity('', '', FILTER)).toBe(false);
      expect(isMissingRequiredIdentity('', '', LOOP)).toBe(false);
    });
  });
});
