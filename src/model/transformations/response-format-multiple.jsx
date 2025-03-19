import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../constants/pogues-constants';
import * as CodeList from './codes-list';
import * as Dimension from './dimension';
import * as Responses from './responses';

const { BOOLEAN, TEXT } = DATATYPE_NAME;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;

function getDimension(type, dimensions) {
  const result = dimensions.filter((d) => {
    return d.dimensionType === type;
  });
  return result.length > 0 ? result[0] : {};
}

export function remoteToState(remote) {
  const {
    dimensions,
    responses: [
      {
        Datatype: { typeName: type, visualizationHint: visHint },
        CodeListReference,
      },
    ],
  } = remote;
  const primaryDimension = getDimension(PRIMARY, dimensions);

  const state = {
    [PRIMARY]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodeList.remoteToState(
        primaryDimension.CodeListReference,
      ),
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
        [DEFAULT_CODES_LIST_SELECTOR_PATH]:
          CodeList.remoteToState(CodeListReference),
        visHint,
      },
    };
  }

  return state;
}

export function stateToRemote(
  state,
  collectedVariables,
  collectedVariablesStore,
  response,
) {
  const {
    [PRIMARY]: primaryState,
    [MEASURE]: { type: typeMeasure, [typeMeasure]: measureState },
  } = state;
  const dimensionsModel = [];
  let responseState;

  dimensionsModel.push(
    Dimension.stateToRemote({ ...primaryState, type: PRIMARY }),
  );
  dimensionsModel.push(Dimension.stateToRemote({ type: MEASURE }));

  if (typeMeasure === CODES_LIST) {
    const {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
      visHint,
    } = measureState;
    responseState = {
      codesListId,
      typeName: TEXT,
      visHint,
      maxLength: 1,
    };
  } else {
    responseState = { typeName: BOOLEAN };
  }

  const responsesModel = Responses.stateToModel(
    responseState,
    collectedVariables,
    collectedVariablesStore,
    QUESTION_TYPE_ENUM.MULTIPLE_CHOICE,
    response,
  );
  return {
    Dimension: dimensionsModel,
    ...responsesModel,
  };
}
