import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { WIDGET_GOTO_INPUT } from '../../../constants/dom-constants';
import GenericOption from '../../../forms/controls/generic-option';
import { InputAutocomplete } from '../../../forms/controls/input-autocomplete';
import Dictionary from '../../../utils/dictionary/dictionary';

const { COMPONENT_CLASS } = WIDGET_GOTO_INPUT;

// Prop types and default props

const propTypes = {
  targets: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

const defaultProps = {
  targets: [],
};

// Component

function GotoInput({ targets }) {
  return (
    <Field
      className={COMPONENT_CLASS}
      name="cible"
      label={Dictionary.target}
      required
      caseSensitive={false}
      component={InputAutocomplete}
    >
      {targets.map((t) => (
        <GenericOption key={t.value} value={t.value}>
          {t.label}
        </GenericOption>
      ))}
    </Field>
  );
}

GotoInput.propTypes = propTypes;
GotoInput.defaultProps = defaultProps;

export default GotoInput;
