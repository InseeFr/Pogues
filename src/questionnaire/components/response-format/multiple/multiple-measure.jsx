import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
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
    const responseFormatTypes = [
      {
        id: 'response-format-multiple-measure-listcodes',
        label: 'Liste de codes',
        value: CODES_LIST,
        content: <ResponseFormatMultipleMeasureCodeslist selectorPathParent={this.selectorPathComposed} />,
      },
      {
        id: 'response-format-multiple-measure-boolean',
        label: 'Boolean',
        value: BOOL,
        content: '',
      },
    ];
    return (
      <FormSection name={ResponseFormatMultipleMeasure.selectorPath}>
        <ComponentSelectoryByTypeContainer
          label="Format de l'information mesurée"
          components={responseFormatTypes}
          selectorPath={this.selectorPathComposed}
          radio
        />
      </FormSection>
    );
  }
}

export default ResponseFormatMultipleMeasure;
