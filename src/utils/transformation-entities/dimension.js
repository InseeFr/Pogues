import { DIMENSION_TYPE } from 'constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;

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

function stateToModel(state) {
  const { type, codesListId, numLinesMin, numLinesMax, showTotalLabel, totalLabel, label } = state;
  const model = {
    dimensionType: type,
  };

  if (type === PRIMARY || type === SECONDARY) {
    if (codesListId) model.codeListReference = codesListId;
    if (showTotalLabel && totalLabel) model.totalLabel = totalLabel;
    if (numLinesMin !== undefined && numLinesMax !== undefined) model.dynamic = `${numLinesMin}-${numLinesMax}`;
  }

  if (type === MEASURE && label) {
    model.label = label;
  }

  return {
    ...defaultDimensionModel,
    ...model,
  };
}

export default {
  stateToModel,
};
