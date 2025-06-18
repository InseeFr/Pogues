import maxBy from 'lodash.maxby';

import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_CALCULATION,
  DIMENSION_FORMATS,
  DIMENSION_LENGTH,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../constants/pogues-constants';
import { hasChild } from '../../utils/codes-lists/codes-lists-utils';
import { sortByYXAndZ } from '../../utils/variables/collected-variables-utils';
import * as CodeList from './codes-list';
import * as Dimension from './dimension';
import * as ResponseFormatSimple from './response-format-simple';
import * as ResponseFormatSingle from './response-format-single';
import * as Responses from './responses';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { DYNAMIC_LENGTH, DYNAMIC_FIXED } = DIMENSION_LENGTH;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;

// HELPERS

function getDimensionsByType(type, dimensions) {
  let dimension;

  for (let i = 0; i < dimensions.length; i += 1) {
    if (dimensions[i].dimensionType === type) {
      dimension = dimensions[i];
      break;
    }
  }

  return dimension;
}

function getDimensionsMeasures(dimensions) {
  return dimensions.reduce((acc, d) => {
    if (d.dimensionType === MEASURE) acc.push(d);
    return acc;
  }, []);
}

function getResponsesOffset(primaryState, secondaryState, activeCodeLists) {
  let responseOffset = 1;

  if (primaryState.type === CODES_LIST) {
    const {
      CODES_LIST: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListIdPrimary },
      },
    } = primaryState;
    let responseOffsetSecondary = 1;

    if (secondaryState) {
      const {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListIdSecondary },
      } = secondaryState;
      responseOffsetSecondary = Object.keys(
        activeCodeLists[codesListIdSecondary].codes,
      ).length;
    }
    const listCodes = Object.keys(
      activeCodeLists[codesListIdPrimary].codes,
    ).map((key) => activeCodeLists[codesListIdPrimary].codes[key]);
    const codes = listCodes.filter((code) => !hasChild(code, listCodes));
    responseOffset = codes.length * responseOffsetSecondary;
  }
  return responseOffset;
}

function getMeasuresModel(responses, dimensions, offset) {
  const responsesModel = [];
  for (let i = 0; i < dimensions.length; i += 1) {
    if (responses[i].Datatype.typeName === DATATYPE_NAME.DURATION) {
      if (responses[i].Datatype.Minimum !== undefined) {
        const strminimum = responses[i].Datatype.Minimum;
        const matches_minimum = strminimum.match(/\d+/g);
        if (responses[i].Datatype.Format === 'PTnHnM') {
          responses[i].Datatype.Mihours =
            matches_minimum[0] === 0 ? '' : matches_minimum[0];
          responses[i].Datatype.Miminutes =
            matches_minimum[1] === 0 ? '' : matches_minimum[0];
        }
        if (responses[i].Datatype.Format === 'PnYnM') {
          responses[i].Datatype.Miyears =
            matches_minimum[0] === 0 ? '' : matches_minimum[0];
          responses[i].Datatype.Mimonths =
            matches_minimum[1] === 0 ? '' : matches_minimum[0];
        }
      }
      if (responses[i].Datatype.Maximum !== undefined) {
        const strmaximum = responses[i].Datatype.Maximum;
        const matches_maximum = strmaximum.match(/\d+/g);
        if (responses[i].Datatype.Format === 'PTnHnM') {
          responses[i].Datatype.Mahours =
            matches_maximum[0] === 0 ? '' : matches_maximum[0];
          responses[i].Datatype.Maminutes =
            matches_maximum[1] === 0 ? '' : matches_maximum[0];
        }
        if (responses[i].Datatype.Format === 'PnYnM') {
          responses[i].Datatype.Mayears =
            matches_maximum[0] === 0 ? '' : matches_maximum[0];
          responses[i].Datatype.Mamonths =
            matches_maximum[1] === 0 ? '' : matches_maximum[0];
        }
      }
    }

    responsesModel.push({
      Label: dimensions[i].Label,
      response: responses[i * offset],
    });
  }

  return responsesModel;
}

// REMOTE TO STATE

function remoteToStatePrimary(remote) {
  const { dynamic } = remote;

  switch (dynamic) {
    case 'NON_DYNAMIC': {
      const { CodeListReference } = remote;
      return {
        type: CODES_LIST,
        [CODES_LIST]: {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]:
            CodeList.remoteToState(CodeListReference),
        },
      };
    }
    case 'DYNAMIC_FIXED': {
      const {
        size: { type, value: size },
      } = remote;
      const calculationMethod = type === 'number' ? NUMBER : FORMULA;
      return {
        type: LIST,
        [LIST]: {
          type: calculationMethod,
          [calculationMethod]: {
            type: DYNAMIC_FIXED,
            [DYNAMIC_FIXED]: { size },
          },
        },
      };
    }
    case 'DYNAMIC': {
      const {
        minimum: { type, value: minimum },
        maximum: { value: maximum },
      } = remote;
      const calculationMethod = type === 'number' ? NUMBER : FORMULA;
      return {
        type: LIST,
        [LIST]: {
          type: calculationMethod,
          [calculationMethod]: {
            type: DYNAMIC_LENGTH,
            [DYNAMIC_LENGTH]: { minimum, maximum },
          },
        },
      };
    }
    default:
      return {};
  }
}

function remoteToStateSecondary(remote) {
  const { CodeListReference } = remote;
  const state = {
    showSecondaryAxis: true,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      CodeList.remoteToState(CodeListReference),
  };

  return state;
}

/**
 * @typedef {Object} StateMeasure
 * @property {'SINGLE_CHOICE' | 'SIMPLE'} type
 * @property {*} SINGLE_CHOICE
 * @property {*} SIMPLE
 */

/**
 * @typedef {Object} RemoteMeasure
 * @property {string} Label
 * @property {{CodeListReference: string, Datatype, conditionFilter}} response
 */

/**
 * @param {RemoteMeasure} remote
 * @returns {StateMeasure}
 */
function remoteToStateMeasure(remote) {
  const {
    Label: label,
    response: {
      CodeListReference,
      Datatype,
      conditionFilter,
      conditionReadOnly,
    },
  } = remote;

  const state = { label, conditionFilter, conditionReadOnly };

  if (CodeListReference) {
    state.type = SINGLE_CHOICE;
    state[SINGLE_CHOICE] = ResponseFormatSingle.remoteToState({
      responses: [{ Datatype, CodeListReference }],
    });
  } else {
    state.type = SIMPLE;
    state[SIMPLE] = ResponseFormatSimple.remoteToState({
      responses: [{ Datatype }],
    });
  }

  return state;
}

export function remoteToState(remote, codesListsStore) {
  const { dimensions, responses } = remote;
  const state = {};

  // Dimensions
  const dimensionSecondaryModel = getDimensionsByType(SECONDARY, dimensions);
  const dimensionPrimaryModel = getDimensionsByType(PRIMARY, dimensions);
  const dimensionMeasuresModel = getDimensionsMeasures(dimensions);

  // Primary and secondary state
  state[PRIMARY] = remoteToStatePrimary(dimensionPrimaryModel);

  if (dimensionSecondaryModel) {
    state[SECONDARY] = remoteToStateSecondary(dimensionSecondaryModel);
  }

  // Measures
  const responsesOffset = getResponsesOffset(
    state[PRIMARY],
    state[SECONDARY],
    codesListsStore,
  );
  const responsesMeasuresModel = getMeasuresModel(
    responses,
    dimensionMeasuresModel,
    responsesOffset,
  );

  if (dimensionSecondaryModel) {
    state[MEASURE] = remoteToStateMeasure(responsesMeasuresModel[0]);
  } else {
    state[LIST_MEASURE] = responsesMeasuresModel.map((m) =>
      remoteToStateMeasure(m),
    );
  }

  return state;
}

// STATE TO REMOTE

function stateToResponseState(state, primaryType) {
  const {
    type: measureType,
    [measureType]: measureTypeState,
    conditionFilter,
    conditionReadOnly,
  } = state;
  let responseState = {};

  // we keep response conditionFilter and conditionReadOnly only in dynamic tables
  if (primaryType === 'LIST') {
    responseState = { ...responseState, conditionFilter, conditionReadOnly };
  }

  if (measureType === SIMPLE) {
    const {
      mandatory,
      type: typeName,
      [typeName]: simpleState,
    } = measureTypeState;

    let customsimpleState = simpleState;

    if (
      customsimpleState.format !== undefined &&
      typeName === DATATYPE_NAME.DATE
    ) {
      const { format, minimum, maximum, ...durationsimpleState } = simpleState;

      durationsimpleState.format = format.toUpperCase();
      if (customsimpleState.minimum !== '') {
        durationsimpleState.minimum = minimum;
      }
      if (customsimpleState.maximum !== '') {
        durationsimpleState.maximum = maximum;
      }
      customsimpleState = durationsimpleState;
    }

    if (typeName === DATATYPE_NAME.DURATION) {
      const {
        miyears,
        mimonths,
        mayears,
        mamonths,
        mihours,
        miminutes,
        mahours,
        maminutes,
      } = customsimpleState;
      const durationDataType = {};
      durationDataType.format = simpleState.format;
      if (simpleState.format === 'PnYnM') {
        if (miyears !== '' || mimonths !== '') {
          durationDataType.minimum = `P${miyears || 0}Y${mimonths || 0}M`;
        }
        if (mayears !== '' || mamonths !== '') {
          durationDataType.maximum = `P${mayears || 0}Y${mamonths || 0}M`;
        }
      }
      if (simpleState.format === 'PTnHnM') {
        if (mihours || miminutes) {
          durationDataType.minimum = `PT${mihours || 0}H${miminutes || 0}M`;
        }
        if (mahours || maminutes) {
          durationDataType.maximum = `PT${mahours || 0}H${maminutes || 0}M`;
        }
      }

      customsimpleState = durationDataType;
    }

    responseState = {
      ...responseState,
      mandatory,
      typeName,
      ...customsimpleState,
    };
  } else {
    const {
      mandatory,
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
    } = measureTypeState;
    responseState = {
      ...responseState,
      mandatory,
      codesListId,
      typeName: TEXT,
      maxLength: 1,
      visHint,
    };
  }

  return responseState;
}

export function stateToRemote(
  state,
  collectedVariables,
  collectedVariablesStore,
  response,
) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = state;

  const { type, [type]: primaryTypeState } = primaryState;

  const dimensionsModel = [];
  let responsesState = [];

  let primaryListTypeState = {};
  if (type === LIST) {
    const { type: calculationMethod, ...primaryListState } = primaryState[LIST];
    const { type: lengthType, ...primaryListCalculationState } =
      primaryListState[calculationMethod];
    primaryListTypeState = {
      calculationMethod,
      ...primaryListCalculationState[lengthType],
      type: PRIMARY,
    };
  }

  // Primary and secondary dimension
  dimensionsModel.push(
    Dimension.stateToRemote({
      type: PRIMARY,
      ...(type === LIST ? primaryListTypeState : primaryTypeState),
    }),
  );
  if (secondaryState) {
    // eslint-disable-next-line no-unused-vars
    const { type: typeSecondaryCodesList, ...secondaryTypeState } =
      secondaryState;
    dimensionsModel.push(
      Dimension.stateToRemote({ type: SECONDARY, ...secondaryTypeState }),
    );
  }
  // Measures dimensions
  if (measureState) {
    dimensionsModel.push(
      Dimension.stateToRemote({ type: MEASURE, label: measureState.label }),
    );
    responsesState = [stateToResponseState(measureState, type)];
  } else {
    for (let i = 0; i < listMeasuresState.length; i += 1) {
      dimensionsModel.push(
        Dimension.stateToRemote({
          type: MEASURE,
          label: listMeasuresState[i].label,
        }),
      );
      responsesState.push(stateToResponseState(listMeasuresState[i], type));
    }
  }

  // Responses

  const numDataTypes = measureState
    ? maxBy(
        collectedVariables.map((key) => collectedVariablesStore[key]),
        'y',
      ).y || 1
    : listMeasuresState.length;
  let responsesModel = [];
  let mappingsModel = [];
  let attributesModel = [];

  for (let i = 0; i < numDataTypes; i += 1) {
    const collectedVariablesByDatatype = collectedVariables
      .sort(sortByYXAndZ(collectedVariablesStore))
      .map((key) => collectedVariablesStore[key])
      .filter((variable) => !variable.y || variable.y === i + 1)
      .map((variable) => variable.id);

    const responsesModelByRow = Responses.stateToModel(
      responsesState[measureState ? 0 : i],
      collectedVariablesByDatatype,
      collectedVariablesStore,
      QUESTION_TYPE_ENUM.TABLE,
      response,
    );

    responsesModel = [...responsesModel, ...responsesModelByRow.Response];
    mappingsModel = [...mappingsModel, ...responsesModelByRow.Mapping];
    attributesModel = [...attributesModel, ...responsesModelByRow.Attribute];
  }

  mappingsModel = mappingsModel.sort((m1, m2) => {
    const [x1, y1] = m1.MappingTarget.split(' ');
    const [x2, y2] = m2.MappingTarget.split(' ');
    if (!y1) return parseInt(x1, 10) - parseInt(x2, 10);
    return (
      parseInt(y1, 10) * 100 +
      parseInt(x1, 10) -
      (parseInt(y2, 10) * 100 + parseInt(x2, 10))
    );
  });
  return {
    Dimension: dimensionsModel,
    Response: responsesModel,
    Mapping: mappingsModel,
    Attribute: attributesModel,
  };
}
