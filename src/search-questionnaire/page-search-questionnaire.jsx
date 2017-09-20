import React from 'react';
import PropTypes from 'prop-types';

import StatisticalContextFilters from 'search-questionnaire/containers/statistical-context-filters';
import SearchInput from 'search-questionnaire/containers/search-input';
import SearchResultsTable from 'search-questionnaire/containers/search-results-table';

function PageSearchQuestionnaire() {
  return (
    <div id="page-search-questionnaire">
      <StatisticalContextFilters />
      <SearchInput />
      <SearchResultsTable />
    </div>
  );
}

export default PageSearchQuestionnaire;
