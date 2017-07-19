import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import CodesList from 'layout/widget/codes-list/codes-list';
import { DIMENSION_TYPE } from 'constants/pogues-constants';

const { PRIMARY } = DIMENSION_TYPE;

class ResponseFormatMultipleInformation extends Component {
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
      ? `${selectorPathParent}.${ResponseFormatMultipleInformation.selectorPath}`
      : ResponseFormatMultipleInformation.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatMultipleInformation.selectorPath}>
        <CodesList selectorPath={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatMultipleInformation;
