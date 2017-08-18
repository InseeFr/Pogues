import { getTargets } from 'utils/component/component-utils';

function isEarlierTarget(ids, targetId) {
  return ids.indexOf(targetId) !== -1;
}

function existsTarget(components, targetId) {
  return components[targetId] !== undefined;
}

function checkerComponentTargets({ appState: { activeComponentsById } }) {
  return Object.keys(activeComponentsById).reduce((acc, id) => {
    const redirections = activeComponentsById[id].redirections;

    if (redirections.length > 0) {
      const ids = getTargets(
        activeComponentsById,
        activeComponentsById[id].type,
        '',
        activeComponentsById[id].parent,
        activeComponentsById[id].weight
      );
      const errors = redirections.reduce((accInner, redirection) => {
        if (!existsTarget(activeComponentsById, redirection.cible)) {
          accInner.push({
            type: 'redirections',
            code: 'TARGET_NOT_FOUND',
            params: { redirectionId: redirection.id, targetId: redirection.cible },
            dictionary: 'errorGoToNonExistingTgt',
          });
        } else if (!isEarlierTarget(ids, redirection.cible)) {
          accInner.push({
            type: 'redirections',
            code: 'TARGET_EARLIER',
            params: { redirectionId: redirection.id, targetId: redirection.cible },
            dictionary: 'errorGoToEarlierTgt',
          });
        }
        return accInner;
      }, []);

      if (errors.length > 0) {
        acc = {
          ...acc,
          [id]: {
            id,
            errors,
          },
        };
      }
    }

    return acc;
  }, {});
}

export default checkerComponentTargets;
