import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { uuid } from 'utils/data-utils';

const { QUESTION } = COMPONENT_TYPE;

function checkerCollectedVariables({ appState: { activeComponentsById } }) {
  // const errors = Object.keys(activeComponentsById)
  //   .filter(
  //     key =>
  //       activeComponentsById[key].type === QUESTION &&
  //       activeComponentsById[key].responseFormat.type !== activeComponentsById[key].collectedVariables.responseFormat
  //   )
  //   .map(key => {
  //     return {
  //       id: key,
  //       params: {
  //         itemId: uuid(),
  //         messageKey: 'errorNeedRegenerateCollectedVariables',
  //       },
  //     };
  //   });

  const errors = [];

  return {
    NEED_REGENERATE_COLLECTED_VARIABLES: {
      type: 'collectedVariables',
      code: 'NEED_REGENERATE_COLLECTED_VARIABLES',
      dictionary: 'errorNeedRegenerateCollectedVariables',
      errors: errors,
    },
  };
}

export default checkerCollectedVariables;
