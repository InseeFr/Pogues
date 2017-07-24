import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';
import ResponseFormatMultiplePrimary from './multiple-primary';
import ResponseFormatMultipleMeasure from './multiple-measure';

const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

class ResponseFormatMultiple extends Component {
  static selectorPath = MULTIPLE_CHOICE;
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
      ? `${selectorPathParent}.${ResponseFormatMultiple.selectorPath}`
      : ResponseFormatMultiple.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatMultiple.selectorPath} className="response-format__multiple">
        <h3 className="axis-primary__head">
          {Dictionary.primaryAxis}
        </h3>
        <ResponseFormatMultiplePrimary selectorPathParent={this.selectorPathComposed} />
        <h3 className="axis-measure__head">
          {Dictionary.measureInfo}
        </h3>
        <ResponseFormatMultipleMeasure selectorPathParent={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatMultiple;
