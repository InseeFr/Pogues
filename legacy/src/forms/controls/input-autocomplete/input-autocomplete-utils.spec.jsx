import { describe, expect, test, vi } from 'vitest';

import {
  clearSuggestions,
  init,
  moveDown,
  moveUp,
  setSuggestions,
  updateSelectedOption,
} from './input-autocomplete-utils';

describe('Form controls - Input autocomplete - Utils', () => {
  const options = [
    { label: 'This is a dog', value: 'THISISADOG' },
    { label: 'This is a cat', value: 'THISISACAT' },
    { label: 'This is a horse developer', value: 'THISISAHORSE' },
    { label: 'This is a bird', value: 'THISISABIRD' },
    { label: 'This is a snake developer', value: 'THISISASNAKE' },
    { label: 'This is a developer', value: 'THISISADEVELOPER' },
  ];

  test('clearSuggestions', () => {
    expect(clearSuggestions()).toEqual({
      suggestions: [],
      indexActiveSuggestion: undefined,
    });
  });

  test('setSuggestions', () => {
    const getOptionLabel = (label) => {
      return label;
    };
    const getOptionName = (label, name) => {
      return name;
    };
    expect(setSuggestions('', options, getOptionLabel, 10)).toEqual({
      suggestions: [],
      indexActiveSuggestion: 0,
      inputSearch: '',
    });
    expect(setSuggestions('dog', options, getOptionLabel, 10)).toEqual({
      suggestions: [options[0]],
      indexActiveSuggestion: 0,
      inputSearch: 'dog',
    });
    expect(setSuggestions('developer', options, getOptionLabel, 10)).toEqual({
      suggestions: [options[2], options[4], options[5]],
      indexActiveSuggestion: 0,
      inputSearch: 'developer',
    });
    expect(setSuggestions('THISISADOG', options, getOptionName, 2)).toEqual({
      suggestions: [options[0]],
      indexActiveSuggestion: 0,
      inputSearch: 'THISISADOG',
    });
  });

  test('moveDown', () => {
    const lastIndex = options.length - 1;
    expect(moveDown(options)).toEqual({});
    expect(moveDown(options, 0)).toEqual({ indexActiveSuggestion: 1 });
    expect(moveDown(options, lastIndex)).toEqual({
      indexActiveSuggestion: lastIndex,
    });
  });

  test('moveUp', () => {
    expect(moveUp()).toEqual({});
    expect(moveUp(2, options)).toEqual({ indexActiveSuggestion: 1 });
    expect(moveUp(0, options)).toEqual({ indexActiveSuggestion: 0 });
  });

  test('updateSelectedOption', () => {
    const spyOnChange = vi.fn();

    updateSelectedOption(options, spyOnChange);
    expect(spyOnChange).not.toHaveBeenCalled();

    updateSelectedOption(options, spyOnChange, options.length);
    expect(spyOnChange).not.toHaveBeenCalled();

    updateSelectedOption(options, spyOnChange, 0);
    expect(spyOnChange).toHaveBeenCalledWith(options[0].value);
  });

  test('init', () => {
    expect(init(options, 'NOT_EXISTING_VALUE')).toEqual({
      suggestions: [],
      options: options,
      indexActiveSuggestion: undefined,
      inputSearch: '',
      indexSelectedOption: undefined,
      showSuggestions: true,
    });
    expect(init(options, 'THISISACAT')).toEqual({
      suggestions: [],
      options: options,
      indexActiveSuggestion: undefined,
      inputSearch: 'This is a cat',
      indexSelectedOption: 1,
      showSuggestions: true,
    });
  });
});
