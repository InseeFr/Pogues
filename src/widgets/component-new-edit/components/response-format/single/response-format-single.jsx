import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';

import {
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
} from '../../../../../constants/pogues-constants';
import GenericOption from '../../../../../forms/controls/generic-option';
import ListRadios from '../../../../../forms/controls/list-radios';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { getCurrentSelectorPath } from '../../../../../utils/widget-utils';
import { CodesLists } from '../../../../codes-lists';
import SuggesterLists from '../../../../codes-lists/containers/suggester-lists-container';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { CHECKBOX, RADIO, DROPDOWN, SUGGESTER } = DATATYPE_VIS_HINT;

/** Form to create a QCU. */
function ResponseFormatSingle({
  selectorPathParent,
  showMandatory,
  visHint,
  allowPrecision,
  allowFilter,
  disableSetArbitrary,
}) {
  const selectorPath = SINGLE_CHOICE;

  const styleMandatory = {
    display: showMandatory ? 'block' : 'none',
  };
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath} className="response-format__single">
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
      {visHint !== SUGGESTER && (
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
      ) : (
        <CodesLists
          selectorPathParent={selectorPathComposed}
          allowPrecision={allowPrecision && visHint !== DROPDOWN}
          allowFilter={allowFilter}
        />
      )}
    </FormSection>
  );
}

ResponseFormatSingle.propTypes = {
  selectorPathParent: PropTypes.string,
  showMandatory: PropTypes.bool,
  visHint: PropTypes.string,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
  disableSetArbitrary: PropTypes.bool,
};

ResponseFormatSingle.defaultProps = {
  selectorPathParent: undefined,
  showMandatory: true,
  visHint: undefined,
  allowPrecision: true,
  allowFilter: true,
  disableSetArbitrary: false,
};

const mapStateToProps = (state, { selectorPathParent }) => {
  const selector = formValueSelector('component');
  const path = `${getCurrentSelectorPath(selectorPathParent)}${SINGLE_CHOICE}.`;
  return {
    visHint: selector(state, `${path}visHint`),
    allowArbitraryResponse: selector(state, `${path}allowArbitraryResponse`),
  };
};

export default connect(mapStateToProps)(ResponseFormatSingle);
