import {
  CHOICE_TYPE,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';
import * as CodeList from './codes-list';

export function remoteToState(remote) {
  const {
    responses: [
      {
        Datatype: { visualizationHint: visHint },
        CodeListReference,
        choiceType,
        id,
      },
    ],
    sourceVariableReferences,
    scope, // deprecated
  } = remote;
  const { name, gender, age } = sourceVariableReferences ?? {};

  return {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      CodeList.remoteToState(CodeListReference),
    id,
    visHint,
    choiceType: choiceType ? choiceType : CHOICE_TYPE.CODE_LIST,
    sourceVariableReferences: {
      name: name || scope,
      gender,
      age,
    },
  };
}
