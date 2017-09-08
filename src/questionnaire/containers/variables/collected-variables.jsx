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
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;
const { NEW, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

function getCollecteVariable(name, label) {
  return {
    id: uuid(),
    name,
    label,
  };
}

function getCollectedVariablesMultiple(questionName, form, codesListStore) {
  const { [PRIMARY]: { [NEW]: { codes }, [QUESTIONNAIRE]: { codesListId } } } = form;
  let listCodes = codes;

  if (codesListId) {
    const codesStore = codesListStore[codesListId].codes;
    listCodes = Object.keys(codesStore).map(key => codesStore[key]);
  }

  return listCodes.map((c, index) => getCollecteVariable(`${questionName}${index + 1}`, `${c.code} - ${c.label}`));
}

function getCollectedVariablesTable(questionName, form, codesListStore) {
  const collectedVariables = [];
  let codesListState;
  let codesStore;
  let codesStatePrimary;
  let codesStateSecondary;
  let codePrimary;
  let codeSecondary;
  let measure;
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = form;

  if (primaryState.type === CODES_LIST) {
    const {
      [CODES_LIST]: {
        codesListId: codesListIdPrimary,
        [NEW]: { codes: componentCodesStatePrimary },
        [QUESTIONNAIRE]: { codesListId: componentCodesListIdPrimary },
      },
    } = primaryState;

    codesListState = codesListStore[codesListIdPrimary] || codesListStore[componentCodesListIdPrimary] || {};
    codesStore = codesListState.codes || {};
    codesStatePrimary = Object.keys(codesStore).map(key => codesStore[key]);
    if (codesStatePrimary.length === 0) codesStatePrimary = componentCodesStatePrimary;

    if (secondaryState.showSecondaryAxis) {
      const {
        codesListId: codesListIdSecondary,
        [NEW]: { codes: componentCodesStateSecondary },
        [QUESTIONNAIRE]: { codesListId: componentCodesListIdSecondary },
      } = secondaryState;

      codesListState = codesListStore[codesListIdSecondary] || codesListStore[componentCodesListIdSecondary] || {};
      codesStore = codesListState.codes || {};
      codesStateSecondary = Object.keys(codesStore).map(key => codesStore[key]);
      if (codesStateSecondary.length === 0) codesStateSecondary = componentCodesStateSecondary;

      // First case
      for (let i = 0; i < codesStatePrimary.length; i += 1) {
        codePrimary = codesStatePrimary[i];
        for (let j = 0; j < codesStateSecondary.length; j += 1) {
          codeSecondary = codesStateSecondary[j];
          collectedVariables.push(
            getCollecteVariable(
              `${questionName}${i + 1}${j + 1}`,
              `${codePrimary.label}-${codeSecondary.label}-${measureState.label}`
            )
          );
        }
      }
    } else {
      // Second case
      for (let i = 0; i < codesStatePrimary.length; i += 1) {
        codePrimary = codesStatePrimary[i];
        for (let j = 0; j < listMeasuresState.measures.length; j += 1) {
          measure = listMeasuresState.measures[j];
          collectedVariables.push(
            getCollecteVariable(`${questionName}${i + 1}${j + 1}`, `${codePrimary.label}-${measure.label}`)
          );
        }
      }
    }
  } else {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    const numLines = numLinesMax - numLinesMin + 1;

    // Third case
    for (let i = 0; i < numLines; i += 1) {
      for (let j = 0; j < listMeasuresState.measures.length; j += 1) {
        measure = listMeasuresState.measures[j];
        collectedVariables.push(
          getCollecteVariable(`${questionName}${i + 1}${j + 1}`, `Line${i + 1}-${measure.label}`)
        );
      }
    }
  }

  return collectedVariables;
}

function generateCollectedVariables(responseFormat, questionName, form, codesListStore) {
  let generatedCollectedVariables = [];

  if (responseFormat === SIMPLE || responseFormat === SINGLE_CHOICE) {
    generatedCollectedVariables = [getCollecteVariable(questionName, `${questionName} label`)];
  } else if (responseFormat === MULTIPLE_CHOICE) {
    generatedCollectedVariables = getCollectedVariablesMultiple(questionName, form, codesListStore);
  } else if (responseFormat === TABLE) {
    generatedCollectedVariables = getCollectedVariablesTable(questionName, form, codesListStore);
  }

  return generatedCollectedVariables;
}

const mapStateToProps = (state, { formName }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  const responseFormatType = selector(state, 'responseFormat.type');
  // const variablesResponseFormatType = selector(state, `${CollectedVariablesContainer.selectorPath}.responseFormat`);

  return {
    responseFormatType,
    // variablesResponseFormatType,
    name: selector(state, 'name'),
    formName,
    form: selector(state, `responseFormat.${responseFormatType}`),
    codesListStore: state.appState.activeCodeListsById,
    invalidItems: state.appState.invalidItemsByActiveQuestion,
    recreateCollectedVariables: state.appState.recreateCollectedVariables,
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
    name: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    form: PropTypes.object,
    codesListStore: PropTypes.object,
    change: PropTypes.func.isRequired,
    removeInvalidItem: PropTypes.func.isRequired,
    invalidItems: PropTypes.object,
    recreateCollectedVariables: PropTypes.bool,
  };

  static defaultProps = {
    responseFormatType: '',
    // variablesResponseFormatType: '',
    form: {},
    codesListStore: {},
    invalidItems: {},
    recreateCollectedVariables: false,
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
    // if (
    //   nextProps.responseFormatType !== this.props.responseFormatType &&
    //   nextProps.responseFormatType !== nextProps.variablesResponseFormatType
    // ) {
    //   this.setValidationErrors(['Need regenerate']);
    // }
    if (
      nextProps.recreateCollectedVariables !== this.props.recreateCollectedVariables &&
      nextProps.recreateCollectedVariables
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
    // const { responseFormatType, form, name } = this.props;
    // let validationErrors = [];
    //
    // if (responseFormatType === '') {
    //   validationErrors = ['no response format'];
    // } else if (name === '') {
    //   validationErrors = ['no name'];
    // } else if (
    //   responseFormatType === MULTIPLE_CHOICE &&
    //   !form[PRIMARY][QUESTIONNAIRE].codesListId &&
    //   form[PRIMARY][NEW].codes.length === 0
    // ) {
    //   validationErrors = ['no codes'];
    // }
    //
    // this.setValidationErrors(validationErrors);
    //
    // return validationErrors.length === 0;
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
