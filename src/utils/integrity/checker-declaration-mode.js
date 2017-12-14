import uniq from 'lodash.uniq';

import Dictionary from 'utils/dictionary/dictionary';
import { INTEGRITY_TYPES } from 'constants/pogues-constants';

function checkerDeclarationMode({ appState: { activeComponentsById, activeQuestionnaire: { id, declarationMode } } }) {
  const errors = [];

  const wrongComponentIds = Object.keys(activeComponentsById)
    .filter(cid => cid !== id)
    .filter(id => activeComponentsById[id].declarationMode.filter(mode => declarationMode.indexOf(mode) < 0).length > 0)


  if (wrongComponentIds.length > 0) {
    errors.push({
      message: `${Dictionary.errorQuestionnaireDeclarationMode} ${wrongComponentIds.map(id => activeComponentsById[id].name).join()}`,
    });
  }

  return {
    [id]: {
      [INTEGRITY_TYPES.DECLARATION_MODE]: errors,
    },
  };
}

export default checkerDeclarationMode;