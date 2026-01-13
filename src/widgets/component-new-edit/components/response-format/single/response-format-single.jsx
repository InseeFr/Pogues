import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';

import {
  CHOICE_TYPE,
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import ListRadios from '../../../../../forms/controls/list-radios';
import { SelectorView, View } from '../../../../selector-view';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { getCurrentSelectorPath } from '../../../../../utils/widget-utils';
import { CodesLists } from '../../../../codes-lists';
import Select from '../../../../../forms/controls/select';
import SuggesterLists from '../../../../codes-lists/containers/suggester-lists-container';
import ResponseFormatSimpleCodeslist from './response-format-single-code-list'

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { CHECKBOX, RADIO, DROPDOWN, SUGGESTER } = DATATYPE_VIS_HINT;
const { CODE_LIST, VARIABLE_RESPONSES, SUGGESTER: suggesterType } = CHOICE_TYPE;


/** Form to create a QCU. */
function ResponseFormatSingle({
  selectorPathParent,
  showMandatory,
  visHint,
  choiceType,
  allowPrecision,
  allowFilter,
  disableSetArbitrary,
  collectedVariableStore
}) {
  const selectorPath = SINGLE_CHOICE;
  console.log('collectedVariableStore in ResponseFormatSingle', collectedVariableStore);
  
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  console.log('selectorPath', selectorPath);
  console.log('selectorPathComposed', selectorPathComposed);


  //TODO: filter unwanted variables
  // See for a variable container ?
  const variableSourceOptions = Object.values(collectedVariableStore)
  .filter((question) => typeof question === 'object')
  .reduce(
    (acc, questionVariable) => [
      ...acc,
      Object.values(questionVariable)
        .map((collectedVariable) => (
          <GenericOption
            key={collectedVariable.id}
            value={collectedVariable.id}
          >
            {collectedVariable.name} - {collectedVariable.label}
          </GenericOption>
        ))
        .flat(),
    ],
    [],
  );

  return (
    <FormSection name={selectorPath} className="response-format__single">
      <SelectorView
        label={Dictionary.responseType}
        selectorPath={selectorPathComposed}
        radio
      >
        <View key={CODE_LIST} value={CODE_LIST} label={Dictionary.codeList}>
          <ResponseFormatSimpleCodeslist
            selectorPathParent={selectorPathComposed}
            allowPrecision={allowPrecision}
            allowFilter={allowFilter}
            showMandatory={showMandatory}

          />
        </View>
        <View key={suggesterType} value={suggesterType} label={Dictionary.suggester} >
          <SuggesterLists selectorPathParent={selectorPathComposed} />
          {!disableSetArbitrary && (
            <Field
              name="allowArbitraryResponse"
              component={ListRadios}
              label={Dictionary.allowArbitraryResponse}
              required
              // Convert string "true"/"false" to boolean true/false when storing in Redux form
              parse={(value) => value === 'true'}
              // Convert true/false/undefined to string "true"/"false" when displaying the form
              format={(value) => (value === true ? 'true' : 'false')}
            >
              <GenericOption value="true">{Dictionary.yes}</GenericOption>
              <GenericOption value="false">{Dictionary.no}</GenericOption>
            </Field>
          )}
        </View>
        <View key={VARIABLE_RESPONSES} value={VARIABLE_RESPONSES} label={Dictionary.variable}>
          
          <Field
            name="responseVariable"
            component={Select}
            label={Dictionary.selectVariable}
          >
            <GenericOption key= "" value="" >{Dictionary.selectVariable}</GenericOption>
            {variableSourceOptions}
          </Field>
        </View>
      </SelectorView>

      
      {/* <Field
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
      {visHint !== SUGGESTER && (
        <>
          
          {choiceType === CODE_LIST && (
            <CodesLists
              selectorPathParent={selectorPathComposed}
              allowPrecision={allowPrecision}
              allowFilter={allowFilter}
            />
          )}
        </>
      )}
      {visHint === SUGGESTER ? (
        <>
          <SuggesterLists selectorPathParent={selectorPathComposed} />
          {!disableSetArbitrary && (
            <Field
              name="allowArbitraryResponse"
              component={ListRadios}
              label={Dictionary.allowArbitraryResponse}
              required
              // Convert string "true"/"false" to boolean true/false when storing in Redux form
              parse={(value) => value === 'true'}
              // Convert true/false/undefined to string "true"/"false" when displaying the form
              format={(value) => (value === true ? 'true' : 'false')}
            >
              <GenericOption value="true">{Dictionary.yes}</GenericOption>
              <GenericOption value="false">{Dictionary.no}</GenericOption>
            </Field>
          )}
        </>
      ) : (null)} */}
    </FormSection>
  );
}

ResponseFormatSingle.propTypes = {
  selectorPathParent: PropTypes.string,
  showMandatory: PropTypes.bool,
  visHint: PropTypes.string,
  choiceType: PropTypes.string,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
  disableSetArbitrary: PropTypes.bool,
  collectedVariableStore: PropTypes.object,
};

ResponseFormatSingle.defaultProps = {
  selectorPathParent: undefined,
  showMandatory: true,
  visHint: undefined,
  choiceType: CODE_LIST,
  allowPrecision: true,
  allowFilter: true,
  disableSetArbitrary: false,
  collectedVariableStore: {},
};

const mapStateToProps = (state, { selectorPathParent }) => {
  const selector = formValueSelector('component');
  const path = `${getCurrentSelectorPath(selectorPathParent)}${SINGLE_CHOICE}.`;
  return {
    visHint: selector(state, `${path}visHint`),
    choiceType: selector(state, `${path}choiceType`),
    collectedVariableStore: state.appState.collectedVariableByQuestion,
    allowArbitraryResponse: selector(state, `${path}allowArbitraryResponse`),
  };
};

export default connect(mapStateToProps)(ResponseFormatSingle);
