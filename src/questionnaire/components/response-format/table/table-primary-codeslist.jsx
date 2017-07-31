import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import CodesList from 'layout/widget/codes-list/codes-list';
import { DIMENSION_FORMATS } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';
import ResponseFormatTableSecondary from './table-secondary';
import ResponseFormatTableMeasure from './table-measure';
import Input from 'layout/forms/controls/input';
import OptionalViewContainer from 'layout/connected-widget/optional-view';

const { CODES_LIST } = DIMENSION_FORMATS;

class ResponseFormatTablePrincipalCodeslist extends Component {
  static selectorPath = CODES_LIST;
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
      ? `${selectorPathParent}.${ResponseFormatTablePrincipalCodeslist.selectorPath}`
      : ResponseFormatTablePrincipalCodeslist.selectorPath;
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
        <FormSection name={ResponseFormatTablePrincipalCodeslist.selectorPath}>
          <CodesList selectorPath={this.selectorPathComposed} />
          <h3 className="axis-secondary__head">
            {Dictionary.secondaryAxisTable}
          </h3>
          <ResponseFormatTableSecondary selectorPathParent={this.selectorPathComposed} />
          {/*<h3 className="axis-measure__head">*/}
            {/*{Dictionary.measuresAxisTable}*/}
          {/*</h3>*/}
          {/*<ResponseFormatTableMeasure selectorPathParent={this.selectorPathComposed} />*/}
        </FormSection>
      </div>
    );
  }
}

export default ResponseFormatTablePrincipalCodeslist;
