/**
 *  Mapping between constants and dictionary entries
 *
 * It is risky to use constants (ie constants defined in `pogues-constants`) to
 * refer to entries in dictionary ; this intermediate mapping adds some
 * boilerplate, but it shows more clearly what objects are : a constant or an
 * entry in the dictionary. Plus, constants are not guaranteed unique, they
 * have a meaning in a dedicated scope (for example, as a result structure
 * type), but we could have the same value used elsewhere in `pogues-constants`
 * to represent another kind of concept.
**/
import {
  UI_BEHAVIOUR as uiBhvrCst,
  DECLARATION_POSITION as dclPostCst
} from '../constants/pogues-constants'
import {
  QUESTION_TYPE_ENUM as respFormCst
} from '../constants/schema'

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = respFormCst
const { FIRST_INTENTION, SECOND_INTENTION } = uiBhvrCst
const {
  AFTER_QUESTION_TEXT, AFTER_RESPONSE, BEFORE_QUESTION_TEXT, DETACHABLE
} = dclPostCst

export const QUESTION_TYPE_ENUM = {
  [SIMPLE]: 'responseFormatSimple',
  [SINGLE_CHOICE]: 'responseFormatSingle',
  [MULTIPLE_CHOICE]: 'responseFormatMultiple',
  [TABLE]: 'responseFormatTable'
}

export const UI_BEHAVIOUR = {
  [FIRST_INTENTION]: 'rankUiBehaviour1',
  [SECOND_INTENTION]: 'rankUiBehaviour2'
}

export const DECLARATION_POS = {
  [AFTER_QUESTION_TEXT]: 'dclPosAfterQuestion',
  [AFTER_RESPONSE]: 'dclPosAfterAnswer',
  [BEFORE_QUESTION_TEXT]: 'dclPosBeforeText',
  [DETACHABLE]: 'dclPosDetachable'
}

export const DATATYPE_VIS_HINT = {
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  DROPDOWN: 'dropdown'
}
