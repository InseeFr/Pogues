import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';

class SearchResultsTable extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    Row: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  render() {
    const { headers, Row, results } = this.props;
    const headerRow = (
      <div className="search-results__header">
        {headers.map((h, index) => <div key={`${h}-${index}`}>{Dictionary[`headerSearchQuestionnaire_${h}`]}</div>)}
      </div>
    );
    const resultRows = results.map((r, index) => <Row key={`${r.id}-${index}`} {...r} />);

    return (
      <div className={`box search-results search-results-${headers.length}`}>
        {headerRow}
        {resultRows.length > 0 ? resultRows : <div>No results</div>}
      </div>
    );
  }
}

export default SearchResultsTable;
