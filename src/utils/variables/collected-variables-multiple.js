import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
} from '../../constants/pogues-constants';
import { hasChild } from '../codes-lists/codes-lists-utils';
import { getCollectedVariable, sortCodes } from './collected-variables-utils';

const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;
const { TEXT, BOOLEAN } = DATATYPE_NAME;

/**
 * Compute variables for a QCM (i.e. question that is based on a user code list)
 * in which the user can check multiple answers.
 *
 * There will be a variable for each available choices (every code from the
 * list), and there can be another variable (a clarification input that may be
 * triggered when a specific modality is chosen).
 */
export function getCollectedVariablesMultiple(
  questionName,
  form,
  codesListStore = {},
  existingVariableIds = new Set(),
) {
  const {
    [PRIMARY]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { codes, id },
    },
    [MEASURE]: { type: typeMeasure },
  } = form;

  let listCodes = sortCodes(codes);
  if (listCodes.length === 0 && codesListStore[id]) {
    const codesStore = codesListStore[id].codes;
    listCodes = Object.keys(codesStore).map((key) => codesStore[key]);
  }

  let reponseFormatValues;

  if (typeMeasure === CODES_LIST) {
    reponseFormatValues = {
      codeListReference: form[MEASURE][CODES_LIST].CodesList.id,
      codeListReferenceLabel: form[MEASURE][CODES_LIST].CodesList.label,
      type: TEXT,
      [TEXT]: { maxLength: 1 },
    };
  } else {
    reponseFormatValues = {
      type: BOOLEAN,
      [BOOLEAN]: {},
    };
  }

  const listFiltered = listCodes.filter((code) => !hasChild(code, listCodes));
  const mainVariables = listFiltered.map((c, index) =>
    getCollectedVariable(
      `${questionName}${index + 1}`,
      `${c.value} - ${c.label}`,
      { x: index + 1, isCollected: '1', alternativeLabel: '' },
      reponseFormatValues,
    ),
  );

  const clarificationVariables = [];

  // Create the clarification variables associated to our QCM code list
  form.PRIMARY.CodesList.codes?.forEach((code) => {
    if (code.precisionid && code.precisionid !== '') {
      clarificationVariables.push(
        getCollectedVariable(
          code.precisionid,
          `${code.precisionid} label`,
          {
            z: code.weight,
            isCollected: '1',
          },
          {
            type: TEXT,
            [TEXT]: {
              maxLength: code.precisionsize,
            },
          },
        ),
      );
    }
  });

  // Get existing clarification variables
  form.PRIMARY.CodesList.codes?.forEach((code) => {
    if (code.precisionByCollectedVariableId) {
      for (const [variableId, precision] of Object.entries(
        code.precisionByCollectedVariableId,
      )) {
        if (existingVariableIds.has(variableId)) {
          clarificationVariables.push(
            getCollectedVariable(
              precision.precisionid,
              `${precision.precisionid} label`,
              { z: code.weight, isCollected: '1' },
              {
                type: TEXT,
                [TEXT]: {
                  maxLength: precision.precisionsize,
                },
              },
              undefined,
              undefined,
              variableId,
            ),
          );
        }
      }
    }
  });

  return [...mainVariables, ...clarificationVariables];
}
