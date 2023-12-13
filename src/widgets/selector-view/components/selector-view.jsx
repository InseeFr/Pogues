import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from '../../../forms/controls/select';
import ListRadios from '../../../forms/controls/list-radios';
import GenericOption from '../../../forms/controls/generic-option';

// Utils

export function getValuesFromViews(views) {
  return Children.map(views, v => {
    const { children: view, value, label } = v.props;
    return {
      value,
      label,
      view,
    };
  });
}

// PropTypes and defaultProps

const propTypes = {
  activeViewValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  emptyOption: PropTypes.string,
  radio: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
  readOnly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
};

export const defaultProps = {
  children: [],
  emptyOption: undefined,
};

// Component

function SelectorView({
  activeViewValue,
  label,
  emptyOption,
  radio,
  children,
  readOnly,
  required,
}) {
  const values = getValuesFromViews(children);
  const options = values.map(v => (
    <GenericOption key={v.value} value={v.value}>
      {v.label}
    </GenericOption>
  ));
  const activeView = values
    .filter(v => v.value === activeViewValue)
    .map(v => v.view);

  if (emptyOption) {
    options.unshift(
      <GenericOption key="" value="">
        {emptyOption}
      </GenericOption>,
    );
  }

  return (
    <div>
      {radio ? (
        <Field
          name="type"
          component={ListRadios}
          label={label}
          required={required}
          disabled={readOnly}
        >
          {options}
        </Field>
      ) : (
        <Field
          name="type"
          component={Select}
          label={label}
          required={required}
          disabled={readOnly}
        >
          {options}
        </Field>
      )}
      {activeView}
    </div>
  );
}

SelectorView.propTypes = propTypes;
SelectorView.defaultProps = defaultProps;

export default SelectorView;
