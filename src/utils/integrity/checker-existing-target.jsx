import { INTEGRITY_TYPES } from '../../constants/pogues-constants';
import Dictionary from '../dictionary/dictionary';

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
    if (Object.values(redirections).length > 0) {
      Object.values(redirections).forEach(redir => {
        if (redir.cible && !activeComponentsById[redir.cible]) {
          targetNotFoundErrors.push(redir.label);
        }
      });
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
