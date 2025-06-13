import { useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  SEARCH_CRITERIAS,
  SEARCH_RESULTS_COLUMNS,
  TYPES_ITEMS,
} from '../../../constants/pogues-constants';
import Dictionary from '../../../utils/dictionary/dictionary';
import { useOidc } from '../../../utils/oidc';
// @TODO: noop is used temporally
import { noop } from '../../../utils/test/test-utils';
import { InputFilterWithCriteria } from '../../../widgets/input-filter-with-criteria';
import { SearchResults } from '../../../widgets/search-results';
import Criteria from '../containers/criteria';

const PageSearchQuestionnaire = (props) => {
  useEffect(() => {
    props.clearSearchResult();
  }, [props]);

  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;

  const propsInputFilterWithCriteria = {
    token,
    typeItem: TYPES_ITEMS.QUESTIONNAIRE,
    criterias: SEARCH_CRITERIAS.QUESTIONNAIRE,
    label: Dictionary.searchInputQuestionnaireLabel,
  };
  const propsSearchResults = {
    id: 'page-search-questionnaire__results',
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
    <div id="page-search-questionnaire" className="container">
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
