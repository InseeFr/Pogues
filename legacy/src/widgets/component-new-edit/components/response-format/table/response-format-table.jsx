import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormSection, formValueSelector } from 'redux-form';

import {
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import TableListMeasures from './table-list-measures';
import ResponseFormatTableMeasure from './table-measure';
import ResponseFormatTablePrimary from './table-primary';
import ResponseFormatTableSecondary from './table-secondary';

const { PRIMARY, SECONDARY } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { TABLE } = QUESTION_TYPE_ENUM;
const selectorPath = TABLE;

/**
 * Form used to create a table.
 */
function ResponseFormatTable({
  selectorPathParent,
  showSecondaryAxis,
  primaryAxisType,
  addErrors,
}) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath} className="response-format__table">
      <h3 className="axis-primary__head">{Dictionary.primaryAxisTable}</h3>
      <ResponseFormatTablePrimary selectorPathParent={selectorPathComposed} />
      {primaryAxisType === CODES_LIST && (
        <div>
          <h3 className="axis-secondary__head">
            {Dictionary.secondaryAxisTable}
          </h3>
          <ResponseFormatTableSecondary
            selectorPathParent={selectorPathComposed}
          />
        </div>
      )}
      <h3 className="axis-measure__head">{Dictionary.measuresAxisTable}</h3>
      {primaryAxisType === LIST || !showSecondaryAxis ? (
        <TableListMeasures
          selectorPath={`${selectorPathComposed}.LIST_MEASURE`}
          addErrors={addErrors}
          disableSetConditionFilter={primaryAxisType === CODES_LIST}
          disableSetConditionReadOnly={primaryAxisType === CODES_LIST}
        />
      ) : (
        <ResponseFormatTableMeasure
          selectorPathParent={selectorPathComposed}
          disableSetConditionFilter={true}
          disableSetConditionReadOnly={true}
        />
      )}
    </FormSection>
  );
}

const mapStateToProps = (state, { formName, selectorPathParent }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  return {
    showSecondaryAxis: selector(
      state,
      `${selectorPathParent}.${TABLE}.${SECONDARY}.showSecondaryAxis`,
    ),
    primaryAxisType: selector(
      state,
      `${selectorPathParent}.${TABLE}.${PRIMARY}.type`,
    ),
  };
};

ResponseFormatTable.propTypes = {
  selectorPathParent: PropTypes.string,
  showSecondaryAxis: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  primaryAxisType: PropTypes.string,
  addErrors: PropTypes.func.isRequired,
};

ResponseFormatTable.defaultProps = {
  selectorPathParent: undefined,
  showSecondaryAxis: false,
  primaryAxisType: LIST,
};

export default connect(mapStateToProps)(ResponseFormatTable);
