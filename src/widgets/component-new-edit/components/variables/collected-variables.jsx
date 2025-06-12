import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
} from '../../../../constants/pogues-constants';
import { RichEditorWithVariable } from '../../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../../forms/controls/generic-option';
import Input from '../../../../forms/controls/input';
import ListRadios from '../../../../forms/controls/list-radios';
import { toolbarConfigTooltip } from '../../../../forms/controls/rich-textarea';
import { defaultState } from '../../../../model/formToState/component-new-edit/collected-variable';
import Dictionary from '../../../../utils/dictionary/dictionary';
import { validateCollectedVariableForm } from '../../../../utils/validation/validate';
import { generateCollectedVariables } from '../../../../utils/variables/collected-variables-utils';
import { ListWithInputPanel } from '../../../list-with-input-panel';
import { SelectorView, View } from '../../../selector-view';
import ResponseFormatDatatypeDate from '../response-format/simple/simple-date';
import ResponseFormatDatatypeDuree from '../response-format/simple/simple-duree';
import ResponseFormatDatatypeNumeric from '../response-format/simple/simple-numeric';
import ResponseFormatDatatypeText from '../response-format/simple/simple-text';

const { DATE, NUMERIC, TEXT, BOOLEAN, DURATION } = DATATYPE_NAME;
const { TABLE, MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

const validateForm = (addErrors, validate) => (values, state) => {
  return validate(values, addErrors, state);
};

function CollectedVariables({
  componentName,
  collectedVariablesIds = new Set(),
  responseFormatType,
  reponseFormatValues,
  codesListsStore,
  formName,
  arrayRemoveAll,
  arrayPush,
  removeValidationErrors,
  selectorPath,
  errors,
  addErrors,
  referencedCodeList,
  isVariableCollected,
}) {
  function generateVariables() {
    const newVariables = generateCollectedVariables(
      responseFormatType,
      componentName,
      reponseFormatValues,
      codesListsStore,
      collectedVariablesIds,
    );

    arrayRemoveAll(formName, 'collectedVariables.collectedVariables');

    newVariables.forEach((cv) => {
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
        <div className="widget-list-with-input-panel__actions">
          <button
            type="button"
            disabled={componentName === '' || responseFormatType === ''}
            className="btn-yellow"
            onClick={(event) => {
              event.preventDefault();
              generateVariables();
            }}
          >
            {Dictionary.generateCollectedVariables}
          </button>
        </div>
        <div className="ctrl-checkbox" hidden={hiddenCollected}>
          <Field
            name="isCollected"
            label={Dictionary.collected}
            component={ListRadios}
            required
          >
            <GenericOption key="1" value="1">
              {Dictionary.yes}
            </GenericOption>
            <GenericOption key="0" value="0">
              {Dictionary.no}
            </GenericOption>
          </Field>
        </div>
        <div className="ctrl-checkbox" hidden={isVariableCollected === '1'}>
          <Field
            name="alternativeLabel"
            component={RichEditorWithVariable}
            toolbar={toolbarConfigTooltip}
            label={Dictionary.alternativeLabel}
          />
        </div>
        <div className="ctrl-checkbox" hidden={isVariableCollected === '0'}>
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
              <ResponseFormatDatatypeNumeric
                selectorPath={selectorPath}
                readOnly
                required={false}
              />
            </View>
            <View key={BOOLEAN} value={BOOLEAN} label={Dictionary.BOOLEAN} />
            <View key={DURATION} value={DURATION} label={Dictionary.DURATION}>
              <ResponseFormatDatatypeDuree readOnly required={false} />
            </View>
          </SelectorView>
          <Field name="codeListReference" type="hidden" component="input" />
          {referencedCodeList && (
            <Field
              name="codeListReferenceLabel"
              type="text"
              disabled
              component={Input}
              label={Dictionary.codeList}
            />
          )}
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
  codesListsStore: PropTypes.object,
  reponseFormatValues: PropTypes.object,
  referencedCodeList: PropTypes.string,
  isVariableCollected: PropTypes.string,
};

CollectedVariables.defaultProps = {
  codesListsStore: {},
  reponseFormatValues: {},
  referencedCodeList: '',
  isVariableCollected: '1',
};

export default CollectedVariables;
