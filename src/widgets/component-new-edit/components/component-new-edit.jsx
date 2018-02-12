import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, Field } from 'redux-form';

import ResponseFormat from './response-format/response-format';
import Declaration from './declarations';
import Controls from './controls';
import Redirections from './redirections';
import CalculatedVariables from './variables/calculated-variables';
import ExternalVariables from './variables/external-variables';
import CollectedVariablesContainer from '../containers/variables/collected-variables-container';

import { Tabs, Tab } from 'widgets/tabs';
import { AssociatedFields } from 'widgets/associated-fields';

import { WIDGET_COMPONENT_NEW_EDIT } from 'constants/dom-constants';
import { COMPONENT_TYPE, TABS_PATHS,TargetMode } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { updateNameField } from 'utils/utils';
import ListCheckboxes from 'forms/controls/list-checkboxes';
import GenericOption from 'forms/controls/generic-option';
const { COMPONENT_CLASS, FOOTER, CANCEL, VALIDATE } = WIDGET_COMPONENT_NEW_EDIT;
const { QUESTION } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  ...formPropTypes,
  componentType: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,

  errorsIntegrityByTab: PropTypes.object,
  componentsStore: PropTypes.object,

  addSubformValidationErrors: PropTypes.func.isRequired,
  clearSubformValidationErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  errorsIntegrityByTab: {},
  submitErrors: {},
  componentsStore: {},
  codesListsStoreStore: {},
};

// Componet

class ComponentNewEdit extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillMount() {
    this.props.clearSubformValidationErrors();
  }

  renderPanels() {
    const {
      componentType,
      componentId,
      addSubformValidationErrors,
      componentsStore,
      errorsIntegrityByTab,
    } = this.props;

    let panels = [
      <Tab label={Dictionary.declaration_tabTitle} path={TABS_PATHS.DECLARATIONS} key={TABS_PATHS.DECLARATIONS}>
        <Declaration
          showPosition={componentType === QUESTION}
          errors={errorsIntegrityByTab[TABS_PATHS.DECLARATIONS]}
          addErrors={addSubformValidationErrors}
        />
      </Tab>,
      <Tab label={Dictionary.controls} path={TABS_PATHS.CONTROLS} key={TABS_PATHS.CONTROLS}>
        <Controls errors={errorsIntegrityByTab[TABS_PATHS.CONTROLS]} addErrors={addSubformValidationErrors} />
      </Tab>,
      <Tab label={Dictionary.goTo} path={TABS_PATHS.REDIRECTIONS} key={TABS_PATHS.REDIRECTIONS}>
        <Redirections
          errors={errorsIntegrityByTab[TABS_PATHS.REDIRECTIONS]}
          addErrors={addSubformValidationErrors}
          componentType={componentType}
          componentsStore={componentsStore}
          editingComponentId={componentId}
        />
      </Tab>,
    ];

    if (componentType === QUESTION) {
      panels = [
        <Tab label={Dictionary.responsesEdition} path={TABS_PATHS.RESPONSE_FORMAT} key={TABS_PATHS.RESPONSE_FORMAT}>
          <ResponseFormat edit={componentId !== ''} addErrors={addSubformValidationErrors} />
        </Tab>,
        ...panels,
        <Tab
          label={Dictionary.externalVariables}
          path={TABS_PATHS.EXTERNAL_VARIABLES}
          key={TABS_PATHS.EXTERNAL_VARIABLES}
        >
          <ExternalVariables
            errors={errorsIntegrityByTab[TABS_PATHS.EXTERNAL_VARIABLES]}
            addErrors={addSubformValidationErrors}
          />
        </Tab>,
        <Tab
          label={Dictionary.calculatedVariables}
          path={TABS_PATHS.CALCULATED_VARIABLES}
          key={TABS_PATHS.CALCULATED_VARIABLES}
        >
          <CalculatedVariables
            errors={errorsIntegrityByTab[TABS_PATHS.CALCULATED_VARIABLES]}
            addErrors={addSubformValidationErrors}
          />
        </Tab>,
        <Tab
          label={Dictionary.collectedVariables}
          path={TABS_PATHS.COLLECTED_VARIABLES}
          key={TABS_PATHS.COLLECTED_VARIABLES}
        >
          <CollectedVariablesContainer
            errors={errorsIntegrityByTab[TABS_PATHS.COLLECTED_VARIABLES]}
            addErrors={addSubformValidationErrors}
          />
        </Tab>,
      ];
    }

    return panels;
  }

  render() {
    const { handleSubmit, submitting, form, onCancel, componentType, componentId } = this.props;

    const associatedFieldsProps = {
      formName: form,
      fieldOrigin: { name: 'label', label: Dictionary.title },
      fieldTarget: { name: 'name', label: Dictionary.name },
      action: updateNameField,
      focusOnInit: true,
      onEnter: () => {
        this.validateButton.click();
      },
    };

    return (
      <div className={COMPONENT_CLASS}>
        <form onSubmit={handleSubmit}>
          {componentType === QUESTION ? (
            <AssociatedFields {...associatedFieldsProps} targetIsRichTextarea />
          ) : (
            <AssociatedFields {...associatedFieldsProps} />
          )}
           <Field name="TargetMode" component={ListCheckboxes} label={Dictionary.collectionMode} inline>
            {TargetMode.map(s => (
              <GenericOption key={s.value} value={s.value}>
                {s.label}
              </GenericOption>
            ))}
          </Field>
          <Tabs componentId={componentId}>{this.renderPanels()}</Tabs>

          <div className={FOOTER}>
            <button
              className={VALIDATE}
              type="submit"
              disabled={submitting}
              ref={validateButton => {
                this.validateButton = validateButton;
              }}
            >
              {Dictionary.validate}
            </button>
            <button className={CANCEL} disabled={submitting} onClick={onCancel}>
              {Dictionary.cancel}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ComponentNewEdit;
