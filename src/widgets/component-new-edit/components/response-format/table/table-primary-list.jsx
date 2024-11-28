import React from 'react';

import { FormSection } from 'redux-form';

import {
  DIMENSION_FORMATS,
  DIMENSION_LENGTH,
} from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';
import { ResponseFormatTablePrincipalListDynamic } from './table-primary-list-dynamic';
import { ResponseFormatTablePrincipalListFixed } from './table-primary-list-fixed';

const { LIST: selectorPath } = DIMENSION_FORMATS;
const { DYNAMIC_LENGTH, FIXED_LENGTH } = DIMENSION_LENGTH;

export default function ResponseFormatTablePrincipalList({
  selectorPathParent,
}) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <div className="axis-primary__panel">
      <FormSection name={selectorPath}>
        <SelectorView
          label={Dictionary.linesNbCalculation}
          selectorPath={selectorPathComposed}
          radio
        >
          <View
            key={DYNAMIC_LENGTH}
            value={DYNAMIC_LENGTH}
            label={Dictionary.minMax}
          >
            <ResponseFormatTablePrincipalListDynamic />
          </View>
          <View
            key={FIXED_LENGTH}
            value={FIXED_LENGTH}
            label={Dictionary.formula}
          >
            <ResponseFormatTablePrincipalListFixed />
          </View>
        </SelectorView>
      </FormSection>
    </div>
  );
}
