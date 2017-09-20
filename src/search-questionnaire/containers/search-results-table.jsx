import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchResultsTable from 'search-questionnaire/components/search-results-table';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

function SearchResultsTablesContainer() {
  return <SearchResultsTable />;
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsTablesContainer);
