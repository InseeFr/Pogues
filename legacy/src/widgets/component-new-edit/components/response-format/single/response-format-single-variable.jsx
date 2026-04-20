import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection } from 'redux-form';
import { formValueSelector } from 'redux-form';

import { InputWithVariableAutoCompletion } from '@/forms/controls/control-with-suggestions';
import ListRadios from '@/forms/controls/list-radios';
import Select from '@/forms/controls/select';

import {
  DATATYPE_VIS_HINT,
  DEFAULT_FORM_NAME,
  DEFAULT_VARIABLE_SELECTOR_PATH,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { getCurrentSelectorPath } from '../../../../../utils/widget-utils';
import { VariablesList } from '../../../../codes-lists/variables';
import { getQuestionnaireScope } from '../../variables/utils-loops';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;

const selectorPath = DEFAULT_VARIABLE_SELECTOR_PATH;

function ResponseFormatSingleVariable({
  selectorPathParent,
  selectedScope,
  componentsStore,
  externalLoopsStore,
}) {
  const scopes = getQuestionnaireScope(componentsStore, externalLoopsStore);

  const scopeOptions = Object.values(scopes || {}).map((scope) => (
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

      <FormSection name={selectorPath}>
        <Field
          name="optionFilter"
          type="text"
          component={InputWithVariableAutoCompletion}
          label={Dictionary.modalityFilter}
          required={false}
        />
      </FormSection>

      <Field
        name="visHint"
        component={ListRadios}
        label={Dictionary.visHint}
        required
      >
        <GenericOption key={RADIO} value={RADIO}>
          {Dictionary.radio}
        </GenericOption>
        <GenericOption key={DROPDOWN} value={DROPDOWN}>
          {Dictionary.dropdown}
        </GenericOption>
        <GenericOption key={CHECKBOX} value={CHECKBOX}>
          {Dictionary.checkbox}
        </GenericOption>
      </Field>
    </>
  );
}

ResponseFormatSingleVariable.propTypes = {
  selectorPathParent: PropTypes.string,
  selectedScope: PropTypes.string,
  componentsStore: PropTypes.object,
  externalLoopsStore: PropTypes.object,
};

ResponseFormatSingleVariable.defaultProps = {
  selectorPathParent: undefined,
  selectedScope: '',
  componentsStore: {},
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

export default connect(mapStateToProps)(ResponseFormatSingleVariable);
