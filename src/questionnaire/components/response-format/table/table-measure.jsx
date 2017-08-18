import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import InputMeasure from './input-measure';
import { DIMENSION_TYPE } from 'constants/pogues-constants';

const { MEASURE } = DIMENSION_TYPE;

class ResponseFormatTableMeasure extends Component {
  static selectorPath = MEASURE;
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
      ? `${selectorPathParent}.${ResponseFormatTableMeasure.selectorPath}`
      : ResponseFormatTableMeasure.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatTableMeasure.selectorPath}>
        <InputMeasure selectorPath={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatTableMeasure;
