/**
 * These actions are defined in order to track the current input with the focus. We use
 * this information when we need to hide the autocomplete block whan the inputis unfocused
 */
export function setFocusedInput(state, input, meta) {
  return {
    ...state,
    focusedInput: meta.field
  };
}

export default {
    '@@redux-form/FOCUS': setFocusedInput,
}