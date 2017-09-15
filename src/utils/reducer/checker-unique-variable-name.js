import _ from 'lodash';

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
    ...Object.keys(activeCalculatedVariablesById).map(key => activeCalculatedVariablesById[key].name),
    ...Object.keys(activeExternalVariablesById).map(key => activeExternalVariablesById[key].name),
    ...Object.keys(collectedVariableByQuestion).reduce((acc, key) => {
      return [
        ...acc,
        ...Object.keys(collectedVariableByQuestion[key]).map(
          innerKey => collectedVariableByQuestion[key][innerKey].name
        ),
      ];
    }, []),
  ];

  if (_.uniq(variablesNames).length !== variablesNames.length) {
    errors.push({ id, params: {} });
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
