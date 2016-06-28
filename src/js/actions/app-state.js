// View (we should use react router instead)
export const SWITCH_TO_QUESTIONNAIRE = 'SWITCH_TO_QUESTIONNAIRE'
export const SWITCH_TO_PICKER = 'SWITCH_TO_PICKER'
export const SWITCH_TO_CONFIG = 'SWITCH_TO_CONFIG'
export const TOGGLE_SHOW_CONTROLS = 'TOGGLE_SHOW_CONTROLS'

export const switchToQuestionnaire = id => (
  {
    type: SWITCH_TO_QUESTIONNAIRE,
    payload: id
  }
)

export const switchToPicker = () => (
  {
    type: SWITCH_TO_PICKER
  }
)

export const switchToConfig = () => (
  {
    type: SWITCH_TO_CONFIG
  }
)

export const toggleShowControls = () => ({
  type: TOGGLE_SHOW_CONTROLS
})