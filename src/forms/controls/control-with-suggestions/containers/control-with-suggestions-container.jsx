import withCurrentFormVariables from 'hoc/with-current-form-variables';

import InputWithSuggestions from '../components/input-with-suggestions';
import TextareaWithSuggestions from '../components/textarea-with-suggestions';
import RichTextareaWithSuggestions from '../components/rich-textarea-with-suggestions';

export const InputWithSuggestionsContainer =
  withCurrentFormVariables(InputWithSuggestions);
export const TextareaWithSuggestionsContainer = withCurrentFormVariables(
  TextareaWithSuggestions,
);
export const RichTextareaWithSuggestionsContainer = withCurrentFormVariables(
  RichTextareaWithSuggestions,
);
