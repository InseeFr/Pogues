import * as CodeList from './codes-list';

import {
  UI_BEHAVIOUR,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';

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
    scope,
  } = remote;
  return {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      CodeList.remoteToState(CodeListReference),
    id,
    mandatory,
    scope,
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
