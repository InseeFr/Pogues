import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { emptyFormat, defaultSpecial } from '../parse-format-utils';
import { UI_BEHAVIOUR } from 'constants/pogues-constants';

const { FIRST_INTENTION, SECOND_INTENTION } = UI_BEHAVIOUR;
const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

export default function parseSingle(responses) {
  // There should be only one response
  // TODO throw error if more than one response
  const response = responses[0];
  const { codeListReference, datatype: { visHint }, mandatory } = response;
  let special = defaultSpecial;
  if (Object.hasOwnProperty.call(response, 'NonResponseModality')) {
    const { Value, Label, firstIntentionDisplay, Invite } = response.NonResponseModality;
    special = {
      ...special,
      hasSpecialCode: true,
      specialCode: Value,
      specialLabel: Label,
      specialUiBehaviour: firstIntentionDisplay ? FIRST_INTENTION : SECOND_INTENTION,
      specialFollowUpMessage: Invite,
    };
  }
  return {
    ...emptyFormat,
    type: SINGLE_CHOICE,
    mandatory: mandatory || false, // ensure compatibility with old qrs
    [SINGLE_CHOICE]: {
      codeListReference: codeListReference || '',
      visHint,
      ...special,
    },
  };
}
