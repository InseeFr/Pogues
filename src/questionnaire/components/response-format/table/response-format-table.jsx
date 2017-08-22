import React, { Component } from 'react';
import { FormSection, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dictionary from 'utils/dictionary/dictionary';
import ResponseFormatTablePrimary from './table-primary';
import ResponseFormatTableSecondary from './table-secondary';
import ResponseFormatTableMeasure from './table-measure';
import ResponseFormatTableListMeasures from './table-list-measures';
import { QUESTION_TYPE_ENUM, DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';

const { PRIMARY, SECONDARY } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { TABLE } = QUESTION_TYPE_ENUM;

class ResponseFormatTable extends Component {
  static selectorPath = TABLE;
  static propTypes = {
    onAddCodesList: PropTypes.func.isRequired,
    selectorPathParent: PropTypes.string,
    showSecondaryAxis: PropTypes.bool,
    primaryAxisType: PropTypes.string,
  };
  static defaultProps = {
    selectorPathParent: undefined,
    showSecondaryAxis: false,
    primaryAxisType: LIST,
  };
  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${ResponseFormatTable.selectorPath}`
      : ResponseFormatTable.selectorPath;
  }
  render() {
    const { showSecondaryAxis, primaryAxisType, onAddCodesList } = this.props;
    return (
      <FormSection name={ResponseFormatTable.selectorPath} className="response-format__table">
        <h3 className="axis-primary__head">
          {Dictionary.primaryAxisTable}
        </h3>

        <ResponseFormatTablePrimary selectorPathParent={this.selectorPathComposed} />

        {primaryAxisType === CODES_LIST &&
          <div>
            <h3 className="axis-secondary__head">
              {Dictionary.secondaryAxisTable}
            </h3>
            <ResponseFormatTableSecondary selectorPathParent={this.selectorPathComposed} />
          </div>}

        <h3 className="axis-measure__head">
          {Dictionary.measuresAxisTable}
        </h3>

        {primaryAxisType === LIST || !showSecondaryAxis
          ? <ResponseFormatTableListMeasures
              selectorPathParent={this.selectorPathComposed}
              onAddCodesList={onAddCodesList}
            />
          : <ResponseFormatTableMeasure selectorPathParent={this.selectorPathComposed} />}
      </FormSection>
    );
  }
}

const mapStateToProps = (state, { formName, selectorPathParent }) => {
  formName = formName || 'component';
  const selector = formValueSelector(formName);
  const tablePath = `${selectorPathParent}.${ResponseFormatTable.selectorPath}`;
  return {
    showSecondaryAxis: selector(state, `${tablePath}.${SECONDARY}.showSecondaryAxis`),
    primaryAxisType: selector(state, `${tablePath}.${PRIMARY}.type`),
  };
};

export default connect(mapStateToProps)(ResponseFormatTable);
