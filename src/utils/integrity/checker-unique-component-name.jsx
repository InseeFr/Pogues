import uniq from 'lodash.uniq';

import {
  INTEGRITY_TYPES,
  COMPONENT_TYPE,
} from '../../constants/pogues-constants';
import Dictionary from '../dictionary/dictionary';

const { FILTER, LOOP } = COMPONENT_TYPE;

function checkerUniqueComponentName({
  appState: {
    activeComponentsById,
    activeQuestionnaire: { id },
  },
}) {
  const errors = [];
  const componentNames = Object.values(activeComponentsById)
    .filter(component => component.type !== FILTER)
    .map(element => (element.type === LOOP ? element.nameLoop : element.name));

  const duplicatedComponentNames = uniq(
    componentNames.filter(name => {
      return componentNames.filter(innerName => innerName === name).length > 1;
    }),
  );
  if (duplicatedComponentNames.length > 0) {
    errors.push({
      message: `${
        Dictionary.errorUniqueComponentName
      } ${duplicatedComponentNames.join(',')}`,
    });
  }

  return {
    [id]: {
      [INTEGRITY_TYPES.UNIQUE_COMPONENT_NAME]: errors,
    },
  };
}

export default checkerUniqueComponentName;
