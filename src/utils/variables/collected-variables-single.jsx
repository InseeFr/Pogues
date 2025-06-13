import {
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
} from '../../constants/pogues-constants';
import { getCollectedVariable } from './collected-variables-utils';

const { TEXT } = DATATYPE_NAME;

export function getCollectedVariablesSingle(
  questionName,
  form,
  existingVariableIds = new Set(),
) {
  const collectedVariables = [];

  const mainCollectedVariable = getCollectedVariable(
    questionName,
    `${questionName} label`,
    undefined,
    {
      codeListReference: form.CodesList.id,
      codeListReferenceLabel: form.CodesList.label,
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
      },
    },
  );

  collectedVariables.push(mainCollectedVariable);

  // if we have no precision variable, we don't need to generate other variables
  const noPrecisionVariable = form.visHint === DATATYPE_VIS_HINT.DROPDOWN;
  if (noPrecisionVariable) {
    return collectedVariables;
  }

  // get arbitrary variable for suggester
  if (
    form.allowArbitraryResponse &&
    form.visHint === DATATYPE_VIS_HINT.SUGGESTER
  ) {
    const arbitraryResponseName = `${questionName}_ARBITRARY`;
    collectedVariables.push(
      getCollectedVariable(
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
        mainCollectedVariable.id,
      ),
    );
  }

  // get new clarification variables for codes lists
  form.CodesList.codes?.forEach((code) => {
    if (code.precisionid && code.precisionid !== '') {
      collectedVariables.push(
        getCollectedVariable(
          code.precisionid,
          `${code.precisionid} label`,
          { z: code.weight, isCollected: '1' },
          {
            type: TEXT,
            codeListReference: undefined,
            [TEXT]: {
              maxLength: code.precisionsize,
            },
          },
        ),
      );
    }
  });

  // get existing clarification variables for codes lists
  form.CodesList.codes?.forEach((code) => {
    if (code.precisionByCollectedVariableId) {
      for (const [variableId, precision] of Object.entries(
        code.precisionByCollectedVariableId,
      )) {
        if (existingVariableIds.has(variableId)) {
          collectedVariables.push(
            getCollectedVariable(
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
            ),
          );
        }
      }
    }
  });

  return collectedVariables;
}
