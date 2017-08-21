import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import { required, minValue } from 'layout/forms/validation-rules';
import { DIMENSION_FORMATS } from 'constants/pogues-constants';

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
    return (
      <div className="axis-primary__panel">
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
        </FormSection>
      </div>
    );
  }
}

export default ResponseFormatTablePrincipalList;
