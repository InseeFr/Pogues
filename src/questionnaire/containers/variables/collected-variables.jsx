import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, actions } from 'redux-form';

import CollectedVariables from 'questionnaire/components/variables/collected-variables';
import {
  QUESTION_TYPE_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  CODES_LIST_INPUT_ENUM,
} from 'constants/pogues-constants';
import { uuid } from 'utils/data-utils';
import Dictionary from 'utils/dictionary/dictionary';
import { removeInvalidItem } from 'actions/app-state';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;
const { NEW, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

function getCollecteVariable(name, label) {
  return {
    id: uuid(),
    name,
    label,
  };
}

function getCollectedVariablesFromCodes(questionName, form, codesListStore) {
  const { [PRIMARY]: { [NEW]: { codes }, [QUESTIONNAIRE]: { codesListId } } } = form;
  let listCodes = codes;

  if (codesListId) {
    const codesStore = codesListStore[codesListId].codes;
    listCodes = Object.keys(codesStore).map(key => codesStore[key]);
  }

  return listCodes.map((c, index) => getCollecteVariable(`${questionName} ${index + 1}`, `${c.value} - ${c.label}`));
}

function generateCollectedVariables(responseFormat, questionName, form, codesListStore) {
  let generatedCollectedVariables = [];

  if (responseFormat === SIMPLE || responseFormat === SINGLE_CHOICE) {
    generatedCollectedVariables = [getCollecteVariable(questionName, `${questionName} label`)];
  } else if (responseFormat === MULTIPLE_CHOICE) {
    generatedCollectedVariables = getCollectedVariablesFromCodes(questionName, form, codesListStore);
  }

  return generatedCollectedVariables;
}

const mapStateToProps = (state, { formName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  const responseFormatType = selector(state, 'responseFormat.type');
  const variablesResponseFormatType = selector(state, `${CollectedVariablesContainer.selectorPath}.responseFormat`);

  return {
    responseFormatType,
    variablesResponseFormatType,
    name: selector(state, 'name'),
    formName,
    form: selector(state, `responseFormat.${responseFormatType}`),
    codesListStore: state.appState.activeCodeListsById,
    invalidItems: state.appState.invalidItemsByActiveQuestion,
  };
};

const mapDispatchToProps = {
  change: actions.change,
  removeInvalidItem,
};

class CollectedVariablesContainer extends Component {
  static selectorPath = 'collectedVariables';
  static propTypes = {
    responseFormatType: PropTypes.string,
    variablesResponseFormatType: PropTypes.string,
    name: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    form: PropTypes.object,
    codesListStore: PropTypes.object,
    change: PropTypes.func.isRequired,
    removeInvalidItem: PropTypes.func.isRequired,
    invalidItems: PropTypes.object,
  };

  static defaultProps = {
    responseFormatType: '',
    variablesResponseFormatType: '',
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

  componentDidMount() {
    const { invalidItems } = this.props;
    const errors = Object.keys(invalidItems)
      .filter(key => invalidItems[key].code === 'NEED_REGENERATE_COLLECTED_VARIABLES')
      .map(key => Dictionary[invalidItems[key].messageKey]);
    this.setValidationErrors(errors);
  }

  componentWillUpdate(nextProps) {
    if (
      nextProps.responseFormatType !== this.props.responseFormatType &&
      nextProps.responseFormatType !== nextProps.variablesResponseFormatType
    ) {
      this.setValidationErrors(['Need regenerate']);
    }
  }

  setValidationErrors(errors = []) {
    this.setState({
      ...this.state,
      errors,
    });
  }

  validate() {
    const { responseFormatType, form, name } = this.props;
    let validationErrors = [];

    if (responseFormatType === '') {
      validationErrors = ['no response format'];
    } else if (name === '') {
      validationErrors = ['no name'];
    } else if (
      responseFormatType === MULTIPLE_CHOICE &&
      !form[PRIMARY][QUESTIONNAIRE].codesListId &&
      form[PRIMARY][NEW].codes.length === 0
    ) {
      validationErrors = ['no codes'];
    }

    this.setValidationErrors(validationErrors);

    return validationErrors.length === 0;
  }

  generateCollectedVariables() {
    const {
      change,
      responseFormatType,
      name,
      form,
      codesListStore,
      formName,
      invalidItems,
      removeInvalidItem,
    } = this.props;

    if (!this.validate()) return;

    const generatedCollectedVariables = generateCollectedVariables(responseFormatType, name, form, codesListStore);

    Object.keys(invalidItems)
      .filter(key => invalidItems[key].code === 'NEED_REGENERATE_COLLECTED_VARIABLES')
      .forEach(key => removeInvalidItem(key));

    change(formName, CollectedVariablesContainer.selectorPath, {
      name: '',
      label: '',
      collectedVariables: generatedCollectedVariables,
      responseFormat: responseFormatType,
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
