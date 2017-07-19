import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { DATATYPE_VIS_HINT, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';
import CodesList from 'layout/widget/codes-list/codes-list';
import Dictionary from 'utils/dictionary/dictionary';

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
    const listVisHints = [
      {
        value: CHECKBOX,
        label: Dictionary.checkbox,
      },
      {
        value: RADIO,
        label: Dictionary.radio,
      },
      {
        value: DROPDOWN,
        label: Dictionary.dropdown,
      },
    ];

    return (
      <FormSection name={ResponseFormatSingle.selectorPath} className="response-format__single">
        <div className="ctrl-checkbox" style={styleMandatory}>
          <label htmlFor="rf-single-mandatory">{Dictionary.mandatory}</label>
          <div>
            <Field name="mandatory" id="rf-single-mandatory" component="input" type="checkbox" />
          </div>
        </div>

        <Field name="visHint" component={ListRadioButtons} label={Dictionary.visHint} radios={listVisHints} required />
        <CodesList selectorPath={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatSingle;
