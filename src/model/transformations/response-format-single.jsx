import {
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
} from '../../constants/pogues-constants';
import * as CodeList from './codes-list';
import * as Response from './response';

const { TEXT } = DATATYPE_NAME;

export function remoteToState(remote) {
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
  const listType =
    visHint === DATATYPE_VIS_HINT.SUGGESTER
      ? DEFAULT_NOMENCLATURE_SELECTOR_PATH
      : DEFAULT_CODES_LIST_SELECTOR_PATH;

  return {
    [listType]: CodeList.remoteToState(CodeListReference),
    id,
    mandatory,
    allowArbitraryResponse,
    visHint,
  };
}

export function stateToRemote(state, collectedVariables) {
  const { allowArbitraryResponse, visHint, mandatory, id } = state;

  const codesList = state[DEFAULT_CODES_LIST_SELECTOR_PATH] || {};
  const nomenclature = state[DEFAULT_NOMENCLATURE_SELECTOR_PATH] || {};

  return {
    Response: [
      Response.stateToRemote({
        id,
        mandatory,
        allowArbitraryResponse,
        visHint,
        codesListId: codesList.id,
        nomenclatureId: nomenclature.id,
        typeName: TEXT,
        maxLength: 1,
        collectedVariable: collectedVariables[0],
      }),
    ],
  };
}
