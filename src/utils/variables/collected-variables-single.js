import {
  CHOICE_TYPE,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
} from '../../constants/pogues-constants';
import { getCollectedVariable } from './collected-variables-utils';
import { getReference } from './variables-utils';

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
  codesListStore,
) {
  let mainVariable;

  if (form.choiceType === CHOICE_TYPE.VARIABLE) {
    const desiredVarLabel =
      codesListStore?.[form.Variable?.id]?.label ?? form.Variable?.label;

    mainVariable = getCollectedVariable(
      questionName,
      `${questionName} label`,
      undefined,
      {
        variableReference: form.Variable.id,
        // We need to dynamically get the label of the variable reference, as it can be changed by the user
        variableReferenceLabel: desiredVarLabel,
        type: TEXT,
        choiceType: form.choiceType,
        [TEXT]: { maxLength: 1 },
      },
    );
  } else {
    mainVariable = getCollectedVariable(
      questionName,
      `${questionName} label`,
      undefined,
      {
        ...getReference(form),
        type: TEXT,
        choiceType: form.choiceType,
        [TEXT]: { maxLength: 1 },
      },
    );
  }

  // Nomenclatures may allow an arbitrary response
  if (form.choiceType === CHOICE_TYPE.SUGGESTER) {
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
  if (
    form.visHint === DATATYPE_VIS_HINT.DROPDOWN ||
    form.choiceType === CHOICE_TYPE.VARIABLE
  ) {
    return [mainVariable];
  }

  const clarificationVariables = [];

  // Create the clarification variables associated to our QCU code list
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
  const arbitraryVariable = getCollectedVariable(
    arbitraryResponseName,
    `${arbitraryResponseName} label`,
    undefined,
    {
      type: TEXT,
      [TEXT]: { maxLength: 249 },
    },
    undefined,
    mainVariable.id,
  );
  arbitraryVariable.arbitraryVariableOfVariableId = mainVariable.id;
  return arbitraryVariable;
}
