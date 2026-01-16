import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';

import {
  CHOICE_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import ListRadios from '../../../../../forms/controls/list-radios';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { getCurrentSelectorPath } from '../../../../../utils/widget-utils';
import SuggesterLists from '../../../../codes-lists/containers/suggester-lists-container';
import { SelectorView, View } from '../../../../selector-view';
import ResponseFormatSimpleCodeslist from './response-format-single-code-list';
import ResponseFormatSimpleVariable from './response-format-single-variable';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { CODE_LIST, VARIABLE, SUGGESTER: suggesterType } = CHOICE_TYPE;

/** Form to create a QCU. */
function ResponseFormatSingle({
  selectorPathParent,
  showMandatory,
  allowPrecision,
  allowFilter,
  disableSetArbitrary,
}) {
  const selectorPath = SINGLE_CHOICE;

  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

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
        <View
          key={suggesterType}
          value={suggesterType}
          label={Dictionary.suggester}
        >
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
        <View
          key={VARIABLE}
          value={VARIABLE}
          label={Dictionary.variable}
        >
          <ResponseFormatSimpleVariable
            selectorPathParent={selectorPathComposed}
          />
        </View>
      </SelectorView>
    </FormSection>
  );
}

ResponseFormatSingle.propTypes = {
  selectorPathParent: PropTypes.string,
  showMandatory: PropTypes.bool,
  visHint: PropTypes.string,
  type: PropTypes.string,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
  disableSetArbitrary: PropTypes.bool,
  collectedVariableStore: PropTypes.object,
};

ResponseFormatSingle.defaultProps = {
  selectorPathParent: undefined,
  showMandatory: true,
  visHint: undefined,
  type: CODE_LIST,
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
    type: selector(state, `${path}type`),
    allowArbitraryResponse: selector(state, `${path}allowArbitraryResponse`),
  };
};

export default connect(mapStateToProps)(ResponseFormatSingle);
