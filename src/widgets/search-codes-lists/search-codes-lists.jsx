import React from 'react';
import PropTypes from 'prop-types';

import { StatisticalContextCriteria } from '../statistical-context-criteria';
import { InputFilterWithCriteria } from '../input-filter-with-criteria';
import { SearchResults } from '../search-results';
import { WIDGET_SEARCH_CODES_LISTS } from '../../constants/dom-constants';
import {
  DEFAULT_FORM_NAME,
  TYPES_ITEMS,
  SEARCH_CRITERIAS,
  SEARCH_RESULTS_COLUMNS,
} from '../../constants/pogues-constants';
import Dictionary from '../../utils/dictionary/dictionary';

// @TODO: noop is used temporally
import { noop } from '../../utils/test/test-utils';

const { COMPONENT_CLASS, SEARCH_RESULTS_CLASS, SEARCH_CLASS } =
  WIDGET_SEARCH_CODES_LISTS;

// PropTypes and defaultProps

const propTypes = {
  path: PropTypes.string,
};

const defaultProps = {
  path: '',
};

// Component

function SearchCodesLists({ path }) {
  const props = {
    formName: DEFAULT_FORM_NAME,
    path,
  };
  const propsStatisticaContextCriteria = {
    ...props,
    showOperations: false,
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
      <div className={SEARCH_CLASS}>
        <StatisticalContextCriteria {...propsStatisticaContextCriteria} />
        <InputFilterWithCriteria {...propsInputFilterWithCriteria} />
      </div>
      <SearchResults {...propsSearchResults} />
    </div>
  );
}

SearchCodesLists.propTypes = propTypes;
SearchCodesLists.defaultProps = defaultProps;

export default SearchCodesLists;
