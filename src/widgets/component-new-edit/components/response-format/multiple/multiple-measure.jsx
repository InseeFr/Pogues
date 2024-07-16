import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { SelectorView, View } from '../../../../selector-view';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
} from '../../../../../constants/pogues-constants';
import ResponseFormatMultipleMeasureCodeslist from './multiple-measure-codeslist';

const { MEASURE: selectorPath } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;

function ResponseFormatMultipleMeasure({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <SelectorView
        label={Dictionary.responseType}
        selectorPath={selectorPathComposed}
        radio
      >
        <View key={CODES_LIST} value={CODES_LIST} label={Dictionary.codeList}>
          <ResponseFormatMultipleMeasureCodeslist
            selectorPathParent={selectorPathComposed}
          />
        </View>
        <View key={BOOL} value={BOOL} label={Dictionary.boolean} />
      </SelectorView>
    </FormSection>
  );
}

ResponseFormatMultipleMeasure.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatMultipleMeasure.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatMultipleMeasure;
