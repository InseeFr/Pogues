import { convertToScreamingSnakeCase, screamingSnakeCaseRegex } from './name';

it('SCREAMING_SNAKE_CASE regexp is valid', () => {
  const re = new RegExp(screamingSnakeCaseRegex);
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

it('converts to SCREAMING_SNAKE_CASE', () => {
  // Valid values that should not be changed
  expect(convertToScreamingSnakeCase('VAR')).toBe('VAR');
  expect(convertToScreamingSnakeCase('MY_VAR')).toBe('MY_VAR');
  expect(convertToScreamingSnakeCase('MY_VAR1')).toBe('MY_VAR1');
  expect(convertToScreamingSnakeCase('MY_VAR_1')).toBe('MY_VAR_1');
  // Invalid values
  expect(convertToScreamingSnakeCase('var')).toBe('VAR');
  expect(convertToScreamingSnakeCase('my_var')).toBe('MY_VAR');
  expect(convertToScreamingSnakeCase('my-var')).toBe('MY_VAR');
});
