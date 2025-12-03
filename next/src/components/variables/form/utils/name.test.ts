import { convertToScreamingCamelCase, screamingCamelCaseRegex } from './name';

it('SCREAMING_CAMEL_CASE regexp is valid', () => {
  const re = new RegExp(screamingCamelCaseRegex);
  // Valid names
  expect(re.exec('VAR')).not.toBeNull();
  expect(re.exec('MY_VAR')).not.toBeNull();
  expect(re.exec('MY_VAR1')).not.toBeNull();
  expect(re.exec('MY_VAR_1')).not.toBeNull();
  // Invalid names
  expect(re.exec('_VAR')).toBeNull();
  expect(re.exec('MY_')).toBeNull();
  expect(re.exec('MY VAR')).toBeNull();
  expect(re.exec('MY-VAR')).toBeNull();
  expect(re.exec('var')).toBeNull();
  expect(re.exec('1')).toBeNull();
  expect(re.exec('1VAR')).toBeNull();
});

it('converts to SCREAMING_CAMEL_CASE', () => {
  // Valid values that should not be changed
  expect(convertToScreamingCamelCase('VAR')).toBe('VAR');
  expect(convertToScreamingCamelCase('MY_VAR')).toBe('MY_VAR');
  expect(convertToScreamingCamelCase('MY_VAR1')).toBe('MY_VAR1');
  expect(convertToScreamingCamelCase('MY_VAR_1')).toBe('MY_VAR_1');
  // Invalid values
  expect(convertToScreamingCamelCase('var')).toBe('VAR');
  expect(convertToScreamingCamelCase('my_var')).toBe('MY_VAR');
  expect(convertToScreamingCamelCase('my-var')).toBe('MY_VAR');
});
