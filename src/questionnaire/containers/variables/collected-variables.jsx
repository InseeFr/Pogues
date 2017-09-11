import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CollectedVariables from 'questionnaire/components/variables/collected-variables';
import { generateCollectedVariables } from 'utils/model/model-utils';

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
    invalidItems: state.appState.invalidItemsByActiveQuestion,
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
    invalidItems: PropTypes.object,
  };

  static defaultProps = {
    responseFormatType: '',
    form: {},
    codesListStore: {},
    invalidItems: {},
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

    const generatedCollectedVariables = generateCollectedVariables(responseFormatType, name, form, codesListStore);

    change(formName, CollectedVariablesContainer.selectorPath, {
      name: '',
      label: '',
      collectedVariables: generatedCollectedVariables,
    });
  }

  render() {
    return (
      <CollectedVariables
        selectorPath={CollectedVariablesContainer.selectorPath}
        invalidItems={this.props.invalidItems}
        generateCollectedVariables={this.generateCollectedVariables}
        errors={this.state.errors}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectedVariablesContainer);
