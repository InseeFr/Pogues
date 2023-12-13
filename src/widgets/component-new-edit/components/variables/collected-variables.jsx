import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../../../../model/formToState/component-new-edit/collected-variable';
import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
} from '../../../../constants/pogues-constants';

import Input from '../../../../forms/controls/input';
import { ListWithInputPanel } from '../../../list-with-input-panel';
import { validateCollectedVariableForm } from '../../../../utils/validation/validate';
import { generateCollectedVariables } from '../../../../utils/variables/collected-variables-utils';
import Dictionary from '../../../../utils/dictionary/dictionary';
import { WIDGET_LIST_WITH_INPUT_PANEL } from '../../../../constants/dom-constants';
import { SelectorView, View } from '../../../selector-view';
import ResponseFormatDatatypeNumeric from '../response-format/simple/simple-numeric';
import ResponseFormatDatatypeText from '../response-format/simple/simple-text';
import ResponseFormatDatatypeDuree from '../response-format/simple/simple-duree';
import ResponseFormatDatatypeDate from '../response-format/simple/simple-date';

const { DATE, NUMERIC, TEXT, BOOLEAN, DURATION } = DATATYPE_NAME;
const { TABLE, MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

const validateForm = (addErrors, validate) => (values, state) => {
  return validate(values, addErrors, state);
};

function CollectedVariables({
  componentName,
  responseFormatType,
  reponseFormatValues,
  codesListsStoreStore,
  formName,
  arrayRemoveAll,
  arrayPush,
  removeValidationErrors,
  selectorPath,
  errors,
  addErrors,
}) {
  function generateVariables() {
    const newVariables = generateCollectedVariables(
      responseFormatType,
      componentName,
      reponseFormatValues,
      codesListsStoreStore,
    );

    arrayRemoveAll(formName, 'collectedVariables.collectedVariables');

    newVariables.forEach(cv => {
      cv.label = cv.label.replace(/\*/g, '');
      arrayPush(formName, 'collectedVariables.collectedVariables', cv);
    });

    removeValidationErrors(['collectedVariables.collectedVariables']);
  }
  const hiddenCollected =
    responseFormatType !== TABLE && responseFormatType !== MULTIPLE_CHOICE;

  return (
    <FormSection name={selectorPath}>
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="collectedVariables"
        errors={errors}
        validateForm={validateForm(addErrors, validateCollectedVariableForm)}
        resetObject={defaultState}
        canAddNew={false}
        canRemove={false}
        canDuplicate={false}
      >
        <div className={WIDGET_LIST_WITH_INPUT_PANEL.ACTIONS_CLASS}>
          <button
            type="button"
            disabled={componentName === '' || responseFormatType === ''}
            className="btn-yellow"
            onClick={event => {
              event.preventDefault();
              generateVariables();
            }}
          >
            {Dictionary.generateCollectedVariables}
          </button>
        </div>
        <Field
          name="label"
          type="text"
          component={Input}
          label={Dictionary.label}
          required
        />
        <Field
          name="name"
          type="text"
          component={Input}
          label={Dictionary.name}
          required
        />
        <Field name="x" type="hidden" component="input" />
        <Field name="y" type="hidden" component="input" />
        <SelectorView
          label={Dictionary.responseType}
          selectorPath={selectorPath}
          readOnly
          required={false}
        >
          <View key={TEXT} value={TEXT} label={Dictionary.TEXT}>
            <ResponseFormatDatatypeText readOnly required={false} />
          </View>
          <View key={DATE} value={DATE} label={Dictionary.DATE}>
            <ResponseFormatDatatypeDate
              readOnly
              required={false}
              isCollectedVariables
            />
          </View>
          <View key={NUMERIC} value={NUMERIC} label={Dictionary.NUMERIC}>
            <ResponseFormatDatatypeNumeric readOnly required={false} />
          </View>
          <View key={BOOLEAN} value={BOOLEAN} label={Dictionary.BOOLEAN} />
          <View key={DURATION} value={DURATION} label={Dictionary.DURATION}>
            <ResponseFormatDatatypeDuree readOnly required={false} />
          </View>
        </SelectorView>

        <Field name="codeListReference" type="hidden" component="input" />
        <Field
          name="codeListReferenceLabel"
          type="text"
          disabled
          component={Input}
          label={Dictionary.cl}
        />
        <div className="ctrl-checkbox" hidden={hiddenCollected}>
          <label htmlFor="collected-variables-isCollected">
            {Dictionary.collected}
          </label>
          <div>
            <Field
              name="isCollected"
              id="collected-variables-isCollected"
              component="input"
              type="checkbox"
            />
          </div>
        </div>
      </ListWithInputPanel>
    </FormSection>
  );
}

CollectedVariables.propTypes = {
  componentName: PropTypes.string.isRequired,
  responseFormatType: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  selectorPath: PropTypes.string.isRequired,

  errors: PropTypes.array.isRequired,

  addErrors: PropTypes.func.isRequired,
  arrayRemoveAll: PropTypes.func.isRequired,
  arrayPush: PropTypes.func.isRequired,
  removeValidationErrors: PropTypes.func.isRequired,

  codesListsStoreStore: PropTypes.object,
  reponseFormatValues: PropTypes.object,
};

CollectedVariables.defaultProps = {
  codesListsStoreStore: {},
  reponseFormatValues: {},
};

export default CollectedVariables;
