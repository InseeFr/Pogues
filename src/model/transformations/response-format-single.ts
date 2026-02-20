import {
  CHOICE_TYPE,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
  DEFAULT_VARIABLE_SELECTOR_PATH,
} from '@/constants/pogues-constants';

import { remoteToState as codeListRemoteToState } from './codes-list';
import { stateToRemote as responseStateToRemote } from './response';

type RemoteResponseFormatSingle = {
  id: string;
  CodeListReference?: unknown;
  VariableReference?: unknown;
  choiceType?:
    | CHOICE_TYPE.CODE_LIST
    | CHOICE_TYPE.SUGGESTER
    | CHOICE_TYPE.VARIABLE;
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
  choiceType?:
    | CHOICE_TYPE.CODE_LIST
    | CHOICE_TYPE.SUGGESTER
    | CHOICE_TYPE.VARIABLE;
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
  | {
      visHint?: // Filter based on lunatic new components ?
      | DATATYPE_VIS_HINT.CHECKBOX
        | DATATYPE_VIS_HINT.RADIO
        | DATATYPE_VIS_HINT.DROPDOWN;
      [DEFAULT_VARIABLE_SELECTOR_PATH]: { id: string };
    }
);

export function remoteToState(remote: {
  responses: RemoteResponseFormatSingle;
}): StateResponseFormatSingle {
  const {
    responses: [
      {
        Datatype: { allowArbitraryResponse, visualizationHint: visHint },
        choiceType,
        mandatory,
        CodeListReference,
        VariableReference,
        id,
      },
    ],
  } = remote;

  const baseState = {
    id,
    mandatory,
    allowArbitraryResponse,
    choiceType,
  };

  // for suggester we handle a nomenclature, else a code list
  if (choiceType === CHOICE_TYPE.SUGGESTER) {
    return {
      ...baseState,
      [DEFAULT_NOMENCLATURE_SELECTOR_PATH]:
        codeListRemoteToState(CodeListReference),
      visHint: DATATYPE_VIS_HINT.SUGGESTER,
    };
  }
  if (
    choiceType === CHOICE_TYPE.VARIABLE &&
    visHint !== DATATYPE_VIS_HINT.SUGGESTER
  ) {
    return {
      ...baseState,
      [DEFAULT_VARIABLE_SELECTOR_PATH]: { id: VariableReference as string },
      visHint,
    };
  }

  if (
    choiceType !== CHOICE_TYPE.CODE_LIST &&
    visHint !== DATATYPE_VIS_HINT.SUGGESTER
  ) {
    return {
      ...baseState,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        codeListRemoteToState(CodeListReference),
      visHint,
    };
  }
  // fallback
  return {
    ...baseState,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      codeListRemoteToState(CodeListReference),
    visHint: visHint === DATATYPE_VIS_HINT.SUGGESTER ? undefined : visHint,
  };
}

export function stateToRemote(
  state: StateResponseFormatSingle,
  collectedVariables: string[],
): { Response: RemoteResponseFormatSingle } {
  const { allowArbitraryResponse, visHint, mandatory, id, choiceType } = state;

  let nomenclatureId;
  let codesListId;
  let variableReferenceId;

  if (
    choiceType === CHOICE_TYPE.SUGGESTER &&
    DEFAULT_NOMENCLATURE_SELECTOR_PATH in state
  ) {
    nomenclatureId = state[DEFAULT_NOMENCLATURE_SELECTOR_PATH]?.id;
  } else if (
    choiceType === CHOICE_TYPE.VARIABLE &&
    DEFAULT_VARIABLE_SELECTOR_PATH in state
  ) {
    variableReferenceId = state[DEFAULT_VARIABLE_SELECTOR_PATH]?.id;
  } else if (
    choiceType === CHOICE_TYPE.CODE_LIST &&
    DEFAULT_CODES_LIST_SELECTOR_PATH in state
  ) {
    codesListId = state[DEFAULT_CODES_LIST_SELECTOR_PATH]?.id;
  }
  return {
    Response: [
      responseStateToRemote({
        id,
        mandatory,
        allowArbitraryResponse,
        visHint,
        choiceType,
        codesListId,
        nomenclatureId,
        variableReferenceId,
        typeName: DATATYPE_NAME.TEXT,
        maxLength: 1,
        collectedVariable: collectedVariables[0],
      }),
    ],
  };
}
