import withCurrentFormVariables from 'hoc/with-current-form-variables';

import {
  InputWithSuggestions,
  TextareaWithSuggestions,
  RichTextareaWithSuggestions,
  RichEditor,
} from '../components';

export const InputWithSuggestionsContainer =
  withCurrentFormVariables(InputWithSuggestions);
export const TextareaWithSuggestionsContainer = withCurrentFormVariables(
  TextareaWithSuggestions,
);
export const RichTextareaWithSuggestionsContainer = withCurrentFormVariables(
  RichTextareaWithSuggestions,
);

export const RichEditorContainer = withCurrentFormVariables(RichEditor);
