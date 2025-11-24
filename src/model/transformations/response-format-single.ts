import {
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
} from '@/constants/pogues-constants';

import { remoteToState as codeListRemoteToState } from './codes-list';
import { stateToRemote as responseStateToRemote } from './response';

type RemoteResponseFormatSingle = {
  id: string;
  CodeListReference?: unknown;
  Datatype: {
    allowArbitraryResponse?: unknown;
    visualizationHint?: DATATYPE_VIS_HINT;
  };
  mandatory?: boolean;
}[];

export type StateResponseFormatSingle = {
  id: string;
  mandatory?: boolean;
  allowArbitraryResponse?: unknown;
} & (
  | {
      visHint: DATATYPE_VIS_HINT.SUGGESTER;
      [DEFAULT_NOMENCLATURE_SELECTOR_PATH]: { id: string };
    }
  | {
      visHint?:
        | DATATYPE_VIS_HINT.CHECKBOX
        | DATATYPE_VIS_HINT.RADIO
        | DATATYPE_VIS_HINT.DROPDOWN;
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: string };
    }
);

export function remoteToState(remote: {
  responses: RemoteResponseFormatSingle;
}): StateResponseFormatSingle {
  const {
    responses: [
      {
        Datatype: { allowArbitraryResponse, visualizationHint: visHint },
        mandatory,
        CodeListReference,
        id,
      },
    ],
  } = remote;

  // for suggester we handle a nomenclature, else a code list
  if (visHint === DATATYPE_VIS_HINT.SUGGESTER) {
    return {
      [DEFAULT_NOMENCLATURE_SELECTOR_PATH]:
        codeListRemoteToState(CodeListReference),
      id,
      mandatory,
      allowArbitraryResponse,
      visHint,
    };
  }

  return {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      codeListRemoteToState(CodeListReference),
    id,
    mandatory,
    allowArbitraryResponse,
    visHint,
  };
}

export function stateToRemote(
  state: StateResponseFormatSingle,
  collectedVariables: string[],
): { Response: RemoteResponseFormatSingle } {
  const { allowArbitraryResponse, visHint, mandatory, id } = state;

  let nomenclatureId;
  let codesListId;
  if (visHint === DATATYPE_VIS_HINT.SUGGESTER) {
    nomenclatureId = state[DEFAULT_NOMENCLATURE_SELECTOR_PATH]?.id;
  } else {
    codesListId = state[DEFAULT_CODES_LIST_SELECTOR_PATH]?.id;
  }

  return {
    Response: [
      responseStateToRemote({
        id,
        mandatory,
        allowArbitraryResponse,
        visHint,
        codesListId,
        nomenclatureId,
        typeName: DATATYPE_NAME.TEXT,
        maxLength: 1,
        collectedVariable: collectedVariables[0],
      }),
    ],
  };
}
