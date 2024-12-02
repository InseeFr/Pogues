import React from 'react';

import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import {
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
} from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';
import ResponseFormatTablePrincipalCodeslist from './table-primary-codeslist';
import ResponseFormatTablePrincipalList from './table-primary-list';

const { PRIMARY: selectorPath } = DIMENSION_TYPE;
const { CODES_LIST, LIST } = DIMENSION_FORMATS;

function ResponseFormatTablePrincipal({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <SelectorView
        label={Dictionary.primaryFormat}
        selectorPath={selectorPathComposed}
        radio
      >
        <View key={LIST} value={LIST} label={Dictionary.list}>
          <ResponseFormatTablePrincipalList
            selectorPathParent={selectorPathComposed}
          />
        </View>
        <View key={CODES_LIST} value={CODES_LIST} label={Dictionary.codeList}>
          <ResponseFormatTablePrincipalCodeslist
            selectorPathParent={selectorPathComposed}
          />
        </View>
      </SelectorView>
    </FormSection>
  );
}

ResponseFormatTablePrincipal.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatTablePrincipal.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatTablePrincipal;
