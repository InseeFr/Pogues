import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import ResponseFormatTablePrimary from './table-primary';
import ResponseFormatTableSecondary from './table-secondary';
import ResponseFormatTableMeasures from './table-measures';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { TABLE } = QUESTION_TYPE_ENUM;

class ResponseFormatTable extends Component {
  static selectorPath = TABLE;
  static propTypes = {
    selectorPathParent: PropTypes.string,
  };
  static defaultProps = {
    selectorPathParent: undefined,
  };
  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${ResponseFormatTable.selectorPath}`
      : ResponseFormatTable.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatTable.selectorPath} className="response-format__table">
        <h3 className="axis-primary__head">
          {Dictionary.primaryAxisTable}
        </h3>
        <ResponseFormatTablePrimary selectorPathParent={this.selectorPathComposed} />
        <h3 className="axis-secondary__head">
          {Dictionary.secondaryAxisTable}
        </h3>
        <ResponseFormatTableSecondary selectorPathParent={this.selectorPathComposed} />
        <h3 className="axis-measure__head">
          {Dictionary.measuresAxisTable}
        </h3>
        <ResponseFormatTableMeasures selectorPathParent={this.selectorPathComposed} />
      </FormSection>
    );
  }
}

export default ResponseFormatTable;
