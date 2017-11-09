import * as CodeList from './codes-list';
import * as Dimension from './dimension';
import * as Response from './response';

import {
  DATATYPE_NAME,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';

const { BOOLEAN, TEXT } = DATATYPE_NAME;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;

function getDimension(type, dimensions) {
  const result = dimensions.filter(d => {
    return d.dimensionType === type;
  });
  return result.length > 0 ? result[0] : {};
}

export function remoteToState(remote) {
  const {
    dimensions,
    responses: [{ Datatype: { typeName: type, visualizationHint: visHint }, CodeListReference }],
  } = remote;
  const primaryDimension = getDimension(PRIMARY, dimensions);

  const state = {
    [PRIMARY]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodeList.remoteToState(primaryDimension.CodeListReference),
    },
    [MEASURE]: {},
  };

  if (type === BOOLEAN) {
    state[MEASURE] = {
      type: BOOL,
      [BOOL]: {},
    };
  } else {
    state[MEASURE] = {
      type: CODES_LIST,
      [CODES_LIST]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodeList.remoteToState(CodeListReference),
        visHint,
      },
    };
  }

  return state;
}

export function stateToRemote(state, collectedVariables, codesListsStore) {
  const { [PRIMARY]: primaryState, [MEASURE]: { type: typeMeasure, [typeMeasure]: measureState } } = state;
  const dimensions = [];
  const responses = [];
  const codesListState = codesListsStore[primaryState[DEFAULT_CODES_LIST_SELECTOR_PATH].id] || {};
  const numCodes = Object.keys(codesListState.codes || {}).length;
  let responseState;

  dimensions.push(Dimension.stateToRemote({ ...primaryState, type: PRIMARY }));
  dimensions.push(Dimension.stateToRemote({ type: MEASURE }));

  if (typeMeasure === CODES_LIST) {
    const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId }, visHint } = measureState;
    responseState = {
      codesListId,
      typeName: TEXT,
      visHint,
      maxLength: 1,
      pattern: '',
    };
  } else {
    responseState = { typeName: BOOLEAN };
  }

  for (let i = 0; i < numCodes; i += 1) {
    responses.push(Response.stateToRemote({ ...responseState, collectedVariable: collectedVariables[i] || '' }));
  }

  return {
    Dimension: dimensions,
    Response: responses,
  };
}
