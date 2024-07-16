export function getPattern(value, caretPosition, substrToTheEnd = false) {
  let start = -1;
  let i = caretPosition;
  while (i >= 0 && start < 0) {
    if (value[i] === '$') {
      start = i;
    }
    i--;
  }

  return value
    .substring(start, substrToTheEnd ? undefined : caretPosition)
    .trim();
}

export function getStartValueWithSuggestion(caretCursor, fullText) {
  let start = -1;

  let i = caretCursor;
  while (i >= 0 && start < 0) {
    if (fullText[i] === '$') {
      start = i;
    }
    i--;
  }

  return start;
}

export function getValueWithSuggestion(suggestion, caretCursor, fullText) {
  const start = getStartValueWithSuggestion(caretCursor, fullText);
  const prefix = fullText.substr(0, start);
  const suffix = '';
  const prefixSeparator = '$';
  const suffixSeparator = suffix ? '$ ' : '$';
  return [
    ...prefix,
    prefixSeparator,
    suggestion,
    suffixSeparator,
    ...suffix.trimLeft(),
  ].join('');
}
