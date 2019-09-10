export function updateSuggestions(text, regex, availableSuggestions) {
  const matches = text.match(regex);
  let suggestions = [];

  if (matches) {
    suggestions = availableSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(matches[1].toLocaleLowerCase()),
    );
  }

  return { suggestions, hoveredSuggestionIndex: 0 };
}

export function initialize() {
  return { suggestions: [], hoveredSuggestionIndex: 0 };
}

export function getNewIndex(currentIndex, suggestions, numSuggestionsShown) {
  return currentIndex < suggestions.slice(0, numSuggestionsShown).length - 1
    ? currentIndex + 1
    : 0;
}
