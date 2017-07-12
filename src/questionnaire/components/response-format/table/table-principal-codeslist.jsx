import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import CodesList from 'layout/widget/codes-list/codes-list';

class ResponseFormatTablePrincipalCodeslist extends Component {
  static selectorPath = 'CODESLIST';
  static propTypes = {
    selectorPathParent: PropTypes.string,
  };
  static defaultProps = {
    selectorPathParent: undefined,
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
      <FormSection name={ResponseFormatTablePrincipalCodeslist.selectorPath}>
        <CodesList selectorPath={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatTablePrincipalCodeslist;
