export function clearSuggestions() {
  return {
    suggestions: [],
    indexActiveSuggestion: undefined,
  };
}

export function setSuggestions(
  withText,
  options,
  getOptionLabel,
  numSuggestionsShown,
  caseSensitive,
) {
  let filteredSuggestions = [];

  if (withText !== '') {
    const flags = caseSensitive ? 'g' : 'gi';
    const regEx = new RegExp(withText, flags);
    filteredSuggestions = options
      .filter(o => getOptionLabel(o.label, o.value).search(regEx) !== -1)
      .splice(0, numSuggestionsShown);
  }

  return {
    suggestions: filteredSuggestions,
    indexActiveSuggestion: 0,
    inputSearch: withText,
  };
}

export function init(options, value) {
  const indexSelectedOption = options.map(o => o.value).indexOf(value);
  const selectedOption = options[indexSelectedOption] || {};

  return {
    suggestions: [],
    options: options,
    indexActiveSuggestion: undefined,
    inputSearch: selectedOption.label || '',
    indexSelectedOption:
      indexSelectedOption !== -1 ? indexSelectedOption : undefined,
    showSuggestions: true,
  };
}

export function moveDown(suggestions, indexActiveSuggestion) {
  let state = {};

  if (indexActiveSuggestion !== undefined) {
    const newIndexActiveSuggestion =
      indexActiveSuggestion === suggestions.length - 1
        ? suggestions.length - 1
        : indexActiveSuggestion + 1;

    state = { indexActiveSuggestion: newIndexActiveSuggestion };
  }

  return state;
}

export function moveUp(indexActiveSuggestion) {
  let state = {};

  if (indexActiveSuggestion !== undefined) {
    const newIndexActiveSuggestion =
      indexActiveSuggestion > 0 ? indexActiveSuggestion - 1 : 0;

    state = { indexActiveSuggestion: newIndexActiveSuggestion };
  }

  return state;
}

export function updateSelectedOption(
  suggestions,
  onChange,
  indexActiveSuggestion,
) {
  const activeSuggestion =
    indexActiveSuggestion !== undefined && suggestions[indexActiveSuggestion];

  if (activeSuggestion) {
    onChange(activeSuggestion.value);
  }
}
