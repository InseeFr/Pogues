import { markdownToRaw } from 'layout/forms/controls/rich-textarea';

const rNameNeg = /[^a-z0-9_]/gi;

export function componentName(value, previousValue, allValues) {
  const rawLabel = markdownToRaw(allValues.label || '').blocks[0].text;
  console.log(previousValue)
  console.log(value)
  console.log(rawLabel)
  if (value.length === 0 && previousValue.length === 0 && rawLabel && rawLabel.length > 0) {
    value = rawLabel.replace(rNameNeg, '').toUpperCase().slice(0, 10);
  }

  return value;
}

export function stripLeadingUnderscore(stringToStrip) {
  return /_(\w+)/.exec(stringToStrip).pop();
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
