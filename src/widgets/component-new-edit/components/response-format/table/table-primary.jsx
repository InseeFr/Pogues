import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import {
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
} from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';
import ResponseFormatTablePrincipalDynamic from './table-primary-dynamic';
import ResponseFormatTablePrincipalStatic from './table-primary-static';

const { PRIMARY: selectorPath } = DIMENSION_TYPE;
const { CODES_LIST, LIST } = DIMENSION_FORMATS;

/**
 * A table can have two formats: static or dynamic.
 *
 * If it is static, we pair it to a code list which will determinate the fields.
 *
 * If it is dynamic, its min and max size will be determinated through a fixed
 * number or a VTL formula. For PAPI, in the first case it will have a size of
 * max+1, in the second case it will have an arbitrary size of 6.
 */
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
        {/* Dynamic: a min and max must be set (VTL or number),
                     it can be a fixed length. */}
        <View value={LIST} label={Dictionary.tableDynamicFormat}>
          <ResponseFormatTablePrincipalDynamic
            selectorPathParent={selectorPathComposed}
          />
        </View>
        {/* Static: we pair the primary axis it to a code list. */}
        <View value={CODES_LIST} label={Dictionary.tableStaticFormat}>
          <ResponseFormatTablePrincipalStatic
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
