import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';

import {
  DEFAULT_FORM_NAME,
  TABS_PATHS,
  TargetMode,
} from '../../../constants/pogues-constants';
import { RichEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../forms/controls/generic-option';
import ListCheckboxes from '../../../forms/controls/list-checkboxes';
import Select from '../../../forms/controls/select';
import {
  defaultCustum,
  defaultDeclaration,
} from '../../../model/formToState/component-new-edit/declaration';
import Dictionary from '../../../utils/dictionary/dictionary';
import { validateDeclarationForm } from '../../../utils/validation/validate';
import { ListWithInputPanel } from '../../list-with-input-panel';

const validateForm = (addErrors, validate) => (values) => {
  return validate(values, addErrors);
};

const Declarations = ({
  formName,
  selectorPath,
  errors,
  showPosition,
  addErrors,
  declarationType,
  activeQuestionnaire,
}) => {
  const [disableValidation, setDisableValidation] = useState(false);

  return (
    <FormSection name={selectorPath}>
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="declarations"
        errors={errors}
        validateForm={validateForm(addErrors, validateDeclarationForm)}
        resetObject={defaultCustum(activeQuestionnaire, defaultDeclaration)}
        disableValidation={disableValidation}
      >
        <Field
          name="label"
          id="declaration_text"
          component={RichEditorWithVariable}
          label={
            declarationType === 'CODECARD'
              ? Dictionary.declaration_label_code_card
              : Dictionary.declaration_label
          }
          required
          setDisableValidation={setDisableValidation}
        />

        <Field
          name="declarationType"
          id="declaration_type"
          component={Select}
          label={Dictionary.type}
          required
        >
          <GenericOption key="HELP" value="HELP">
            {Dictionary.HELP}
          </GenericOption>
          <GenericOption key="INSTRUCTION" value="INSTRUCTION">
            {Dictionary.INSTRUCTION}
          </GenericOption>
          <GenericOption key="CODECARD" value="CODECARD">
            {Dictionary.CODECARD}
          </GenericOption>
        </Field>

        {showPosition && (
          <Field
            name="position"
            id="declaration_position"
            component={Select}
            label={Dictionary.declaration_position}
            required
          >
            <GenericOption
              key="AFTER_QUESTION_TEXT"
              value="AFTER_QUESTION_TEXT"
            >
              {Dictionary.dclPosAfterQuestion}
            </GenericOption>
            <GenericOption
              key="BEFORE_QUESTION_TEXT"
              value="BEFORE_QUESTION_TEXT"
            >
              {Dictionary.dclPosBeforeText}
            </GenericOption>
          </Field>
        )}
        <Field
          name="TargetMode"
          component={ListCheckboxes}
          label={Dictionary.collectionMode}
          inline
        >
          {TargetMode.map((s) => (
            <GenericOption key={s.value} value={s.value}>
              {s.label}
            </GenericOption>
          ))}
        </Field>
      </ListWithInputPanel>
    </FormSection>
  );
};

Declarations.propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  errors: PropTypes.array,
  showPosition: PropTypes.bool,
  addErrors: PropTypes.func.isRequired,
  declarationType: PropTypes.string,
  activeQuestionnaire: PropTypes.object.isRequired,
};

Declarations.defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.DECLARATIONS,
  errors: [],
  showPosition: true,
  declarationType: '',
};

const mapStateToProps = (state) => {
  const selector = formValueSelector('component');
  return {
    declarationType: selector(state, `declarations.declarationType`),
  };
};

export default connect(mapStateToProps)(Declarations);
