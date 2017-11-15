import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';
import Dictionary from 'utils/dictionary/dictionary';

function GotoSelect({ targets }) {
  return (
    <Field name="cible" id="redirection_cible" component={Select} label={Dictionary.target}>
      {targets.map(t => <GenericOption value />)}
    </Field>
  );
}

GotoSelect.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GotoSelect;
