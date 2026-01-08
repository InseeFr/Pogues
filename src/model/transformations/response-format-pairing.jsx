import { DEFAULT_CODES_LIST_SELECTOR_PATH } from '../../constants/pogues-constants';
import * as CodeList from './codes-list';

export function remoteToState(remote) {
  const {
    responses: [
      {
        Datatype: { visualizationHint: visHint },
        CodeListReference,
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
    sourceVariableReferences: {
      name: name || scope,
      gender,
      age,
    },
  };
}
