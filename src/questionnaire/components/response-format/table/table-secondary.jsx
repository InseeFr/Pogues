import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormatTableSecondaryOptional from './table-secondary-optional';
import Dictionary from 'utils/dictionary/dictionary';
import OptionalView from 'layout/widget/optional-view';

class ResponseFormatTableSecondary extends Component {
  static selectorPath = 'AXISSECONDARY';
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
      ? `${selectorPathParent}.${ResponseFormatTableSecondary.selectorPath}`
      : ResponseFormatTableSecondary.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatTableSecondary.selectorPath}>
        <OptionalView
          checkbox
          name="showSecondaryAxis"
          label={Dictionary.addScndAxis}
          view={<ResponseFormatTableSecondaryOptional selectorPath={this.selectorPathComposed} />}
        />
      </FormSection>
    );
  }
}

export default ResponseFormatTableSecondary;
