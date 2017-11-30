import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../../model/collected-variable';

import Input from 'forms/controls/input';
import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { validateCollectedVariableForm } from 'utils/validation/validate';
import { generateCollectedVariables } from 'utils/variables/collected-variables-utils';
import Dictionary from 'utils/dictionary/dictionary';
import { WIDGET_LIST_WITH_INPUT_PANEL } from 'constants/dom-constants';

// Utils

const validateForm = (setErrors, validate) => (values, state) => {
  return validate(values, setErrors, state);
};

// Prop types and default props

export const propTypes = {
  componentName: PropTypes.string.isRequired,
  responseFormatType: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  selectorPath: PropTypes.string.isRequired,

  errors: PropTypes.array.isRequired,

  setErrors: PropTypes.func.isRequired,
  arrayRemoveAll: PropTypes.func.isRequired,
  arrayPush: PropTypes.func.isRequired,

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
    } = this.props;

    const newVariables = generateCollectedVariables(
      responseFormatType,
      componentName,
      reponseFormatValues,
      codesListsStoreStore
    );

    arrayRemoveAll(formName, 'collectedVariables.collectedVariables');

    newVariables.forEach(cv => {
      arrayPush(formName, 'collectedVariables.collectedVariables', cv);
    });
  }

  render() {
    const { formName, selectorPath, errors, setErrors, componentName, responseFormatType } = this.props;
    return (
      <FormSection name={selectorPath}>
        <ListWithInputPanel
          formName={formName}
          selectorPath={selectorPath}
          name="collectedVariables"
          errors={errors}
          validateForm={validateForm(setErrors, validateCollectedVariableForm)}
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
          <Field name="label" type="text" component={Input} label={Dictionary.label} required />
          <Field name="name" type="text" component={Input} label={Dictionary.name} required />
          <Field name="x" type="hidden" component="input" />
          <Field name="y" type="hidden" component="input" />
        </ListWithInputPanel>
      </FormSection>
    );
  }
}

export default CollectedVariables;
