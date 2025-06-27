import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../constants/pogues-constants';
import { markdownVtlToString } from '../../forms/controls/rich-textarea';
import { hasChild } from '../codes-lists/codes-lists-utils';
import {
  getCollectedVariable,
  sortByYXAndZ,
  sortCodes,
} from './collected-variables-utils';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;
const { TEXT } = DATATYPE_NAME;

export function getCollectedVariablesTable(questionName, form) {
  const collectedVariables = [];
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = form;

  if (primaryState.type === CODES_LIST) {
    const {
      [CODES_LIST]: {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
          codes: componentCodesStatePrimary,
        },
      },
    } = primaryState;

    const codesStatePrimary = sortCodes(componentCodesStatePrimary);

    // 2 dimensions with a codelist each
    if (secondaryState?.showSecondaryAxis) {
      const {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: {
          codes: componentCodesStateSecondary,
        },
      } = secondaryState;

      const codesStateSecondary = sortCodes(componentCodesStateSecondary);
      codesStatePrimary
        .filter((code) => !hasChild(code, codesStatePrimary))
        .map((codePrimary, i) =>
          codesStateSecondary
            .filter((code) => !hasChild(code, codesStateSecondary))
            .map((codeSecondary, j) =>
              collectedVariables.push(
                getCollectedVariable(
                  `${questionName}${i + 1}${j + 1}`,
                  markdownVtlToString(
                    `${codePrimary.label}-${codeSecondary.label}-${measureState.label}`,
                  ).replace(/"/g, ''),
                  {
                    x: i + 1,
                    y: j + 1,
                    isCollected: '1',
                  },
                  getReponsesValues(measureState),
                ),
              ),
            ),
        );
    }
    // 1 dimension from a codelist ; 1 or several measures ; if several, it becomes a second dimension
    if (!secondaryState?.showSecondaryAxis) {
      codesStatePrimary
        .filter((code) => !hasChild(code, codesStatePrimary))
        .map((codePrimary, i) =>
          listMeasuresState.measures.map((measure, j) =>
            collectedVariables.push(
              getCollectedVariable(
                `${questionName}${i + 1}${j + 1}`,
                markdownVtlToString(
                  `${codePrimary.label}-${measure.label}`,
                ).replace(/"/g, ''),
                {
                  x: i + 1,
                  y: j + 1,
                  isCollected: '1',
                },
                getReponsesValues(measure),
              ),
            ),
          ),
        );
    }
  }
  // dynamic array
  if (primaryState.type !== CODES_LIST) {
    listMeasuresState.measures.map((measure, j) =>
      collectedVariables.push(
        getCollectedVariable(
          `${questionName}${j + 1}`,
          markdownVtlToString(`${measure.label}`).replace(/"/g, ''),
          {
            x: 1,
            y: j + 1,
            isCollected: '1',
          },
          getReponsesValues(measure),
        ),
      ),
    );
  }

  return collectedVariables.sort(sortByYXAndZ());
}

function getReponsesValues(measure) {
  let reponseFormatValues = {};

  if (measure.type === SIMPLE) {
    reponseFormatValues = {
      codeListReference: '',
      codeListReferenceLabel: '',
      type: measure[SIMPLE].type,
      // measure[SIMPLE].type is BOOLEAN or TEXT or NUMERIC or DATE or DURATION ; for BOOLEAN, this means : BOOLEAN: measure[SIMPLE].BOOLEAN
      [measure[SIMPLE].type]: measure[SIMPLE][measure[SIMPLE].type],
    };
  }
  if (measure.type === SINGLE_CHOICE) {
    reponseFormatValues = {
      codeListReference: measure[SINGLE_CHOICE].CodesList.id,
      codeListReferenceLabel: measure[SINGLE_CHOICE].CodesList.label,
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
      },
    };
  }
  return reponseFormatValues;
}
