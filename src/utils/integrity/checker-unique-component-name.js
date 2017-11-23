import uniq from 'lodash.uniq';

import { INTEGRITY_TYPES } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

function checkerUniqueComponentName({ appState: { activeComponentsById, activeQuestionnaire: { id } } }) {
  const errors = [];
  const componentNames = Object.keys(activeComponentsById).map(key => activeComponentsById[key].name);

  const duplicatedComponentNames = uniq(
    componentNames.filter(name => {
      return componentNames.filter(innerName => innerName === name).length > 1;
    })
  );

  if (duplicatedComponentNames.length > 0) {
    errors.push({ message: `${Dictionary.errorUniqueComponentName} ${duplicatedComponentNames.join(',')}` });
  }

  return {
    [id]: {
      [INTEGRITY_TYPES.UNIQUE_COMPONENT_NAME]: errors,
    },
  };
}

export default checkerUniqueComponentName;
