import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { change, FormSection, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

import {
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
  COMPONENT_TYPE,
  DIMENSION_FORMATS,
  CODES_LIST_INPUT_ENUM,
  DEFAULT_FORM_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';
import { CodesLists } from 'widgets/codes-lists';
import { getCurrentSelectorPath } from 'utils/widget-utils';
import Dictionary from 'utils/dictionary/dictionary';
import GenericOption from 'forms/controls/generic-option';
import ListRadios from 'forms/controls/list-radios';
import Select from 'forms/controls/select';
import SuggesterLists from 'widgets/codes-lists/containers/suggester-lists-container';

const { SINGLE_CHOICE, PAIRING, TABLE } = QUESTION_TYPE_ENUM;
const { CHECKBOX, RADIO, DROPDOWN, SUGGESTER } = DATATYPE_VIS_HINT;
const { QUESTION, LOOP } = COMPONENT_TYPE;
const { LIST } = DIMENSION_FORMATS;
const { REF } = CODES_LIST_INPUT_ENUM;

function ResponseFormatSingle({
  selectorPathParent,
  responseFormatType,
  showMandatory,
  componentsStore,
  collectedVariablesStore,
  visHint,
  path,
  formName,
}) {
  const selectorPath = responseFormatType;

  const styleMandatory = {
    display: showMandatory ? 'block' : 'none',
  };
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  // The sequences directly depending of the loops
  const loopSequences = Object.values(componentsStore)
    .filter(component => component.type === LOOP)
    .reduce((acc, loop) => {
      return [
        ...acc,
        Object.values(componentsStore)
          .filter(
            // members are all SEQUENCE or all SUBSEQUENCE
            component =>
              component.type === componentsStore[loop.initialMember].type &&
              component.weight >= componentsStore[loop.initialMember].weight &&
              component.weight <= componentsStore[loop.finalMember].weight,
          )
          .map(component => component.id),
      ];
    }, [])
    .flat();

  // gets the ids of the responses of dynamic arrays and questions in loops
  const RosterVariablesId = Object.values(componentsStore)
    .filter(
      component =>
        component.type === QUESTION &&
        // dynamic arrays
        ((component.responseFormat.type === TABLE &&
          component.responseFormat.TABLE.PRIMARY.type === LIST) ||
          // questions directly depending on loop loopSequences
          loopSequences.includes(component.parent) ||
          // questions indirectly depending on loop loopSequences
          loopSequences.includes(componentsStore[component.parent].parent)),
    )
    .map(q => q.collectedVariables)
    .flat();

  // reduces from each question and from each question's variable the pairing structure including the id and the name of the RosterVariablesId
  const pairingSourceVariable = Object.values(collectedVariablesStore)
    .filter(question => typeof question === 'object')
    .reduce(
      (acc, questionVariable) => [
        ...acc,
        Object.values(questionVariable)
          .reduce(
            (acc2, collectedVariable) =>
              RosterVariablesId.includes(collectedVariable.id)
                ? [
                    ...acc2,
                    <GenericOption
                      key={collectedVariable.id}
                      value={collectedVariable.id}
                    >
                      {collectedVariable.name}
                    </GenericOption>,
                  ]
                : acc2,
            [],
          )
          .flat(),
      ],
      [],
    );

  useEffect(() => {
    if (visHint === SUGGESTER) {
      change(formName, `${path}${DEFAULT_CODES_LIST_SELECTOR_PATH}.panel`, REF);
    }
  }, [formName, path, visHint]);

  return (
    <FormSection name={selectorPath} className="response-format__single">
      <div className="ctrl-checkbox" style={styleMandatory}>
        <label htmlFor="rf-single-mandatory">{Dictionary.mandatory}</label>
        <div>
          <Field
            name="mandatory"
            id="rf-single-mandatory"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      {responseFormatType === PAIRING ? (
        <Field
          name="scope"
          component={Select}
          label={Dictionary.pairingSourceVariable}
          required
        >
          <GenericOption key="" value="">
            {Dictionary.selectBasedOn}
          </GenericOption>
          {pairingSourceVariable}
        </Field>
      ) : (
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
          <GenericOption key={SUGGESTER} value={SUGGESTER}>
            {Dictionary.suggester}
          </GenericOption>
        </Field>
      )}
      {visHint === SUGGESTER ? (
        <SuggesterLists selectorPathParent={selectorPathComposed} />
      ) : (
        <CodesLists selectorPathParent={selectorPathComposed} />
      )}
    </FormSection>
  );
}

ResponseFormatSingle.propTypes = {
  selectorPathParent: PropTypes.string,
  responseFormatType: PropTypes.string,
  showMandatory: PropTypes.bool,
  componentsStore: PropTypes.object,
  collectedVariablesStore: PropTypes.object,
  formName: PropTypes.string,
};

ResponseFormatSingle.defaultProps = {
  selectorPathParent: undefined,
  responseFormatType: SINGLE_CHOICE,
  showMandatory: true,
  componentsStore: {},
  collectedVariablesStore: {},
  formName: DEFAULT_FORM_NAME,
};

const mapStateToProps = (state, { selectorPathParent, responseFormatType }) => {
  const selector = formValueSelector('component');
  const path = `${getCurrentSelectorPath(selectorPathParent)}${
    responseFormatType ?? SINGLE_CHOICE
  }.`;
  return {
    componentsStore: state.appState.activeComponentsById,
    collectedVariablesStore: state.appState.collectedVariableByQuestion,
    visHint: selector(state, `${path}visHint`),
    path,
  };
};

export default connect(mapStateToProps)(ResponseFormatSingle);
