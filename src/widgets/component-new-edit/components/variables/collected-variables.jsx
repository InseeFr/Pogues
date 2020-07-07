import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../../model/collected-variable';
import { DATATYPE_NAME, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

import Input from 'forms/controls/input';
import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { validateCollectedVariableForm } from 'utils/validation/validate';
import { generateCollectedVariables } from 'utils/variables/collected-variables-utils';
import Dictionary from 'utils/dictionary/dictionary';
import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';
import { SelectorView, View } from 'widgets/selector-view';
import ResponseFormatDatatypeNumeric from 'widgets/component-new-edit/components/response-format/simple/simple-numeric';
import ResponseFormatDatatypeText from 'widgets/component-new-edit/components/response-format/simple/simple-text';
import ResponseFormatDatatypeDuree from 'widgets/component-new-edit/components/response-format/simple/simple-duree';
import ResponseFormatDatatypeDate from 'widgets/component-new-edit/components/response-format/simple/simple-date';


const { DATE, NUMERIC, TEXT, BOOLEAN, DURATION } = DATATYPE_NAME;
const { TABLE } = QUESTION_TYPE_ENUM;

// Utils

const validateForm = (addErrors, validate) => (values, state) => {
  return validate(values, addErrors, state);
};

// Prop types and default props

export const propTypes = {
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

export const defaultProps = {
  codesListsStoreStore: {},
  reponseFormatValues: {},
};

// Component

class CollectedVariables extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.generateVariables = this.generateVariables.bind(this);
  }

  generateVariables() {
    const {
      componentName,
      responseFormatType,
      reponseFormatValues,
      codesListsStoreStore,
      formName,
      arrayRemoveAll,
      arrayPush,
      removeValidationErrors,
    } = this.props;

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

  render() {
    const {
      formName,
      selectorPath,
      errors,
      addErrors,
      componentName,
      responseFormatType,
    } = this.props;
    const hiddenCollected = responseFormatType !== TABLE;

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
                this.generateVariables();
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
            <View key={DATE} value={DATE} label={Dictionary.DATE} >
              <ResponseFormatDatatypeDate readOnly required={false} />
            </View>
            <View key={NUMERIC} value={NUMERIC} label={Dictionary.NUMERIC}>
              <ResponseFormatDatatypeNumeric readOnly required={false} />
            </View>
            <View key={BOOLEAN} value={BOOLEAN} label={Dictionary.BOOLEAN} />
            <View key={DURATION} value={DURATION} label={Dictionary.DURATION} >
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
            <label htmlFor="collected-variables-isCollected">{Dictionary.collected}</label>
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
}

export default CollectedVariables;
