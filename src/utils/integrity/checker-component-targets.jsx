import { getComponentsTargetsByComponent } from '../model/redirections-utils';
import { INTEGRITY_TYPES } from '../../constants/pogues-constants';

function checkerComponentTargets({ appState: { activeComponentsById } }) {
  const errorsByComponent = {};
  Object.keys(activeComponentsById).forEach(key => {
    const targetNotFoundErrors = [];
    const targetEarlierErrors = [];
    const redirections = activeComponentsById[key].redirections || {};
    const redirectionsIds = Object.keys(redirections);
    if (redirectionsIds.length > 0) {
      const activeTargetsIds = getComponentsTargetsByComponent(
        activeComponentsById,
        activeComponentsById[key],
      );
      redirectionsIds.forEach(innerKey => {
        const redirection = redirections[innerKey];
        if (redirection.redirectiontest) {
          if (!activeComponentsById[redirection.cible]) {
            targetNotFoundErrors.push({
              path: 'redirections.cible',
              itemListId: innerKey,
              dictionary: 'errorGoToNonExistingTgt',
              type: INTEGRITY_TYPES.TARGET_NOT_FOUND,
            });
          } else if (activeTargetsIds.indexOf(redirection.cible) === -1) {
            targetEarlierErrors.push({
              path: 'redirections.cible',
              itemListId: innerKey,
              dictionary: 'errorGoToNonExistingTgt',
              type: INTEGRITY_TYPES.TARGET_EARLIER,
            });
          }
        }
      });
    }

    errorsByComponent[key] = {
      [INTEGRITY_TYPES.TARGET_NOT_FOUND]: targetNotFoundErrors,
      [INTEGRITY_TYPES.TARGET_EARLIER]: targetEarlierErrors,
    };
  });

  return errorsByComponent;
}

export default checkerComponentTargets;
