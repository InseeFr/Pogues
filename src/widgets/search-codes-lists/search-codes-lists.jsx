import React from 'react';
import PropTypes from 'prop-types';

import { StatisticalContextCriteria } from 'widgets/statistical-context-criteria';
import { InputFilterWithCriteria } from 'widgets/input-filter-with-criteria';
import { SearchResults } from 'widgets/search-results';
import { WIDGET_SEARCH_CODES_LISTS } from 'constants/dom-constants';
import { DEFAULT_FORM_NAME, TYPES_ITEMS, SEARCH_CRITERIAS, SEARCH_RESULTS_COLUMNS } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';

// @TODO: noop is used temporally
import { noop } from 'utils/test/test-utils';

const { COMPONENT_CLASS, SEARCH_RESULTS_CLASS } = WIDGET_SEARCH_CODES_LISTS;

// PropTypes and defaultProps

const propTypes = {
  selectorPath: PropTypes.string,
};

const defaultProps = {
  selectorPath: '',
};

// Component

function SearchCodesLists({ selectorPath }) {
  const props = {
    formName: DEFAULT_FORM_NAME,
    selectorPath,
  };
  const propsStatisticaContextCriteria = {
    ...props,
    showCampaigns: false,
    horizontal: true,
  };
  const propsInputFilterWithCriteria = {
    ...props,
    typeItem: TYPES_ITEMS.CODES_LIST,
    criterias: SEARCH_CRITERIAS.CODES_LIST,
    label: Dictionary.searchInputCodesListsLabel,
  };
  const propsSearchResults = {
    className: SEARCH_RESULTS_CLASS,
    noValuesMessage: Dictionary.codesListsNoResults,
    columns: SEARCH_RESULTS_COLUMNS.CODES_LIST,
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
    <div className={COMPONENT_CLASS}>
      <StatisticalContextCriteria {...propsStatisticaContextCriteria} />
      <InputFilterWithCriteria {...propsInputFilterWithCriteria} />
      <SearchResults {...propsSearchResults} />
    </div>
  );
}

SearchCodesLists.propTypes = propTypes;
SearchCodesLists.defaultProps = defaultProps;

export default SearchCodesLists;
