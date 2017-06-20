export function required(value) {
  return value ? undefined : 'Required';
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
  return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
}

export function minValue(min) {
  return function(value) {
    return value && value < min ? `Must be at least ${min}` : undefined;
  };
}

export function minValue18() {
  return minValue(18);
}

export function email(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
}
