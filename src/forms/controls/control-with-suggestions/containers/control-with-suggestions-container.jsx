import withCurrentFormVariables from 'hoc/withCurrentFormVariables';

import InputWithSuggestions from '../components/input-with-suggestions';
import TextareaWithSuggestions from '../components/textarea-with-suggestions';

export const InputWithSuggestionsContainer = withCurrentFormVariables(InputWithSuggestions);
export const TextareaWithSuggestionsContainer = withCurrentFormVariables(TextareaWithSuggestions);
