import withCurrentFormVariables from '../../../../hoc/with-current-form-variables';
import InputWithSuggestions from '../components/input-with-suggestions';
import RichEditor from '../components/rich-editor';
import RichTextareaWithSuggestions from '../components/rich-textarea-with-suggestions';
import SimpleEditor from '../components/simple-editor';
import TextareaWithSuggestions from '../components/textarea-with-suggestions';

export const InputWithSuggestionsContainer =
  withCurrentFormVariables(InputWithSuggestions);
export const TextareaWithSuggestionsContainer = withCurrentFormVariables(
  TextareaWithSuggestions,
);
export const RichTextareaWithSuggestionsContainer = withCurrentFormVariables(
  RichTextareaWithSuggestions,
);

export const RichEditorContainer = withCurrentFormVariables(RichEditor);

export const SimpleEditorContainer = withCurrentFormVariables(SimpleEditor);
