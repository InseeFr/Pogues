import React from 'react';
import PropTypes from 'prop-types';

import CodesListNew from './codes-list-new';
import CodesListRef from './codes-list-ref';
import CodesListQuestionnaireContainer from '../../codes-list-questionnaire';
import Dictionary from 'utils/dictionary/dictionary';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import { CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';

const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

function CodesList({ selectorPath, optional }) {
  const baseId = selectorPath.split('.').join('-');

  const codesList = [
    {
      id: `${baseId}-${NEW}`,
      label: Dictionary.newCodesList,
      value: NEW,
      content: <CodesListNew optional={optional} />,
    },
    {
      id: `${baseId}-${REF}`,
      label: Dictionary.refCodesList,
      value: REF,
      content: <CodesListRef />,
    },
    {
      id: `${baseId}-${QUESTIONNAIRE}`,
      label: Dictionary.questionnaireCodesList,
      value: QUESTIONNAIRE,
      content: <CodesListQuestionnaireContainer />,
    },
  ];

  return (
    <div>
      <ComponentSelectoryByTypeContainer
        label={Dictionary.selectCodesListType}
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
};

export default CodesList;
