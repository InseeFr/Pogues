import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultMeasureState } from 'model/formToState/component-new-edit/response-format-table';
import InputMeasure from './input-measure';

import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { validateTableListMeasuresForm } from 'utils/validation/validate';

import { DEFAULT_FORM_NAME } from 'constants/pogues-constants';

// Utils

const validateForm = (addErrors, validate) => values => {
  return validate(values, addErrors);
};

// Prop types and default props

export const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string.isRequired,
  addErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
};

// Component

function TableListMeasures({ formName, selectorPath, addErrors }) {
  return (
    <FormSection name="LIST_MEASURE">
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="measures"
        validateForm={validateForm(addErrors, validateTableListMeasuresForm)}
        resetObject={defaultMeasureState}
      >
        <InputMeasure selectorPath={selectorPath} />
      </ListWithInputPanel>
    </FormSection>
  );
}

TableListMeasures.propTypes = propTypes;
TableListMeasures.defaultProps = defaultProps;

export default TableListMeasures;
