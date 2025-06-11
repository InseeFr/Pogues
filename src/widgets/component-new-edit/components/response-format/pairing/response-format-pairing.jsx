import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection } from 'redux-form';

import {
  COMPONENT_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import Select from '../../../../../forms/controls/select';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { CodesLists } from '../../../../codes-lists';

const { SINGLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { QUESTION, LOOP } = COMPONENT_TYPE;
const { LIST } = DIMENSION_FORMATS;

/** Form to create a pairwise. */
function ResponseFormatPairing({
  selectorPathParent,
  responseFormatType,
  componentsStore,
  collectedVariablesStore,
  allowPrecision,
  allowFilter,
}) {
  const selectorPath = responseFormatType;

  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  // The sequences directly depending of the loops
  const loopSequences = Object.values(componentsStore)
    .filter((component) => component.type === LOOP)
    .reduce((acc, loop) => {
      return [
        ...acc,
        Object.values(componentsStore)
          .filter(
            // members are all SEQUENCE or all SUBSEQUENCE
            (component) =>
              component.type === componentsStore[loop.initialMember].type &&
              component.weight >= componentsStore[loop.initialMember].weight &&
              component.weight <= componentsStore[loop.finalMember].weight,
          )
          .map((component) => component.id),
      ];
    }, [])
    .flat();

  // gets the ids of the responses of dynamic arrays and questions in loops
  const RosterVariablesId = Object.values(componentsStore)
    // keep only component (remove root questionnaire, i.e the component where parent is equal to "")
    .filter(
      (component) => component.parent !== '' && component.parent !== undefined,
    )
    .filter(
      (component) =>
        component.type === QUESTION &&
        // dynamic arrays
        ((component.responseFormat.type === TABLE &&
          component.responseFormat.TABLE.PRIMARY.type === LIST) ||
          // questions directly depending on loop loopSequences
          loopSequences.includes(component.parent) ||
          // questions indirectly depending on loop loopSequences
          loopSequences.includes(componentsStore[component.parent]?.parent)),
    )
    .map((q) => q.collectedVariables)
    .flat();

  // reduces from each question and from each question's variable the pairing structure including the id and the name of the RosterVariablesId
  const pairingSourceVariable = Object.values(collectedVariablesStore)
    .filter((question) => typeof question === 'object')
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

  return (
    <FormSection name={selectorPath} className="response-format__single">
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
      <CodesLists
        selectorPathParent={selectorPathComposed}
        allowPrecision={allowPrecision}
        allowFilter={allowFilter}
      />
    </FormSection>
  );
}

ResponseFormatPairing.propTypes = {
  selectorPathParent: PropTypes.string,
  responseFormatType: PropTypes.string,
  componentsStore: PropTypes.object,
  collectedVariablesStore: PropTypes.object,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
};

ResponseFormatPairing.defaultProps = {
  selectorPathParent: undefined,
  responseFormatType: SINGLE_CHOICE,
  componentsStore: {},
  collectedVariablesStore: {},
  allowPrecision: true,
  allowFilter: true,
};

const mapStateToProps = (state) => {
  return {
    componentsStore: state.appState.activeComponentsById,
    collectedVariablesStore: state.appState.collectedVariableByQuestion,
  };
};

export default connect(mapStateToProps)(ResponseFormatPairing);
