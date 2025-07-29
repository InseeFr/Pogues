import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { storeToArray } from '../../utils/utils';
import SearchResults from './search-results';

// PropTypes and defaultProps

const propTypes = {
  id: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dictionary: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      dictionary: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ),
  noValuesMessage: PropTypes.string,
};

export const defaultProps = {
  id: undefined,
  columns: [],
  actions: [],
  noValuesMessage: '',
};

// Container

function mapStateToProps(state) {
  return {
    values: storeToArray(state.searchResultById),
  };
}
const SearchResultsContainer = connect(mapStateToProps)(SearchResults);

SearchResultsContainer.propTypes = propTypes;
SearchResultsContainer.defaultProps = defaultProps;

export default SearchResultsContainer;
