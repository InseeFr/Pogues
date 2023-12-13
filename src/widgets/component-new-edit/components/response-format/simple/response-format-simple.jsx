import React from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
} from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';
import ResponseFormatDatatypeNumeric from './simple-numeric';
import ResponseFormatDatatypeText from './simple-text';
import ResponseFormatDatatypeDate from './simple-date';
import ResponseFormatDatatypeDuree from './simple-duree';

const { DATE, NUMERIC, TEXT, BOOLEAN, DURATION } = DATATYPE_NAME;
const { SIMPLE: selectorPath } = QUESTION_TYPE_ENUM;

function ResponseFormatSimple({ selectorPathParent, showMandatory, required }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  const styleMandatory = {
    display: showMandatory ? 'block' : 'none',
  };

  return (
    <FormSection name={selectorPath} className="response-format__simple">
      <div className="ctrl-checkbox" style={styleMandatory}>
        <label htmlFor="rf-simple-mandatory">{Dictionary.mandatory}</label>
        <div>
          <Field
            name="mandatory"
            id="rf-simple-mandatory"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <SelectorView
        label={Dictionary.responseType}
        selectorPath={selectorPathComposed}
      >
        <View key={TEXT} value={TEXT} label={Dictionary.TEXT}>
          <ResponseFormatDatatypeText />
        </View>
        <View key={DATE} value={DATE} label={Dictionary.DATE}>
          <ResponseFormatDatatypeDate />
        </View>
        <View key={NUMERIC} value={NUMERIC} label={Dictionary.NUMERIC}>
          <ResponseFormatDatatypeNumeric required={!!required} />
        </View>
        <View key={BOOLEAN} value={BOOLEAN} label={Dictionary.BOOLEAN} />
        <View key={DURATION} value={DURATION} label={Dictionary.DURATION}>
          <ResponseFormatDatatypeDuree />
        </View>
      </SelectorView>
    </FormSection>
  );
}

ResponseFormatSimple.propTypes = {
  selectorPathParent: PropTypes.string,
  showMandatory: PropTypes.bool,
};
ResponseFormatSimple.defaultProps = {
  selectorPathParent: undefined,
  showMandatory: true,
};

export default ResponseFormatSimple;
