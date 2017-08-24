import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from 'layout/forms/controls/select';
import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';
import { requiredSelect } from 'layout/forms/validation-rules';

function ComponentSelectorByType({ activeComponent, label, components, radio, emptyValue }) {
  const selector = radio
    ? <Field
        name="type"
        component={ListRadioButtons}
        label={label}
        radios={components}
        validate={[requiredSelect]}
        required
        emptyValue={emptyValue}
      />
    : <Field
        name="type"
        component={Select}
        label={label}
        options={components}
        validate={[requiredSelect]}
        required
        emptyValue={emptyValue}
      />;

  const content = activeComponent.id
    ? <div key={activeComponent.id}>
        {activeComponent.content}
      </div>
    : '';

  return (
    <div>
      {selector}
      {content}
    </div>
  );
}

ComponentSelectorByType.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  activeComponent: PropTypes.object,
  radio: PropTypes.bool,
  emptyValue: PropTypes.string,
};

ComponentSelectorByType.defaultProps = {
  activeComponent: {},
  radio: false,
  emptyValue: '',
};

export default ComponentSelectorByType;
