import uniq from 'lodash.uniq';

import { INTEGRITY_TYPES } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

function checkerUniqueVariableName({
  appState: {
    activeCalculatedVariablesById,
    activeExternalVariablesById,
    collectedVariableByQuestion,
    activeQuestionnaire: { id },
  },
}) {
  const errors = [];

  const variablesNames = [
    ...Object.keys(activeCalculatedVariablesById || {}).map(key => activeCalculatedVariablesById[key].name),
    ...Object.keys(activeExternalVariablesById || {}).map(key => activeExternalVariablesById[key].name),
    ...Object.keys(collectedVariableByQuestion || {}).reduce((acc, key) => {
      return [
        ...acc,
        ...Object.keys(collectedVariableByQuestion[key]).reduce((innerAcc, innerKey) => {
          return [...innerAcc, collectedVariableByQuestion[key][innerKey].name];
        }, []),
      ];
    }, []),
  ];

  const duplicatedVariablesNames = uniq(
    variablesNames.filter(name => {
      return variablesNames.filter(innerName => innerName === name).length > 1;
    })
  );

  if (duplicatedVariablesNames.length > 0) {
    errors.push({
      message: `${Dictionary.errorUniqueVariableName} ${duplicatedVariablesNames.join(',')}`,
    });
  }

  return {
    [id]: {
      [INTEGRITY_TYPES.UNIQUE_VARIABLE_NAME]: errors,
    },
  };
}

export default checkerUniqueVariableName;
