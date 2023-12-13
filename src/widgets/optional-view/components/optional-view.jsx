import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import ListRadios from '../../../forms/controls/list-radios';
import GenericOption from '../../../forms/controls/generic-option';
import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';

function OptionalView({ name, label, children, active, checkbox }) {
  return (
    <div className="optional-view">
      {checkbox ? (
        <Field type="checkbox" name={name} component={Input} label={label} />
      ) : (
        <Field name={name} component={ListRadios} label={label} required>
          <GenericOption key="0" value="0">
            {Dictionary.no}
          </GenericOption>
          <GenericOption key="1" value="1">
            {Dictionary.yes}
          </GenericOption>
        </Field>
      )}
      {active && children}
    </div>
  );
}

OptionalView.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkbox: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

OptionalView.defaultProps = {
  active: false,
};

export default OptionalView;
