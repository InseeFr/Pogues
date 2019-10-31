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

export function getValueWithSuggestion(suggestion, caretCursor, fullText) {
  
  let start = -1;
  let end = -1;

  let i = caretCursor;
  while (i >= 0 && start < 0) {
    if (fullText[i] === '$') {
      start = i;
    }
    i--;
  }
  i = caretCursor - 1;
  while (i <= fullText.length && end < 0) {
    if (fullText[i] === '$') {
      end = i;
    } else if (fullText[i] === ' ') {
      end = i - 1;
    }
    i++;
  }

  if (end < 0) {
    end = fullText.length;
  }

  const prefix = fullText.substr(0, start - 1);
  const suffix = fullText.substr(end + 1, fullText.length);
  const prefixSeparator = prefix ? ' $' : '$';
  const suffixSeparator = suffix ? '$ ' : '$';

  return [
    ...prefix,
    prefixSeparator,
    suggestion,
    suffixSeparator,
    ...suffix.trimLeft(),
  ].join('');
}

export function getStartValueWithSuggestion(caretCursor, fullText) {
  
  let start = -1;
  let end = -1;

  let i = caretCursor;
  while (i >= 0 && start < 0) {
    if (fullText[i] === '$') {
      start = i;
    }
    i--;
  }
  i = caretCursor - 1;
  while (i <= fullText.length && end < 0) {
    if (fullText[i] === '$') {
      end = i;
    } else if (fullText[i] === ' ') {
      end = i - 1;
    }
    i++;
  }

  if (end < 0) {
    end = fullText.length;
  }


  return start;
}
