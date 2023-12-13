import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Criteria from '../containers/criteria';

import { InputFilterWithCriteria } from '../../../widgets/input-filter-with-criteria';
import { SearchResults } from '../../../widgets/search-results';
import { PAGE_SEARCH_QUESTIONNAIRE } from '../../../constants/dom-constants';
import {
  TYPES_ITEMS,
  SEARCH_CRITERIAS,
  SEARCH_RESULTS_COLUMNS,
} from '../../../constants/pogues-constants';
import Dictionary from '../../../utils/dictionary/dictionary';

const { COMPONENT_ID, SEARCH_RESULTS_ID } = PAGE_SEARCH_QUESTIONNAIRE;

// @TODO: noop is used temporally
import { noop } from '../../../utils/test/test-utils';

// Component

const PageSearchQuestionnaire = props => {
  useEffect(() => {
    props.clearSearchResult();
  }, [props]);

  const propsInputFilterWithCriteria = {
    typeItem: TYPES_ITEMS.QUESTIONNAIRE,
    criterias: SEARCH_CRITERIAS.QUESTIONNAIRE,
    label: Dictionary.searchInputQuestionnaireLabel,
  };
  const propsSearchResults = {
    id: SEARCH_RESULTS_ID,
    noValuesMessage: Dictionary.pageSearchNoResults,
    columns: SEARCH_RESULTS_COLUMNS.QUESTIONNAIRE,
    actions: [
      {
        dictionary: 'searchResultActionReuse',
        action: noop,
        iconOnly: true,
        icon: 'glyphicon-eye-open',
      },
    ],
  };

  return (
    <div id={COMPONENT_ID} className="container">
      <Criteria />
      <InputFilterWithCriteria {...propsInputFilterWithCriteria} />
      <SearchResults {...propsSearchResults} />
    </div>
  );
};

// PropTypes and defaultProps
PageSearchQuestionnaire.propTypes = {
  clearSearchResult: PropTypes.func.isRequired,
};

export default PageSearchQuestionnaire;
