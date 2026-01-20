import React from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import {
  DATATYPE_VIS_HINT,
  DEFAULT_VARIABLE_SELECTOR_PATH,
  DEFAULT_FORM_NAME,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Select from '@/forms/controls/select';
import ListRadios from '@/forms/controls/list-radios';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { VariablesList } from '../../../../codes-lists/variables';
import { getCurrentSelectorPath } from '../../../../../utils/widget-utils';
import { getQuestionnaireScope } from '../../variables/utils-loops';


const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;

const selectorPath = DEFAULT_VARIABLE_SELECTOR_PATH;

function ResponseFormatSimpleVariable({ 
  selectorPathParent, 
  selectedScope,
  componentsStore,
  externalLoopsStore
}) {
  const scopesTest = getQuestionnaireScope(componentsStore, externalLoopsStore)

  const scopeOptions = Object.values(scopesTest || {}).map((scope) => (
    <GenericOption key={scope.id} value={scope.id}>
      {scope.label || scope.name}
    </GenericOption>
  ));

  return (
    <>
      <FormSection name={selectorPath}>
        <Field
          name="scope"
          component={Select}
          label={Dictionary.selectLoop}
          required
        >
          <GenericOption key="" value="">
            {Dictionary.selectLoop}
          </GenericOption>
          {scopeOptions}
        </Field>
      </FormSection>

      <VariablesList 
        selectorPathParent={selectorPathParent} 
        scope={selectedScope} 
      />

        <Field
          name="visHint"
          component={ListRadios}
          label={Dictionary.visHint}
          required
      >
        <GenericOption key={RADIO} value={RADIO}>
            {Dictionary.radio}
          </GenericOption>
          <GenericOption key={CHECKBOX} value={CHECKBOX}>
            {Dictionary.checkbox}
          </GenericOption>
          
          <GenericOption key={DROPDOWN} value={DROPDOWN}>
            {Dictionary.dropdown}
          </GenericOption>
        </Field>
    </>
  );
}

ResponseFormatSimpleVariable.propTypes = {
  selectorPathParent: PropTypes.string,
  selectedScope: PropTypes.string,
  componentStore: PropTypes.object,
  externalLoopsStore: PropTypes.object,
};

ResponseFormatSimpleVariable.defaultProps = {
  selectorPathParent: undefined,
  selectedScope: '',
  componentStore: {},
  externalLoopsStore: {},
};

const mapStateToProps = (state, { selectorPathParent }) => {
  const selector = formValueSelector(DEFAULT_FORM_NAME);
  const path = `${getCurrentSelectorPath(selectorPathParent)}${selectorPath}.`;
  const externalLoopsAvailable =
    state.metadataByType.externalQuestionnairesLoops || {};
  const externalQuestionnnairesId =
    state.appState.activeQuestionnaire.childQuestionnaireRef || [];
  const externalLoopsWanted = Object.keys(externalLoopsAvailable)
    .filter((key) => externalQuestionnnairesId.includes(key))
    .reduce((acc, key) => [...acc, ...externalLoopsAvailable[key].loops], []);
  return {
    selectedScope: selector(state, `${path}scope`) || '',
    externalLoopsStore: externalLoopsWanted,
    componentsStore: state.appState.activeComponentsById || {},
  };
};

export default connect(mapStateToProps)(ResponseFormatSimpleVariable);
