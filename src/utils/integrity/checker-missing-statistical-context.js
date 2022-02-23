import { INTEGRITY_TYPES } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

function checkerMissingStatisticalContext({
  appState: {
    activeQuestionnaire: { id, serie, operation, campaigns },
  },
}) {
  const errors = [];
  if (id && (serie === '' || operation === '' || campaigns[0] === '')) {
    errors.push({
      message: `${Dictionary.errorMissingStatisticalContext}`,
    });
  }
  return {
    [id]: {
      [INTEGRITY_TYPES.MISSING_STATISTICAL_CONTEXT]: errors,
    },
  };
}

export default checkerMissingStatisticalContext;
