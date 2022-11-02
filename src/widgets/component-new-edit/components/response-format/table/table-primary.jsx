import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { SelectorView, View } from 'widgets/selector-view';
import ResponseFormatTablePrincipalList from './table-primary-list';
import ResponseFormatTablePrincipalCodeslist from './table-primary-codeslist';
import Dictionary from 'utils/dictionary/dictionary';
import { DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';

const { PRIMARY } = DIMENSION_TYPE;
const { CODES_LIST, LIST } = DIMENSION_FORMATS;
const selectorPath = PRIMARY;

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
