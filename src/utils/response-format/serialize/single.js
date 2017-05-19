import {
  DATATYPE_TYPE_FROM_NAME, UI_BEHAVIOUR
} from '../../../constants/pogues-constants'
import { QUESTION_TYPE_ENUM } from '../../../constants/schema'
import {  
  emptyTextDatatype
} from '../../../reducers/datatype-utils' 
const { FIRST_INTENTION } = UI_BEHAVIOUR
const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM

export default function singleResponseFormat(format, mandatory, updateSpec) {
  const { codeListReference, visHint,
    hasSpecialCode, specialLabel, specialCode, specialUiBehaviour,
    specialFollowUpMessage
   } = format
  let special 
  if (hasSpecialCode) {
    special = {
      Value: specialCode,
      Label: specialLabel,
      firstIntentionDisplay: specialUiBehaviour === FIRST_INTENTION,
      Invite: specialFollowUpMessage
    }
  }
  const response = {
    // `codeListReference` and `visHint`
    codeListReference: updateSpec(codeListReference),
    mandatory,
    datatype: {
      //no information held by the datatype except for the
      //VisualizationHint ; by default we use a `TextDatatypeType` (
      //`DatatypeType` is an abstract type in the model).
      ...emptyTextDatatype,
      type: DATATYPE_TYPE_FROM_NAME[emptyTextDatatype.typeName],
      visHint
    }
  }
  if (hasSpecialCode) response.NonResponseModality = special  
  return {
    questionType: SINGLE_CHOICE,
    responses: [response]
  }
}