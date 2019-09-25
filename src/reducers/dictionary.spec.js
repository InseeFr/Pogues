import Dictionary, { getLocale } from './dictionary';

describe('Dictionary', () => {
  test('should return the frech message', () => {
    expect(Dictionary().questionnaireValid).toEqual(
      'Your questionnaire is valid',
    );
  });
});
describe('getLocale', () => {
  test('should return the frech message', () => {
    expect(getLocale()).toEqual('en');
  });
});
