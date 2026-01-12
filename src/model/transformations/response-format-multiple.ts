import {
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_VARIABLE_REFERENCE_PATH,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '@/constants/pogues-constants';

import { remoteToState as codeListRemoteToState } from './codes-list';
import {
  type RemoteDimension,
  type RemoteDimensionPrimary,
  stateToRemote as dimensionStateToRemote,
} from './dimension';
import { type Response } from './response';
import { stateToModel as responsesStateToModel } from './responses';

type RemoteResponseFormatMultiple = {
  mandatory?: boolean;
  dimensions: RemoteDimension[];
  responses: {
    id: string;
    Datatype: {
      typeName?: DATATYPE_NAME.BOOLEAN | DATATYPE_NAME.TEXT;
      allowArbitraryResponse?: unknown;
      visualizationHint: DATATYPE_VIS_HINT;
    };
    CodeListReference?: unknown;
    variableReference?: unknown;
  }[];
};

// For some reason the stateToRemote model is not the same remote model as the
// remoteToState one?
type RemoteResponseFormatMultiple2 = {
  mandatory?: boolean;
  Dimension: RemoteDimension[];
  Response: unknown[];
};

type StateResponseFormatMultiple = {
  mandatory?: boolean;
  [DIMENSION_TYPE.PRIMARY]:
  | {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: string };
  }
  | {
    [DEFAULT_VARIABLE_REFERENCE_PATH]: { id: string };
  };
  [DIMENSION_TYPE.MEASURE]:
  | {
    type: DIMENSION_FORMATS.BOOL;
    [DIMENSION_FORMATS.BOOL]: unknown;
  }
  | {
    type: DIMENSION_FORMATS.CODES_LIST;
    [DIMENSION_FORMATS.CODES_LIST]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: string };
      visHint: DATATYPE_VIS_HINT;
    };
  }
  | {
    type: DIMENSION_FORMATS.VARIABLE_RESPONSES;
    [DIMENSION_FORMATS.VARIABLE_RESPONSES]: {
      [DEFAULT_VARIABLE_REFERENCE_PATH]: { id: string };
      visHint: DATATYPE_VIS_HINT;
    };
  };
};

/** Get the dimension associated to the primary axis. */
function getPrimaryDimension(
  dimensions: RemoteDimension[],
): RemoteDimensionPrimary | undefined {
  const result = dimensions.filter((d) => {
    return d.dimensionType === DIMENSION_TYPE.PRIMARY;
  });
  return result.length > 0 ? result[0] : undefined;
}

export function remoteToState(
  remote: RemoteResponseFormatMultiple,
): StateResponseFormatMultiple {
  const {
    mandatory,
    dimensions,
    responses: [
      {
        Datatype: { typeName: type, visualizationHint: visHint },
        CodeListReference,
        variableReference
      },
    ],
  } = remote;
  const primaryDimension = getPrimaryDimension(dimensions)!;

  let primaryState: StateResponseFormatMultiple[typeof DIMENSION_TYPE.PRIMARY];

  if (primaryDimension.variableReference) {
    primaryState = {
      [DEFAULT_VARIABLE_REFERENCE_PATH]: { id: primaryDimension.variableReference },

    };
  } else if (primaryDimension.CodeListReference) {
    primaryState = {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codeListRemoteToState(
        primaryDimension.CodeListReference,
      ),
    };
  } else {
    primaryState = {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: '' },
    };
  }

  const baseState = {
    mandatory,
    [DIMENSION_TYPE.PRIMARY]: primaryState,
  };

  if (type === DATATYPE_NAME.BOOLEAN) {
    return {
      ...baseState,
      [DIMENSION_TYPE.MEASURE]: {
        type: DIMENSION_FORMATS.BOOL,
        [DIMENSION_FORMATS.BOOL]: {},
      },
    };
  }

  if (variableReference) {
    return {
      ...baseState,
      [DIMENSION_TYPE.MEASURE]: {
        type: DIMENSION_FORMATS.VARIABLE_RESPONSES,
        [DIMENSION_FORMATS.VARIABLE_RESPONSES]: {
          [DEFAULT_VARIABLE_REFERENCE_PATH]: { id: variableReference as string },
          visHint,
        },
      },
    };
  }

  return {
    ...baseState,
    [DIMENSION_TYPE.MEASURE]: {
      type: DIMENSION_FORMATS.CODES_LIST,
      [DIMENSION_FORMATS.CODES_LIST]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]:
          codeListRemoteToState(CodeListReference),
        visHint,
      },
    },
  };
}

export function stateToRemote(
  state: StateResponseFormatMultiple,
  collectedVariables: string[],
  collectedVariablesStore: {
    [s: string]: {
      id: string;
      x: number;
      y: number;
      type?: unknown;
      isCollected?: unknown;
      alternativeLabel?: unknown;
    };
  },
  response: Response[],
): RemoteResponseFormatMultiple2 {
  const {
    [DIMENSION_TYPE.PRIMARY]: primaryDimension,
    [DIMENSION_TYPE.MEASURE]: measureDimension,
  } = state;
  let responseState;

  const dimensionsModel = [];
  dimensionsModel.push(
    dimensionStateToRemote({
      ...primaryDimension,
      type: DIMENSION_TYPE.PRIMARY,
    }),
    dimensionStateToRemote({ type: DIMENSION_TYPE.MEASURE }),
  );

  if (measureDimension.type === DIMENSION_FORMATS.CODES_LIST) {
    const {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
      visHint,
    } = measureDimension[DIMENSION_FORMATS.CODES_LIST];

    responseState = {
      codesListId,
      typeName: DATATYPE_NAME.TEXT,
      visHint,
      maxLength: 1,
    };
  } else {
    responseState = {
      typeName: DATATYPE_NAME.BOOLEAN,
    };
  }

  const responsesModel = responsesStateToModel(
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
