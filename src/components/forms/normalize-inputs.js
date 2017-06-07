const rNameNeg = /[^a-z0-9_]/gi;

export function questionnaireName(value, previousValue, allValues) {
  if (value.length === 0 && allValues.label && allValues.label.length > 0) {
    value = allValues.label.replace(rNameNeg, '').toUpperCase().slice(0, 10);
  }

  return value;
}

export function stripLeadingUnderscore(stringToStrip) {
  return /_(\w+)/.exec(stringToStrip).pop();
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
