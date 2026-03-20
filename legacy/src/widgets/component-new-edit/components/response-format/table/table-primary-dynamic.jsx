import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import {
  DIMENSION_CALCULATION,
  DIMENSION_FORMATS,
} from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';
import ResponseFormatTablePrincipalDynamicSize from './table-primary-dynamic-size';

const { LIST: selectorPath } = DIMENSION_FORMATS;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;

/**
 * In a dynamic table, we must choose whether the size is determinated by
 * a number or a VTL formula.
 */
function ResponseFormatTablePrincipalDynamic({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <div className="axis-primary__panel">
      <FormSection name={selectorPath}>
        <SelectorView
          label={Dictionary.tableLinesCalculationMode}
          selectorPath={selectorPathComposed}
          radio
        >
          <View value={NUMBER} label={Dictionary.tableLinesCalculationNumber}>
            <ResponseFormatTablePrincipalDynamicSize
              type={NUMBER}
              selectorPathParent={selectorPathComposed}
            />
          </View>
          <View value={FORMULA} label={Dictionary.tableLinesCalculationFormula}>
            <ResponseFormatTablePrincipalDynamicSize
              type={FORMULA}
              selectorPathParent={selectorPathComposed}
            />
          </View>
        </SelectorView>
      </FormSection>
    </div>
  );
}

ResponseFormatTablePrincipalDynamic.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatTablePrincipalDynamic.defaultProps = {
  selectorPathParent: '',
};

export default ResponseFormatTablePrincipalDynamic;
