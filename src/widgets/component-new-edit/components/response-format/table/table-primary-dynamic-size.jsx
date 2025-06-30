import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import {
  DIMENSION_CALCULATION,
  DIMENSION_LENGTH,
} from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';
import ResponseFormatTablePrincipalDynamicArray from './table-primary-dynamic-array';
import ResponseFormatTablePrincipalDynamicFixed from './table-primary-dynamic-fixed';

const { DYNAMIC_FIXED, DYNAMIC_LENGTH } = DIMENSION_LENGTH;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;

/**
 * In a dynamic table, the number of lines can be fixed or vary between a min
 * and a max.
 *
 * In PAPI it will be 6 regardless of the provided value.
 */
export function ResponseFormatTablePrincipalDynamicSize({
  type,
  selectorPathParent,
}) {
  const selectorPath = type;
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <SelectorView
        label={Dictionary.tableLinesSameMinMax}
        selectorPath={selectorPathComposed}
        radio
      >
        <View value={DYNAMIC_FIXED} label={Dictionary.yes}>
          <ResponseFormatTablePrincipalDynamicFixed
            type={type}
            selectorPathParent={selectorPathComposed}
          />
        </View>
        <View value={DYNAMIC_LENGTH} label={Dictionary.no}>
          <ResponseFormatTablePrincipalDynamicArray
            type={type}
            selectorPathParent={selectorPathComposed}
          />
        </View>
      </SelectorView>
    </FormSection>
  );
}

ResponseFormatTablePrincipalDynamicSize.propTypes = {
  selectorPathParent: PropTypes.string,
  type: PropTypes.oneOf([FORMULA, NUMBER]),
};

ResponseFormatTablePrincipalDynamicSize.defaultProps = {
  selectorPathParent: '',
  type: NUMBER,
};

export default ResponseFormatTablePrincipalDynamicSize;
