import {
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
} from '../../constants/pogues-constants';
import { getCollectedVariable } from './collected-variables-utils';

const { TEXT } = DATATYPE_NAME;

/**
 * Compute variables for a QCU (i.e. question that can either be based on a user
 * code list (radio, dropdown, checkbox) or based on a nomenclature).
 *
 * There will be one main variable (the user choice from the list), and there
 * can be another variable (a clarification input that may be triggered when a
 * specific modality is chosen).
 */
export function getCollectedVariablesSingle(
  questionName,
  form,
  existingVariableIds = new Set(),
) {
  const mainVariable = getCollectedVariable(
    questionName,
    `${questionName} label`,
    undefined,
    {
      codeListReference:
        form.visHint === DATATYPE_VIS_HINT.SUGGESTER
          ? form.Nomenclature.id
          : form.CodesList.id,
      codeListReferenceLabel:
        form.visHint === DATATYPE_VIS_HINT.SUGGESTER
          ? form.Nomenclature.label
          : form.CodesList.label,
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
      },
    },
  );

  // Nomenclatures may allow an arbitrary response
  if (form.visHint === DATATYPE_VIS_HINT.SUGGESTER) {
    if (form.allowArbitraryResponse) {
      const arbitraryResponseVariable = computeSuggesterArbitraryVariable(
        questionName,
        mainVariable,
      );
      return [mainVariable, arbitraryResponseVariable];
    }
    return [mainVariable];
  }

  // Dropdown do not have clarification variable
  if (form.visHint === DATATYPE_VIS_HINT.DROPDOWN) {
    return [mainVariable];
  }

  const clarificationVariables = [];

  // Create the clarification variables assocaited to our QCU code list
  form.CodesList.codes?.forEach((code) => {
    if (code.precisionid && code.precisionid !== '') {
      const clarificationVariable = getCollectedVariable(
        code.precisionid,
        `${code.precisionid} label`,
        { z: code.weight, isCollected: '1' },
        {
          codeListReference: undefined,
          type: TEXT,
          [TEXT]: { maxLength: code.precisionsize },
        },
      );
      clarificationVariables.push(clarificationVariable);
    }
  });

  // If the code list has clarification variables associated to other QCU, we do
  // not delete them and guess them
  form.CodesList.codes?.forEach((code) => {
    if (code.precisionByCollectedVariableId) {
      for (const [variableId, precision] of Object.entries(
        code.precisionByCollectedVariableId,
      )) {
        if (
          existingVariableIds.has(variableId) &&
          !clarificationVariables.some(
            (value) => value.id === precision.precisionid,
          )
        ) {
          const clarificationVariable = getCollectedVariable(
            precision.precisionid,
            `${precision.precisionid} label`,
            { z: code.weight, isCollected: '1' },
            {
              type: TEXT,
              codeListReference: undefined,
              [TEXT]: {
                maxLength: precision.precisionsize,
              },
            },
            undefined,
            undefined,
            variableId,
          );
          clarificationVariables.push(clarificationVariable);
        }
      }
    }
  });

  return [mainVariable, ...clarificationVariables];
}

function computeSuggesterArbitraryVariable(questionName, mainVariable) {
  const arbitraryResponseName = `${questionName}_ARBITRARY`;
  return getCollectedVariable(
    arbitraryResponseName,
    `${arbitraryResponseName} label`,
    undefined,
    {
      type: TEXT,
      [TEXT]: {
        maxLength: 249,
      },
    },
    undefined,
    mainVariable.id,
  );
}
