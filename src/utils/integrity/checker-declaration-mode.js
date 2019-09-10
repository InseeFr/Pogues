import uniq from 'lodash.uniq';

import Dictionary from 'utils/dictionary/dictionary';
import { INTEGRITY_TYPES } from 'constants/pogues-constants';

function checkerTargetMode({
  appState: {
    activeComponentsById,
    activeQuestionnaire: { id, TargetMode }
  }
}) {
  const errors = [];

  const wrongComponentIds = Object.keys(activeComponentsById)
    .filter(cid => cid !== id)
    .filter(
      id =>
        activeComponentsById[id].TargetMode.filter(
          mode => mode != '' && TargetMode.indexOf(mode) < 0
        ).length > 0
    );

  if (wrongComponentIds.length > 0) {
    errors.push({
      message: `${
        Dictionary.errorQuestionnaireTargetMode
      } ${wrongComponentIds.map(id => activeComponentsById[id].name).join()}`
    });
  }

  return {
    [id]: {
      [INTEGRITY_TYPES.DECLARATION_MODE]: errors
    }
  };
}

export default checkerTargetMode;
