import React from 'react';
import { FormSection, Field } from 'redux-form';
import Dictionary from 'utils/dictionary/dictionary';
import Select from 'components/forms/controls/select';
import Input from 'components/forms/controls/input';

class Declaration extends FormSection {
  render() {
    return (
      <div>
        <div className="ctrl-input">
            <label for="declaration_label">{Dictionary.declaration_label}</label>
            <Field name="mandatory" id="declaration_label" component={Input} />
        </div>
        <div className="ctrl-select">
            <label for="declaration_label">{Dictionary.declaration_type}</label>
            <Field name="mandatory" id="declaration_label" component={Select} />
        </div>
        <div className="ctrl-select">
            <label for="declaration_label">{Dictionary.declaration_position}</label>
            <Field name="mandatory" id="declaration_label" component={Select} />
        </div>
        </div>
    );
  }
}

export default Declaration;
