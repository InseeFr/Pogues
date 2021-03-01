import { INTEGRITY_TYPES } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

function checkerExistingTarget({
  appState: {
    activeComponentsById,
    activeQuestionnaire: { id },
  },
}) {
  const targetNotFoundErrors = [];
  const errors = [];
  Object.keys(activeComponentsById).forEach(key => {
    const redirections = activeComponentsById[key].redirections || {};
    if (
      Object.values(redirections)[0] &&
      Object.values(redirections)[0].cible &&
      !Object.values(activeComponentsById)[Object.values(redirections)[0].cible]
    ) {
      targetNotFoundErrors.push(Object.values(redirections)[0].label);
    }
  });
  if (targetNotFoundErrors.length > 0) {
    errors.push({
      message: `${Dictionary.notExistingTarget} ${targetNotFoundErrors.join(
        ',',
      )}`,
    });
  }
  return {
    [id]: {
      [INTEGRITY_TYPES.NOT_EXISTING_TARGET]: errors,
    },
  };
}

export default checkerExistingTarget;
