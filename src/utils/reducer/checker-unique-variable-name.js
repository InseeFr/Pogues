import uniq from 'lodash.uniq';

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
        ...Object.keys(collectedVariableByQuestion[key]).map(
          innerKey => collectedVariableByQuestion[key][innerKey].name
        ),
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
      id,
      params: {
        dictionary: `${Dictionary.errorUniqueVariableName} : ${duplicatedVariablesNames.join(',')}`,
      },
    });
  }

  return {
    UNIQUE_VARIABLE_NAME: {
      type: 'global',
      code: 'UNIQUE_VARIABLE_NAME',
      dictionary: 'errorUniqueVariableName',
      errors,
    },
  };
}

export default checkerUniqueVariableName;
