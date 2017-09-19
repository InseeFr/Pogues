import { getComponentsTargets } from 'utils/model/redirections-utils';

function checkerComponentTargets({ appState: { activeComponentsById } }) {
  const targetNotFoundErrors = [];
  const targetEarlierErrors = [];

  Object.keys(activeComponentsById).forEach(key => {
    const redirections = activeComponentsById[key].redirections || {};
    const redirectionsIds = Object.keys(redirections);

    if (redirectionsIds.length > 0) {
      const activeTargetsIds = getComponentsTargets(activeComponentsById, activeComponentsById[key]);

      redirectionsIds.forEach(innerKey => {
        const redirection = redirections[innerKey];

        if (!activeComponentsById[redirection.cible]) {
          targetNotFoundErrors.push({
            id: key,
            params: {
              itemId: innerKey,
              messageKey: 'errorGoToNonExistingTgt',
            },
          });
        } else if (activeTargetsIds.indexOf(redirection.cible) === -1) {
          targetEarlierErrors.push({
            id: key,
            params: {
              itemId: innerKey,
              messageKey: 'errorGoToEarlierTgt',
            },
          });
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
