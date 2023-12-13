import { markdownVtlToString } from './controls/rich-textarea';

const rNameNeg = /[^a-z0-9_]/gi;

export function componentName(value, previousValue, allValues) {
  const label = markdownVtlToString(allValues.label || '');
  if (
    value.length === 0 &&
    previousValue.length === 0 &&
    label &&
    label.length > 0
  ) {
    value = label.replace(rNameNeg, '').toUpperCase().slice(0, 10);
  }

  return value;
}

export function stripLeadingUnderscore(stringToStrip) {
  return /_(\w+)/.exec(stringToStrip).pop();
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
