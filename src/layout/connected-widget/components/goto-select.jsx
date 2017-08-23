import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from 'layout/forms/controls/select';
import Dictionary from 'utils/dictionary/dictionary';

function GotoSelect({ targets }) {
  return <Field name="cible" id="redirection_cible" component={Select} label={Dictionary.target} options={targets} />;
}

GotoSelect.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GotoSelect;
