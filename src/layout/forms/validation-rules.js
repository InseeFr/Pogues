import Dictionary from 'utils/dictionary/dictionary';

export function required(value = '') {
  const val = value.trim ? value.trim().replace(/[^\w\s]/gi, '') : value;

  if (typeof val === 'string' || val instanceof String) {
    return val.length > 0 ? undefined : Dictionary.validationRequired;
  }
  return val ? undefined : Dictionary.validationRequired;
}

export function maxLength(max) {
  return function(value) {
    return value && value.length > max ? `Must be ${max} characters or less` : undefined;
  };
}

export function maxLength15() {
  return maxLength(15);
}

export function number(value) {
  return value && isNaN(Number(value)) ? Dictionary.validationNumber : undefined;
}

export function minValue(min) {
  return function(value) {
    return value && value < min ? `${Dictionary.validationMinNumber} ${min}` : undefined;
  };
}

export function minValue18() {
  return minValue(18);
}

export function email(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
}
