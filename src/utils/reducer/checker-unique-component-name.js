import uniq from 'lodash.uniq';

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
    errors.push({
      id,
      params: {
        dictionary: `${Dictionary.errorUniqueComponentName} ${duplicatedComponentNames.join(',')}`,
      },
    });
  }

  return {
    UNIQUE_COMPONENT_NAME: {
      type: 'global',
      code: 'UNIQUE_COMPONENT_NAME',
      dictionary: 'errorUniqueComponentName',
      errors,
    },
  };
}

export default checkerUniqueComponentName;
