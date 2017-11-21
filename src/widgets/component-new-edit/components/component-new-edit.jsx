import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes } from 'redux-form';

import { getInvalidItemsByType } from '../utils/component-new-edit-utils';
import ResponseFormat from './response-format/response-format';
import Declaration from './declarations';
import Controls from './controls';
import Redirections from './redirections';
import CalculatedVariables from './variables/calculated-variables';
import ExternalVariables from './variables/external-variables';
import CollectedVariablesContainer from '../containers/variables/collected-variables';

import Dictionary from 'utils/dictionary/dictionary';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { WIDGET_COMPONENT_NEW_EDIT } from 'constants/dom-constants';
import { Tabs } from 'widgets/tabs';
import { AssociatedFields } from 'widgets/associated-fields';
import { updateNameField } from 'utils/utils';

const { COMPONENT_CLASS, FOOTER, CANCEL, VALIDATE } = WIDGET_COMPONENT_NEW_EDIT;
const { QUESTION } = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  ...formPropTypes,
  type: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  errorsValidation: PropTypes.object,
  errorsByQuestionTab: PropTypes.object,
  invalidItems: PropTypes.object,
};

export const defaultProps = {
  errorsValidation: {},
  errorsByQuestionTab: {},
  invalidItems: {},
};

// Componet

function ComponentNewEdit({
  handleSubmit,
  submitting,
  form,
  onCancel,
  invalidItems,
  errorsByQuestionTab,
  type,
  componentId,
}) {
  const invalidItemsByType = getInvalidItemsByType(invalidItems);
  const panels = [
    {
      id: 'declarations',
      label: Dictionary.declaration_tabTitle,
      content: <Declaration showPosition={type === QUESTION} />,
      numErrors: errorsByQuestionTab.declarations,
    },
    {
      id: 'controls',
      label: Dictionary.controls,
      content: <Controls />,
      numErrors: errorsByQuestionTab.controls,
    },
    {
      id: 'redirections',
      label: Dictionary.goTo,
      content: (
        <Redirections componentId={componentId} componentType={type} invalidItems={invalidItemsByType.redirections} />
      ),
      numErrors: errorsByQuestionTab.redirections,
    },
  ];

  if (type === QUESTION) {
    panels.unshift({
      id: 'response-format',
      label: Dictionary.responsesEdition,
      content: <ResponseFormat edit={componentId !== ''} />,
      numErrors: errorsByQuestionTab.responseFormat,
    });
    panels.push({
      id: 'external-variables',
      label: Dictionary.externalVariables,
      content: <ExternalVariables />,
    });
    panels.push({
      id: 'calculated-variables',
      label: Dictionary.calculatedVariables,
      content: <CalculatedVariables />,
    });
    panels.push({
      id: 'collected-variables',
      label: Dictionary.collectedVariables,
      content: <CollectedVariablesContainer />,
      numErrors: errorsByQuestionTab.collectedVariables,
    });
  }
  const associatedFieldsProps = {
    formName: form,
    fieldOrigin: { name: 'label', label: Dictionary.title },
    fieldTarget: { name: 'name', label: Dictionary.name },
    action: updateNameField,
  };

  return (
    <div className={COMPONENT_CLASS}>
      <form onSubmit={handleSubmit}>
        {type === QUESTION ? (
          <AssociatedFields {...associatedFieldsProps} targetIsRichTextarea />
        ) : (
          <AssociatedFields {...associatedFieldsProps} />
        )}
        <Tabs components={panels} />
        <div className={FOOTER}>
          <button className={VALIDATE} type="submit" disabled={submitting}>
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

ComponentNewEdit.propTypes = propTypes;
ComponentNewEdit.defaultProps = defaultProps;

export default ComponentNewEdit;
