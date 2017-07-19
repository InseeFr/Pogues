import { DIMENSION_TYPE, DIMENSION_FORMATS, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import ResponseFormatSimple from './response-format-simple';
import ResponseFormatSingle from './response-format-single';

const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

export const defaultDimensionState = {
  type: undefined,
  mainDimensionFormat: undefined,
  label: undefined,
  totalLabel: undefined,
  codesList: undefined,
  numLinesMin: undefined,
  numLinesMax: undefined,
};

export const defaultDimensionModel = {
  dimensionType: '',
  dynamic: 0,
};

function parseDynamic(dynamic) {
  return dynamic.split('-').map(v => {
    return v.length > 0 ? parseInt(v, 10) : 0;
  });
}

function modelToState(model) {
  const { dimensionType: type, codeListReference: codesList, dynamic, label, totalLabel, response } = model;
  const dimensionData = {
    type,
    codesList,
    label,
    totalLabel,
  };

  if (type === PRIMARY) {
    if (dynamic === 0) {
      dimensionData.mainDimensionFormat = CODES_LIST;
    } else {
      dimensionData.mainDimensionFormat = LIST;
      const [numLinesMin, numLinesMax] = parseDynamic(dynamic);
      dimensionData.numLinesMin = numLinesMin;
      dimensionData.numLinesMax = numLinesMax;
    }
  } else if (type === MEASURE) {
    const { codeListReference, datatype: { typeName, type, visHint, ...data } } = response;
    if (codeListReference) {
      dimensionData[SINGLE_CHOICE] = ResponseFormatSingle.modelToState({ visHint, codesListId: codeListReference });
    } else {
      dimensionData[SIMPLE] = ResponseFormatSimple.modelToState({ type: typeName, ...data });
    }
  }
  return {
    ...defaultDimensionState,
    ...dimensionData,
  };
}

function stateToModel(state) {
  const { type, codesListId } = state;
  const model = {
    dimensionType: type,
  };

  if (type === PRIMARY) {
    model.codeListReference = codesListId;
  }
  // const model = {};
  //
  // if (state.type === PRIMARY && state.mainDimensionFormat === LIST) {
  //   model.dynamic = `${state.numLinesMin}-${state.numLinesMax}`;
  // } else {
  //   model.dynamic = 0;
  // }
  //
  // if (state.type !== undefined) model.dimensionType = state.type;
  // if (state.label !== undefined) model.label = state.label;
  // if (state.totalLabel !== undefined) model.totalLabel = state.totalLabel;
  // if (state.codesList !== undefined) model.codeListReference = state.codesList;
  //
  // return model;
  return {
    ...defaultDimensionModel,
    ...model,
  };
}

export default {
  modelToState,
  stateToModel,
};
