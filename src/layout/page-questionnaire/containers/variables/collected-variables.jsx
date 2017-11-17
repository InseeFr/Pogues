import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CollectedVariables from '../../components/variables/collected-variables';
import { generateCollectedVariables } from 'utils/variables/collected-variables-utils';
import { name as validateName, nameSize, requiredSelect, required } from 'forms/validation-rules';
import Dictionary from 'utils/dictionary/dictionary';

function validationGenerate(values) {
  const { name, responseFormatType } = values;
  const errors = [];
  const invalidName = validateName(name);
  const tooLongName = nameSize(name);
  const requiredName = required(name);
  const responseFormatRequired = requiredSelect(responseFormatType);

  if (invalidName) errors.push(invalidName);
  if (tooLongName) errors.push(tooLongName);
  if (requiredName) errors.push(Dictionary.validation_question_name_required);
  if (responseFormatRequired) errors.push(Dictionary.validation_response_format_required);

  return errors;
}

const mapStateToProps = (state, { formName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  const responseFormatType = selector(state, 'responseFormat.type');

  return {
    responseFormatType,
    name: selector(state, 'name'),
    formName,
    form: selector(state, `responseFormat.${responseFormatType}`),
    codesListStore: state.appState.activeCodeListsById,
  };
};

const mapDispatchToProps = {
  change: actions.change,
};

class CollectedVariablesContainer extends Component {
  static selectorPath = 'collectedVariables';
  static propTypes = {
    responseFormatType: PropTypes.string,
    name: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    form: PropTypes.object,
    codesListStore: PropTypes.object,
    change: PropTypes.func.isRequired,
  };

  static defaultProps = {
    responseFormatType: '',
    form: {},
    codesListStore: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
    this.generateCollectedVariables = this.generateCollectedVariables.bind(this);
  }

  generateCollectedVariables() {
    const { change, responseFormatType, name, form, codesListStore, formName } = this.props;
    const errors = validationGenerate({ name, responseFormatType });

    this.setState({ errors });

    if (errors.length === 0) {
      const generatedCollectedVariables = generateCollectedVariables(responseFormatType, name, form, codesListStore);

      change(formName, CollectedVariablesContainer.selectorPath, {
        name: '',
        label: '',
        collectedVariables: generatedCollectedVariables,
      });
    }
  }

  render() {
    return (
      <CollectedVariables
        selectorPath={CollectedVariablesContainer.selectorPath}
        generateCollectedVariables={this.generateCollectedVariables}
        errors={this.state.errors}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectedVariablesContainer);
