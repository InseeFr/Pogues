import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import GenericOption from '../../../forms/controls/generic-option';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';
import { ErrorsPanel } from '../../errors-panel';

const { COMPONENT_CLASS } = WIDGET_CODES_LISTS;

// PropTypes and defaultProps

export const propTypes = {
  selectorPath: PropTypes.string.isRequired,
  selectorPathParent: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  currentId: PropTypes.string,
  variablesStore: PropTypes.object,
  change: PropTypes.func.isRequired,
  allowFilter: PropTypes.bool,
  scope: PropTypes.string,
};

export const defaultProps = {
  currentId: '',
  variablesStore: {},
  allowFilter: false,
  scope: '',
};

/**
 * Allow to select a variable and display the related variable informations.
 */
const Variables = ({
  selectorPath,
  selectorPathParent,
  formName,
  path,
  currentId = '',
  variablesStore = {},
  change,
  scope = '',
}) => {
  const [currentIdState, setCurrentIdState] = useState(currentId);

  useEffect(() => {
    /* Unselect variable */
    if (currentIdState !== currentId && currentId === '') {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      change(formName, `${path}name`, '');
      setCurrentIdState(currentId);
    }
  }, [currentId, change, currentIdState, formName, path]);

  const handleVariableSelect = (event, newValue) => {
    const selectedVariable = Object.values(variablesStore).find(
      (variable) => variable.id === newValue,
    );
    if (newValue && variablesStore) {
      change(
        formName,
        `${path}label`,
        selectedVariable.label || selectedVariable.name,
      );
      change(formName, `${path}name`, selectedVariable.name);
    } else if (newValue === '') {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      change(formName, `${path}name`, '');
    }
  };

  const variableSourceOptions = Object.values(variablesStore).map(
    (variable) => (
      <GenericOption key={variable.id} value={variable.id}>
        {variable.name}
      </GenericOption>
    ),
  );

  return (
    <FormSection name={selectorPath} className={COMPONENT_CLASS}>
      {/* variables list selection */}
      <Field
        name="id"
        component={Select}
        label={Dictionary.selectVariable}
        required
        onChange={handleVariableSelect}
        disabled={scope === ''}
      >
        <GenericOption key="" value="">
          {Dictionary.selectVariable}
        </GenericOption>
        {variableSourceOptions}
      </Field>
      <ErrorsPanel path={`${selectorPathParent}.${selectorPath}`} />
    </FormSection>
  );
};

Variables.propTypes = propTypes;

export default Variables;
