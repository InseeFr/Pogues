import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import TreeSelect from 'forms/controls/tree-select';
import Dictionary from 'utils/dictionary/dictionary';
import { InputAutocomplete } from 'forms/controls/input-autocomplete';
import GenericOption from 'forms/controls/generic-option';

function TreeSelectGoto({ listTargets, emptyValue, autocomplete }) {
  return autocomplete ? (
    <Field label={Dictionary.target} required caseSensitive={false} component={InputAutocomplete} name="cible">
      {listTargets.map(goto => (
        <GenericOption key={goto.value} value={goto.value}>
          {goto.label}
        </GenericOption>
      ))}
    </Field>
  ) : (
    <Field
      name="cible"
      id="redirection_cible"
      component={TreeSelect}
      label={Dictionary.target}
      options={listTargets}
      emptyValue={emptyValue}
    />
  );
}

TreeSelectGoto.propTypes = {
  listTargets: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyValue: PropTypes.string,
  autocomplete: PropTypes.bool.isRequired,
};

TreeSelectGoto.defaultProps = {
  emptyValue: '',
};

export default TreeSelectGoto;
