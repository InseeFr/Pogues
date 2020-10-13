import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import {
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
} from 'constants/pogues-constants';
import { CodesLists } from 'widgets/codes-lists';
import Dictionary from 'utils/dictionary/dictionary';
import GenericOption from 'forms/controls/generic-option';
import ListRadios from 'forms/controls/list-radios';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;

class ResponseFormatSingle extends Component {
  static selectorPath = SINGLE_CHOICE;

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
      ? `${selectorPathParent}.${ResponseFormatSingle.selectorPath}`
      : ResponseFormatSingle.selectorPath;
  }

  render() {
    const { showMandatory } = this.props;
    const styleMandatory = {
      display: showMandatory ? 'block' : 'none',
    };

    return (
      <FormSection
        name={ResponseFormatSingle.selectorPath}
        className="response-format__single"
      >
        <div className="ctrl-checkbox" style={styleMandatory}>
          <label htmlFor="rf-single-mandatory">{Dictionary.mandatory}</label>
          <div>
            <Field
              name="mandatory"
              id="rf-single-mandatory"
              component="input"
              type="checkbox"
            />
          </div>
        </div>

        <Field
          name="visHint"
          component={ListRadios}
          label={Dictionary.visHint}
          required
        >
          <GenericOption key={CHECKBOX} value={CHECKBOX}>
            {Dictionary.checkbox}
          </GenericOption>
          <GenericOption key={RADIO} value={RADIO}>
            {Dictionary.radio}
          </GenericOption>
          <GenericOption key={DROPDOWN} value={DROPDOWN}>
            {Dictionary.dropdown}
          </GenericOption>
        </Field>
        <CodesLists selectorPathParent={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatSingle;
