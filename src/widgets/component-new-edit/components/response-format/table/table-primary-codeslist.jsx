import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { CodesLists } from 'widgets/codes-lists';
import { DIMENSION_FORMATS } from 'constants/pogues-constants';

const { CODES_LIST } = DIMENSION_FORMATS;

class ResponseFormatTablePrincipalCodeslist extends Component {
  static selectorPath = CODES_LIST;
  static propTypes = {
    selectorPathParent: PropTypes.string
  };
  static defaultProps = {
    selectorPathParent: undefined
  };
  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${ResponseFormatTablePrincipalCodeslist.selectorPath}`
      : ResponseFormatTablePrincipalCodeslist.selectorPath;
  }
  render() {
    return (
      <div className="axis-primary__panel">
        <FormSection name={ResponseFormatTablePrincipalCodeslist.selectorPath}>
          <CodesLists selectorPathParent={this.selectorPathComposed} />
        </FormSection>
      </div>
    );
  }
}

export default ResponseFormatTablePrincipalCodeslist;
