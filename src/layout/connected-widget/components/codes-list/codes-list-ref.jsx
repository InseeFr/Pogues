import React from 'react';
import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { SearchCodesLists } from 'widgets/search-codes-lists';

class CodesListRef extends FormSection {
  static propTypes = {
    selectorPath: PropTypes.string.isRequired,
  };
  static defaultProps = {
    name: 'REF',
  };
  render() {
    return <SearchCodesLists selectorPath={this.props.selectorPath} />;
  }
}

export default CodesListRef;
