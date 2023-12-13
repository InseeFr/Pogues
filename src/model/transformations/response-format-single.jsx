import * as Response from './response';
import * as CodeList from './codes-list';

import {
  UI_BEHAVIOUR,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

export function remoteToState(remote) {
  const {
    responses: [
      {
        Datatype: { visualizationHint: visHint },
        mandatory,
        nonResponseModality,
        CodeListReference,
        id,
      },
    ],
  } = remote;

  return {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      CodeList.remoteToState(CodeListReference),
    id,
    mandatory,
    visHint,
    hasSpecialCode: !!nonResponseModality,
    specialLabel:
      nonResponseModality !== undefined ? nonResponseModality.label : '',
    specialCode:
      nonResponseModality !== undefined ? nonResponseModality.value : '',
    specialUiBehaviour:
      nonResponseModality && !nonResponseModality.firstIntentionDisplay
        ? UI_BEHAVIOUR.SECOND_INTENTION
        : UI_BEHAVIOUR.FIRST_INTENTION,
    specialFollowUpMessage: nonResponseModality
      ? nonResponseModality.invite
      : '',
  };
}

export function stateToRemote(state, collectedVariables) {
  const {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
    visHint,
    mandatory,
    id,
  } = state;
  return {
    Response: [
      Response.stateToRemote({
        id,
        mandatory,
        visHint,
        codesListId,
        typeName: TEXT,
        maxLength: 1,
        pattern: '',
        collectedVariable: collectedVariables[0],
      }),
    ],
  };
}
