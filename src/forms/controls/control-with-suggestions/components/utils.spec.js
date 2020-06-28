import { getPattern, getValueWithSuggestion } from './utils';

describe('getPattern', () => {
  test('if substrToTheEnd = true, should return the rest of the string', () => {
    const value = 'voici un $t message';
    const caretPosition = 11;
    const substrToTheEnd = true;
    expect(getPattern(value, caretPosition, substrToTheEnd)).toBe('$t message');
  });

  test('should return the token from the $ until the last characters before the cursor position', () => {
    const value = 'voici un $t message';
    const caretPosition = 11;
    const substrToTheEnd = false;
    expect(getPattern(value, caretPosition, substrToTheEnd)).toBe('$t');
  });
});

describe('getValueWithSuggestion', () => {
  test('if we do not find an ending characters, we should talk of the rest of the string', () => {
    const suggestion = 'suggestion';
    const caretPosition = 11;
    const fullText = 'voici un $blablabla';
    expect(getValueWithSuggestion(suggestion, caretPosition, fullText)).toBe(
      'voici un $suggestion$',
    );
  });

  test('if the ending character is an blank, should insert before', () => {
    const suggestion = 'suggestion';
    const caretPosition = 11;
    const fullText = 'voici un $blablabla message';
    expect(getValueWithSuggestion(suggestion, caretPosition, fullText)).toBe(
      'voici un $suggestion$',
    );
  });

  test('if the ending character is $, it should be removed', () => {
    const suggestion = 'suggestion';
    const caretPosition = 11;
    const fullText = 'voici un $blablabla$ message';
    expect(getValueWithSuggestion(suggestion, caretPosition, fullText)).toBe(
      'voici un $suggestion$',
    );
  });

  test('if there is text before $, it should not be removed', () => {
    const suggestion = 'suggestion';
    const caretPosition = 11;
    const fullText = 'here $sug';
    expect(getValueWithSuggestion(suggestion, caretPosition, fullText)).toBe(
      'here $suggestion$',
    );
  });

  test('if there is no prefix, the first $ should not be removed and if there is no sufix, the second $ should not be removed', () => {
    const suggestion = 'suggestion';
    const caretPosition = 11;
    const fullText = '$sug';
    expect(getValueWithSuggestion(suggestion, caretPosition, fullText)).toBe(
      '$suggestion$',
    );
  });
});
