import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import CodesList from 'layout/connected-widget/components/codes-list/codes-list';
import { DIMENSION_TYPE } from 'constants/pogues-constants';

const { PRIMARY } = DIMENSION_TYPE;

class ResponseFormatMultiplePrimary extends Component {
  static selectorPath = PRIMARY;
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
      ? `${selectorPathParent}.${ResponseFormatMultiplePrimary.selectorPath}`
      : ResponseFormatMultiplePrimary.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatMultiplePrimary.selectorPath}>
        <CodesList selectorPath={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatMultiplePrimary;
