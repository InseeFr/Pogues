import {
  componentName,
  stripLeadingUnderscore,
  capitalize
} from './normalize-inputs';

describe('componentName', () => {
  test('should return the default value', () => {
    expect(componentName('value', 'previousValue', { label: 'label' })).toEqual(
      'value'
    );
  });
  test('should return the created value', () => {
    expect(componentName('', '', { label: 'label' })).toEqual('LABEL');
  });
});

describe('stripLeadingUnderscore', () => {
  test('should remove leading underscore', () => {
    expect(stripLeadingUnderscore('_this is a string')).toEqual('this');
  });
});

describe('capitalize', () => {
  test('should return a capitalized version of a string', () => {
    expect(capitalize('this is a string')).toEqual('This is a string');
  });
});
