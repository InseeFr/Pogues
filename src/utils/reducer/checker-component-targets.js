import { getTargets } from 'utils/component/component-utils';

function isEarlierTarget(ids, targetId) {
  return ids.indexOf(targetId) === -1;
}

function existsTarget(components, targetId) {
  return components[targetId] !== undefined;
}

function checkerComponentTargets({ appState: { activeComponentsById } }) {
  const targetNotFoundErrors = [];
  const targetEarlierErrors = [];

  Object.keys(activeComponentsById).forEach(key => {
    const redirections = activeComponentsById[key].redirections;

    if (Object.keys(redirections).length > 0) {
      const ids = getTargets(
        activeComponentsById,
        activeComponentsById[key].type,
        key,
        activeComponentsById[key].parent,
        activeComponentsById[key].weight,
        false
      );
      Object.keys(redirections).forEach(redirectionKey => {
        const redirection = redirections[redirectionKey];
        const error = {
          id: key,
          params: {
            itemId: redirections[redirectionKey].id,
            targetId: redirection.cible,
            invalidFieldsNames: ['cible'],
          },
        };
        if (!existsTarget(activeComponentsById, redirection.cible)) {
          targetNotFoundErrors.push(error);
        } else if (isEarlierTarget(ids, redirection.cible)) {
          targetEarlierErrors.push(error);
        }
      });
    }
  });

  return {
    TARGET_NOT_FOUND: {
      type: 'redirections',
      code: 'TARGET_NOT_FOUND',
      dictionary: 'errorGoToNonExistingTgt',
      errors: targetNotFoundErrors,
    },
    TARGET_EARLIER: {
      type: 'redirections',
      code: 'TARGET_EARLIER',
      dictionary: 'errorGoToEarlierTgt',
      errors: targetEarlierErrors,
    },
  };
}

export default checkerComponentTargets;
