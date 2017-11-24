import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormat from '../response-format/response-format';
import Declaration from '../declarations/declarations';
import Controls from '../controls/controls';
import Redirections from '../redirections/redirections';
import CalculatedVariables from '../variables/calculated-variables';
import ExternalVariables from '../variables/external-variables';
import CollectedVariablesContainer from '../../containers/variables/collected-variables';
import { Tabs } from 'widgets/tabs';
import Dictionary from 'utils/dictionary/dictionary';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

import { componentName } from 'forms/normalize-inputs';
// import { RichTextareaWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';
import { RichTextarea } from 'forms/controls/rich-textarea';
import Input from 'forms/controls/input';

const { QUESTION } = COMPONENT_TYPE;

function getInvalidItemsByType(invalidItems) {
  return Object.keys(invalidItems).reduce((acc, key) => {
    const item = invalidItems[key];
    let type = acc[item.type] || {};

    type = {
      ...type,
      [item.id]: item,
    };

    return {
      ...acc,
      [item.type]: type,
    };
  }, {});
}

export class QuestionNewEdit extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    updateName: PropTypes.func,
    submitting: PropTypes.bool,
    invalidItems: PropTypes.object,
    errorsByQuestionTab: PropTypes.object.isRequired,
    componentId: PropTypes.string,
  };
  static defaultProps = {
    handleSubmit: undefined,
    onCancel: undefined,
    pristine: false,
    submitting: false,
    updateName: () => {},
    invalidItems: {},
    componentId: '',
  };
  render() {
    const {
      type,
      handleSubmit,
      onCancel,
      submitting,
      errorsByQuestionTab,
      invalidItems,
      updateName,
      componentId,
    } = this.props;
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
    let propsLabelField = {
      name: 'label',
      label: Dictionary.title,
      required: true,
      focusOnInit: true,
    };

    const propsNameField = {
      component: Input,
      name: 'name',
      type: 'text',
      label: Dictionary.name,
      normalize: componentName,
      required: true,
    };

    if (type === QUESTION) {
      // propsLabelField = { ...propsLabelField, component: RichTextareaWithVariableAutoCompletion };
      propsLabelField = {
        ...propsLabelField,
        component: RichTextarea,
        showAddConditions: true,
        submitOnEnter: true,
      };
    } else {
      propsLabelField = { ...propsLabelField, component: Input, type: 'text' };
    }

    return (
      <div className="component-edition">
        <form onSubmit={handleSubmit}>
          <div onBlur={updateName}>
            <Field {...propsLabelField} />
          </div>
          <Field {...propsNameField} />
          <Tabs components={panels} />
          <div className="form-footer">
            <button type="submit" disabled={submitting}>
              {Dictionary.validate}
            </button>
            {onCancel && (
              <button type="reset" className="cancel" disabled={submitting} onClick={onCancel}>
                {Dictionary.cancel}
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'component',
})(QuestionNewEdit);
