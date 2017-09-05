import { required, name as validateName } from 'layout/forms/validation-rules';

function checkerCollectedVariables({ appState: { activeComponentsById, collectedVariableByQuestion } }) {
  const errors = Object.keys(activeComponentsById)
    .filter(key => collectedVariableByQuestion[key])
    .reduce((acc, key) => {
      const innerErrors = Object.keys(collectedVariableByQuestion[key])
        .filter(innerKey => {
          const collectedVariable = collectedVariableByQuestion[key][innerKey];
          return (
            validateName(collectedVariable.name) ||
            required(collectedVariable.name) ||
            required(collectedVariable.label)
          );
        })
        .map(innerKey => {
          return {
            id: key,
            params: {
              itemId: innerKey,
              invalidFieldsNames: [],
            },
          };
        });

      return [...acc, ...innerErrors];
    }, []);

  return {
    INVALID_COLLECTED_VARIABLE: {
      type: 'collectedVariables',
      code: 'INVALID_COLLECTED_VARIABLE',
      dictionary: 'errorInvalidCollectedVariable',
      errors: errors,
    },
  };
}

export default checkerCollectedVariables;
