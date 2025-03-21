import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';

import {
  DECLARATION_TYPES,
  DEFAULT_FORM_NAME,
  GATHERING_MODES_OPTIONS_BY_DECLARATION,
  TABS_PATHS,
} from '../../../constants/pogues-constants';
import { RichEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../forms/controls/generic-option';
import Input from '../../../forms/controls/input';
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

/**
 * Give additional informations about the question to the respondent or the
 * questioner to help them answer the question.
 *
 * - "Help" can be selected for all gathering modes.
 * - "Instruction" can be selected for CAPI and CATI.
 * - "Code card" can be selected for CAPI (and a card code must be provided).
 *
 * @see {@link DECLARATION_TYPES} and {@link GATHERING_MODES_OPTIONS_BY_DECLARATION}
 */
const Declarations = ({
  formName = DEFAULT_FORM_NAME,
  selectorPath = TABS_PATHS.DECLARATIONS,
  errors = [],
  showPosition = true,
  addErrors,
  declarationType = DECLARATION_TYPES.HELP,
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
          name="declarationType"
          id="declaration_type"
          component={Select}
          label={Dictionary.type}
          required
        >
          <GenericOption value={DECLARATION_TYPES.HELP}>
            {Dictionary.declarationHelp}
          </GenericOption>
          <GenericOption value={DECLARATION_TYPES.INSTRUCTION}>
            {Dictionary.declarationInstruction}
          </GenericOption>
          <GenericOption value={DECLARATION_TYPES.CODE_CARD}>
            {Dictionary.declarationCodeCard}
          </GenericOption>
        </Field>

        {declarationType === DECLARATION_TYPES.CODE_CARD ? (
          <Field
            name="label"
            id="declaration_text"
            type="text"
            component={Input}
            label={Dictionary.declaration_label_code_card}
            required
          />
        ) : (
          <Field
            name="label"
            id="declaration_text"
            component={RichEditorWithVariable}
            label={Dictionary.declaration_label}
            required
            setDisableValidation={setDisableValidation}
          />
        )}

        {showPosition && (
          <Field
            name="position"
            id="declaration_position"
            component={Select}
            label={Dictionary.declaration_position}
            required
          >
            <GenericOption value="AFTER_QUESTION_TEXT">
              {Dictionary.dclPosAfterQuestion}
            </GenericOption>
            <GenericOption value="BEFORE_QUESTION_TEXT">
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
          {GATHERING_MODES_OPTIONS_BY_DECLARATION[declarationType].map((s) => (
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

const mapStateToProps = (state) => {
  const selector = formValueSelector('component');
  return {
    declarationType: selector(state, `declarations.declarationType`),
  };
};

export default connect(mapStateToProps)(Declarations);
