import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchResultsTable from 'search-questionnaire/components/search-results-table';

const mapStateToProps = state => {
  return {
    results: Object.keys(state.searchResultById).reduce((acc, key) => {
      return [...acc, state.searchResultById[key]];
    }, []),
  };
};

function SearchResultsTablesContainer({ results, headers, Row }) {
  return <SearchResultsTable results={results} headers={headers} Row={Row} />;
}

SearchResultsTablesContainer.propTypes = {
  results: PropTypes.array,
  headers: PropTypes.array.isRequired,
  Row: PropTypes.func.isRequired,
};

SearchResultsTablesContainer.defaultProps = {
  results: [],
};

export default connect(mapStateToProps)(SearchResultsTablesContainer);
