import React from 'react';
import PropTypes from 'prop-types';

import CodesListNew from './codes-list-new';
import CodesListRef from './codes-list-ref';
import CodesListQuestionnaire from './codes-list-questionnaire';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import { CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';

const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

function CodesList({ selectorPath }) {
  const codesList = [
    {
      id: `codes-list-${NEW}`,
      label: 'Créer une liste',
      value: NEW,
      content: <CodesListNew />,
    },
    {
      id: `codes-list-${REF}`,
      label: 'Retrouver dans le référentiel',
      value: REF,
      content: <CodesListRef />,
    },
    {
      id: `codes-list-${QUESTIONNAIRE}`,
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
};

export default CodesList;
