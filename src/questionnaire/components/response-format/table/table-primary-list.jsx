import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import { required, minValue } from 'layout/forms/validation-rules';
import { DIMENSION_FORMATS } from 'constants/pogues-constants';
import ResponseFormatTableListMeasures from './table-list-measures';
import OptionalViewContainer from 'layout/connected-widget/optional-view';

const { LIST } = DIMENSION_FORMATS;

class ResponseFormatTablePrincipalList extends Component {
  static selectorPath = LIST;
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
      ? `${selectorPathParent}.${ResponseFormatTablePrincipalList.selectorPath}`
      : ResponseFormatTablePrincipalList.selectorPath;
  }
  render() {
    const { selectorPathParent } = this.props;
    return (
      <div className="axis-primary__panel">
        <OptionalViewContainer
          name="showTotalLabel"
          label={Dictionary.rowTotal}
          selectorPath={selectorPathParent}
          view={<Field name="totalLabel" type="text" component={Input} label={Dictionary.rowTotalLabel} />}
        />
        <FormSection name={ResponseFormatTablePrincipalList.selectorPath}>
          <Field
            name="numLinesMin"
            type="number"
            component={Input}
            label={Dictionary.minRowNb}
            validate={[required, minValue(0)]}
            required
          />
          <Field
            name="numLinesMax"
            type="number"
            component={Input}
            label={Dictionary.maxRowNb}
            validate={[required, minValue(1)]}
            required
          />
          <h3 className="axis-measure__head">
            {Dictionary.measuresAxisTable}
          </h3>
        </FormSection>
        <ResponseFormatTableListMeasures selectorPathParent={this.selectorPathComposed} />
      </div>
    );
  }
}

export default ResponseFormatTablePrincipalList;
