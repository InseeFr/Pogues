import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Input from 'layout/forms/controls/input';
import Select from 'layout/forms/controls/select';
import { UI_BEHAVIOUR, DATATYPE_VIS_HINT, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';
import CodesList from 'layout/widget/codes-list/codes-list';
import Dictionary from 'utils/dictionary/dictionary';
import OptionalViewContainer from 'layout/connected-widget/optional-view';

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

    const uiBehaviour = Object.keys(UI_BEHAVIOUR).map(key => {
      return { value: key, label: Dictionary[key] };
    });

    return (
      <FormSection name={ResponseFormatSingle.selectorPath} className="response-format__single">
        <div className="ctrl-checkbox" style={styleMandatory}>
          <label htmlFor="rf-single-mandatory">
            {Dictionary.mandatory}
          </label>
          <div>
            <Field name="mandatory" id="rf-single-mandatory" component="input" type="checkbox" />
          </div>
        </div>
        <OptionalViewContainer
          name="hasSpecialCode"
          label={Dictionary.addSpecialCode}
          selectorPath={this.selectorPathComposed}
          checkbox
          view={
            <div>
              <Field name="specialLabel" type="text" component={Input} label={Dictionary.codeLabel} />
              <Field name="specialCode" type="text" component={Input} label={Dictionary.code} />
              <Field
                name="specialUiBehaviour"
                component={Select}
                label={Dictionary.uiBehaviour}
                options={uiBehaviour}
                required
              />
              <Field name="specialFollowUpMessage" type="text" component={Input} label={Dictionary.followUpMsg} />
            </div>
          }
        />
        <Field name="visHint" component={ListRadioButtons} label={Dictionary.visHint} radios={listVisHints} required />
        <CodesList selectorPath={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatSingle;
