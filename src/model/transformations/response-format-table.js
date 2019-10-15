import { sortByYAndX } from 'utils/variables/collected-variables-utils';
import maxBy from 'lodash.maxby';

import * as ResponseFormatSimple from './response-format-simple';
import * as ResponseFormatSingle from './response-format-single';
import * as CodeList from './codes-list';
import * as Dimension from './dimension';
import * as Responses from './responses';
import { hasChild } from 'utils/codes-lists/codes-lists-utils';

import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;

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
    ).map(key => activeCodeLists[codesListIdPrimary].codes[key]);
    const codes = listCodes.filter(code => !hasChild(code, listCodes));
    responseOffset = codes.length * responseOffsetSecondary;
  }
  return responseOffset;
}

function getMeasuresModel(responses, dimensions, offset) {
  const responsesModel = [];
  for (let i = 0; i < dimensions.length; i += 1) {

    if (responses[i].Datatype.Minimum !== undefined && responses[i].Datatype.typeName==='DURATION' ) {
      let strminimum = responses[i].Datatype.Minimum;
      let strmaximum = responses[i].Datatype.Maximum;
      let matches_minimum = strminimum.match(/\d+/g);
      let matches_maximum = strmaximum.match(/\d+/g);

      if (responses[i].Datatype.Format !== undefined && responses[i].Datatype.Format === "PTnHnM" ) {
        responses[i].Datatype.Mihours = matches_minimum[0];
        responses[i].Datatype.Miminutes =  matches_minimum[1];
        responses[i].Datatype.Mahours = matches_maximum[0];
        responses[i].Datatype.Maminutes = matches_maximum[1];
      } 
      
      if (responses[i].Datatype.Format !== undefined && responses[i].Datatype.Format === "PnYnM" ) {

        responses[i].Datatype.Miyears = matches_minimum[0];
        responses[i].Datatype.Mimonths = matches_minimum[1];
        responses[i].Datatype.Mayears = matches_maximum[0];
        responses[i].Datatype.Mamonths = matches_maximum[1];

      } 

      responses[i].Datatype.Mihours = responses[i].Datatype.Mihours === 0 ? '' : responses[i].Datatype.Mihours;
      responses[i].Datatype.Miminutes = responses[i].Datatype.Miminutes === 0 ? '' : responses[i].Datatype.Miminutes;
      responses[i].Datatype.Mahours = responses[i].Datatype.Mahours === 0 ? '' : responses[i].Datatype.Mahours;
      responses[i].Datatype.Maminutes = responses[i].Datatype.Maminutes === 0 ? '' : responses[i].Datatype.Maminutes;
      responses[i].Datatype.Miyears = responses[i].Datatype.Miyears === 0 ? '' : responses[i].Datatype.Miyears;
      responses[i].Datatype.Mimonths = responses[i].Datatype.Mimonths === 0 ? '' : responses[i].Datatype.Mimonths;
      responses[i].Datatype.Mayears = responses[i].Datatype.Mayears === 0 ? '' : responses[i].Datatype.Mayears;
      responses[i].Datatype.Mamonths = responses[i].Datatype.Mamonths === 0 ? '' : responses[i].Datatype.Mamonths;

    }  
 
    responsesModel.push({
      Label: dimensions[i].Label,
      response: responses[i * offset],
    });
  }


 
  return responsesModel;
  
}

function parseDynamic(dynamic) {
  return dynamic.split('-').map(v => {
    return v.length > 0 ? parseInt(v, 10) : 0;
  });
}

// REMOTE TO STATE

function remoteToStatePrimary(remote) {
  const { totalLabel, dynamic, CodeListReference } = remote;
  let state = {};

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  if (CodeListReference) {
    state = {
      ...state,
      type: CODES_LIST,
      [CODES_LIST]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodeList.remoteToState(
          CodeListReference,
        ),
      },
    };
  } else {
    const [numLinesMin, numLinesMax] = parseDynamic(dynamic);
    state = {
      ...state,
      type: LIST,
      [LIST]: {
        numLinesMin: numLinesMin,
        numLinesMax: numLinesMax,
      },
    };
  }

  return state;
}

function remoteToStateSecondary(remote) {
  const { totalLabel, CodeListReference } = remote;
  const state = {
    showSecondaryAxis: true,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodeList.remoteToState(
      CodeListReference,
    ),
  };

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  return state;
}

function remoteToStateMeasure(remote) {
  const {
    Label: label,
    response: { CodeListReference, Datatype },
  } = remote;
  const state = {};

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
  
  return {
    label,
    ...state,
  };
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
    state[LIST_MEASURE] = responsesMeasuresModel.map(m =>
      remoteToStateMeasure(m),
    );
  }

  return state;
}

// STATE TO REMOTE

function stateToResponseState(state) {
  const { type: measureType, [measureType]: measureTypeState } = state;
  let responseState = {};

  if (measureType === SIMPLE) {
    const {
      mandatory,
      type: typeName,
      [typeName]: simpleState,
    } = measureTypeState;
    responseState = { mandatory, typeName, ...simpleState };
  } else {
    const {
      mandatory,
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
    } = measureTypeState;
    responseState = {
      mandatory,
      codesListId,
      typeName: TEXT,
      maxLength: 1,
      pattern: '',
      visHint,
    };
  }

  if (responseState.typeName === 'DURATION' && responseState.format === 'PnYnM' ){

    responseState.miyears = responseState.miyears === '' ? 0 : responseState.miyears;
    responseState.mimonths = responseState.mimonths === '' ? 0 : responseState.mimonths;
    responseState.mayears = responseState.mayears === '' ? 0 : responseState.mayears;
    responseState.mamonths = responseState.mamonths === '' ? 0 : responseState.mamonths;

    responseState.minimum = "P"+responseState.miyears+"Y"+responseState.mimonths+"M";
    responseState.maximum = "P"+responseState.mayears+"Y"+responseState.mamonths+"M";
  } 

  if (responseState.typeName === 'DURATION' && responseState.format === 'PTnHnM' ){

    responseState.mihours = responseState.mihours === '' ? 0 : responseState.mihours;
    responseState.miminutes = responseState.miminutes === '' ? 0 : responseState.miminutes;
    responseState.mahours = responseState.mahours === '' ? 0 : responseState.mahours;
    responseState.maminutes = responseState.maminutes === '' ? 0 : responseState.maminutes;

    responseState.minimum = "PT"+responseState.mihours+"H"+responseState.miminutes+"M";
    responseState.maximum = "PT"+responseState.mahours+"H"+responseState.maminutes+"M";
  } 

  if(responseState.typeName === 'DURATION'){
    delete responseState.miyears;
    delete responseState.mimonths;
    delete responseState.mihours;
    delete responseState.miminutes;
    delete responseState.mayears;
    delete responseState.mamonths;
    delete responseState.mahours;
    delete responseState.maminutes;
  } 

  return responseState;
}

export function stateToRemote(
  state,
  collectedVariables,
  collectedVariablesStore,
) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = state;

  const {
    type,
    [type]: { type: typePrimaryCodesList, ...primaryTypeState },
    ...totalLabelPrimaryState
  } = primaryState;
  const dimensionsModel = [];
  let responsesState = [];

  // Primary and secondary dimension
  dimensionsModel.push(
    Dimension.stateToRemote({
      type: PRIMARY,
      ...primaryTypeState,
      ...totalLabelPrimaryState,
    }),
  );

  if (secondaryState) {
    const {
      type: typeSecondaryCodesList,
      ...secondaryTypeState
    } = secondaryState;
    dimensionsModel.push(
      Dimension.stateToRemote({ type: SECONDARY, ...secondaryTypeState }),
    );
  }

  // Measures dimensions
  if (measureState) {
   
    dimensionsModel.push(
      Dimension.stateToRemote({ type: MEASURE, label: measureState.label }),
    );
    responsesState = [stateToResponseState(measureState)];
  } else {
    for (let i = 0; i < listMeasuresState.length; i += 1) {
      dimensionsModel.push(
        Dimension.stateToRemote({
          type: MEASURE,
          label: listMeasuresState[i].label,
        }),
      );
      responsesState.push(stateToResponseState(listMeasuresState[i]));
    }
  }

  // Responses

  const numDataTypes = measureState
    ? maxBy(collectedVariables.map(key => collectedVariablesStore[key]), 'y')
        .y || 1
    : listMeasuresState.length;
  let responsesModel = [];
  let mappingsModel = [];

  for (let i = 0; i < numDataTypes; i += 1) {
    const collectedVariablesByDatatype = collectedVariables
      .sort(sortByYAndX(collectedVariablesStore))
      .map(key => collectedVariablesStore[key])
      .filter(variable => !variable.y || variable.y === i + 1)
      .map(variable => variable.id);

    const responsesModelByRow = Responses.stateToModel(
      responsesState[measureState ? 0 : i],
      collectedVariablesByDatatype,
      collectedVariablesStore,
    );

    responsesModel = [...responsesModel, ...responsesModelByRow.Response];
    mappingsModel = [...mappingsModel, ...responsesModelByRow.Mapping];
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
  };
}
