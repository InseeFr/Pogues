import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { DATATYPE_NAME } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import Dictionary from 'utils/dictionary/dictionary';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatDatatypeNumeric from './simple-numeric';
import ResponseFormatDatatypeText from './simple-text';

const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
const { SIMPLE } = QUESTION_TYPE_ENUM;

class ResponseFormatSimple extends Component {
  static selectorPath = SIMPLE;
  static propTypes = {
    selectorPathParent: PropTypes.string,
    showMandatory: PropTypes.bool,
  };
  static defaultProps = {
    selectorPathParent: undefined,
    showMandatory: true,
  };
  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${ResponseFormatSimple.selectorPath}`
      : ResponseFormatSimple.selectorPath;
  }
  render() {
    const { showMandatory } = this.props;
    const baseId = this.selectorPathComposed.split('.').join('-');
    const styleMandatory = {
      display: showMandatory ? 'block' : 'none',
    };

    const responseFormatDatatypes = [
      {
        id: `${baseId}-${DATE}`,
        label: Dictionary.DATE,
        value: DATE,
        content: '',
      },
      {
        id: `${baseId}-${NUMERIC}`,
        label: Dictionary.NUMERIC,
        value: NUMERIC,
        content: <ResponseFormatDatatypeNumeric />,
      },
      {
        id: `${baseId}-${TEXT}`,
        label: Dictionary.TEXT,
        value: TEXT,
        content: <ResponseFormatDatatypeText />,
      },
      {
        id: `${baseId}-${BOOLEAN}`,
        label: Dictionary.BOOLEAN,
        value: BOOLEAN,
        content: '',
      },
    ];

    return (
      <FormSection name={SIMPLE} className="response-format__simple">
        <div className="ctrl-checkbox" style={styleMandatory}>
          <label htmlFor="rf-simple-mandatory">{Dictionary.mandatory}</label>
          <div>
            <Field name="mandatory" id="rf-simple-mandatory" component="input" type="checkbox" />
          </div>
        </div>
        <ComponentSelectoryByTypeContainer
          label={Dictionary.responseType}
          components={responseFormatDatatypes}
          selectorPath={this.selectorPathComposed}
        />
      </FormSection>
    );
  }
}

export default ResponseFormatSimple;
