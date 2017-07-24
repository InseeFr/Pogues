import React from 'react';
import PropTypes from 'prop-types';

import CodesListNew from './codes-list-new';
import CodesListRef from './codes-list-ref';
import CodesListQuestionnaire from './codes-list-questionnaire';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import { CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';

const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

function CodesList({ selectorPath, optional }) {
  const baseId = selectorPath.split('.').join('-');

  const codesList = [
    {
      id: `${baseId}-${NEW}`,
      label: 'Créer une liste',
      value: NEW,
      content: <CodesListNew optional={optional} />,
    },
    {
      id: `${baseId}-${REF}`,
      label: 'Retrouver dans le référentiel',
      value: REF,
      content: <CodesListRef />,
    },
    {
      id: `${baseId}-${QUESTIONNAIRE}`,
      label: 'Retrouver dans le questionnaire',
      value: QUESTIONNAIRE,
      content: <CodesListQuestionnaire />,
    },
  ];

  return (
    <div>
      <ComponentSelectoryByTypeContainer
        label="Formats de responses"
        components={codesList}
        selectorPath={selectorPath}
        radio
      />
    </div>
  );
}

CodesList.propTypes = {
  selectorPath: PropTypes.string.isRequired,
  optional: PropTypes.bool,
};

CodesList.defaultProps = {
  optional: false,
}

export default CodesList;
