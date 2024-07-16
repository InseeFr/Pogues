import { describe, expect, test } from 'vitest';
import {
  getNewIndex,
  initialize,
  updateSuggestions,
} from './input-with-suggestions-utils';

describe('input-with-suggestions-utils', () => {
  describe('updateSuggestions', () => {
    test('if the text match the regexp', () => {
      expect(
        updateSuggestions('text', /^(text)$/, ['texte', 'other', 'textuel']),
      ).toEqual({
        suggestions: ['texte', 'textuel'],
        hoveredSuggestionIndex: 0,
      });
    });

    test('if the text do not match the regexp', () => {
      expect(updateSuggestions('text', /^other$/, [])).toEqual({
        suggestions: [],
        hoveredSuggestionIndex: 0,
      });
    });
  });
  describe('initialize', () => {
    test('should return the default value', () => {
      expect(initialize()).toEqual({
        suggestions: [],
        hoveredSuggestionIndex: 0,
      });
    });
  });
  describe('getNewIndex', () => {
    test('should return 0 if the currentIndex is too big', () => {
      expect(getNewIndex(10, [1, 2, 3, 4, 5], 2)).toEqual(0);
    });
    test('should return currentIndex+1 instead', () => {
      expect(getNewIndex(2, [1, 2, 3, 4, 5, 6, 7], 5)).toEqual(3);
    });
  });
});
