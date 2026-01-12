import React from 'react';

import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { DIMENSION_TYPE, CHOICE_TYPE } from '../../../../../constants/pogues-constants';
import { CodesLists } from '../../../../codes-lists';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';

const { PRIMARY: selectorPath } = DIMENSION_TYPE;
const { CODE_LIST, VARIABLE_RESPONSES } = CHOICE_TYPE;


function ResponseFormatMultiplePrimary({ selectorPathParent }) {
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
        <View key={CODE_LIST} value={CODE_LIST} label={Dictionary.codeList}>
          <CodesLists
            selectorPathParent={selectorPathComposed}
            allowPrecision={true}
            allowFilter={true}
          />
        </View>
        <View key={VARIABLE_RESPONSES} value={VARIABLE_RESPONSES} label={'VariableResponses'} />
      </SelectorView>
    </FormSection>
  );
}

ResponseFormatMultiplePrimary.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatMultiplePrimary.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatMultiplePrimary;
