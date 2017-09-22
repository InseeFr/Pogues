import React from 'react';

import searchQuestionnnaireRefRow, { headers } from 'search-questionnaire/components/search-questionnaire-ref-row';
import StatisticalContextFilters from 'search-questionnaire/containers/statistical-context-filters';
import SearchInput from 'search-questionnaire/containers/search-input';
import SearchResultsTable from 'search-questionnaire/containers/search-results-table';

function PageSearchQuestionnaire() {
  return (
    <div id="page-search-questionnaire">
      <StatisticalContextFilters />
      <SearchInput />
      <SearchResultsTable headers={headers} Row={searchQuestionnnaireRefRow} />
    </div>
  );
}

export default PageSearchQuestionnaire;
