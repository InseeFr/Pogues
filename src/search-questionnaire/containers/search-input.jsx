import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchInput from 'search-questionnaire/components/search-input';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

function SearchInputContainer() {
  return <SearchInput />;
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputContainer);
