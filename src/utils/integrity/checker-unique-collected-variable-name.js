import uniq from 'lodash.uniq';

import { INTEGRITY_TYPES } from '../../constants/pogues-constants';
import Dictionary from '../dictionary/dictionary';
import {
  removeOrphansCollectedVariables,
  getCollectedVariablesIdsFromComponents,
} from '../variables/variables-utils';

function checkerUniqueCollectedVariableName({
  appState: {
    collectedVariableByQuestion,
    activeQuestionnaire: { id },
    activeComponentsById,
  },
}) {
  const errors = [];
  const collectedVariablesStore = Object.keys(
    collectedVariableByQuestion,
  ).reduce((acc, key) => {
    return { ...acc, ...collectedVariableByQuestion[key] };
  }, {});
  const collectedVariablesWithoutOrphans = removeOrphansCollectedVariables(
    getCollectedVariablesIdsFromComponents(activeComponentsById),
    collectedVariablesStore,
  );
  const variablesNames = Object.keys(collectedVariablesWithoutOrphans).map(
    key => collectedVariablesWithoutOrphans[key].name,
  );

  const duplicatedVariablesNames = uniq(
    variablesNames.filter(name => {
      return variablesNames.filter(innerName => innerName === name).length > 1;
    }),
  );

  if (duplicatedVariablesNames.length > 0 && duplicatedVariablesNames[0]) {
    errors.push({
      message: `${
        Dictionary.errorUniqueVariableName
      } ${duplicatedVariablesNames.join(',')}`,
      type: INTEGRITY_TYPES.UNIQUE_VARIABLE_NAME,
    });
  }

  return {
    [id]: {
      [INTEGRITY_TYPES.UNIQUE_VARIABLE_NAME]: errors,
    },
  };
}

export default checkerUniqueCollectedVariableName;
