import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { SelectorView, View } from 'widgets/selector-view';
import ResponseFormatMultipleMeasureCodeslist from './multiple-measure-codeslist';
import Dictionary from 'utils/dictionary/dictionary';
import { DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';

const { MEASURE } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;

class ResponseFormatMultipleMeasure extends Component {
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
      ? `${selectorPathParent}.${ResponseFormatMultipleMeasure.selectorPath}`
      : ResponseFormatMultipleMeasure.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatMultipleMeasure.selectorPath}>
        <SelectorView label={Dictionary.responseType} selectorPath={this.selectorPathComposed} radio>
          <View key={CODES_LIST} value={CODES_LIST} label={Dictionary.codeList}>
            <ResponseFormatMultipleMeasureCodeslist selectorPathParent={this.selectorPathComposed} />
          </View>
          <View key={BOOL} value={BOOL} label={Dictionary.boolean} />
        </SelectorView>
      </FormSection>
    );
  }
}

export default ResponseFormatMultipleMeasure;
