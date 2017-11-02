import React from 'react';

import Criteria from './containers/criteria';

import { InputFilterWithCriteria } from 'widgets/input-filter-with-criteria';
import { SearchResults } from 'widgets/search-results';
import { PAGE_SEARCH_QUESTIONNAIRE } from 'constants/dom-constants';
import { TYPES_ITEMS, SEARCH_CRITERIAS, SEARCH_RESULTS_COLUMNS } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

const { COMPONENT_ID, SEARCH_RESULTS_ID  } = PAGE_SEARCH_QUESTIONNAIRE

// @TODO: noop is used temporally
import { noop } from 'utils/test/test-utils';

// Component

function PageSearchQuestionnaire() {
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
      },
    ],
  };

  return (
    <div id={COMPONENT_ID}>
      <Criteria />
      <InputFilterWithCriteria {...propsInputFilterWithCriteria} />
      <SearchResults {...propsSearchResults} />
    </div>
  );
}

export default PageSearchQuestionnaire;
