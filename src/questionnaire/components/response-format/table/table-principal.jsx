import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatTablePrincipalCodeslist from './table-principal-codeslist';
import ResponseFormatTablePrincipallist from './table-principal-list';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import OptionalView from 'layout/widget/optional-view';
import { required } from 'layout/forms/validation-rules';

class ResponseFormatTablePrincipal extends Component {
  static selectorPath = 'AXISPRINCIPAL';
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
      ? `${selectorPathParent}.${ResponseFormatTablePrincipal.selectorPath}`
      : ResponseFormatTablePrincipal.selectorPath;
  }
  render() {
    const responseFormatTypes = [
      {
        id: `response-format-table-principal-list`,
        label: Dictionary.list,
        value: 'LIST',
        content: <ResponseFormatTablePrincipallist selectorPathParent={this.selectorPathComposed} />,
      },
      {
        id: `response-format-table-principal-listcodes`,
        label: Dictionary.codeList,
        value: 'CODESLIST',
        content: <ResponseFormatTablePrincipalCodeslist selectorPathParent={this.selectorPathComposed} />,
      },
    ];

    return (
      <FormSection name={ResponseFormatTablePrincipal.selectorPath}>
        <ComponentSelectoryByTypeContainer
          label={Dictionary.primaryFormat}
          components={responseFormatTypes}
          selectorPath={this.selectorPathComposed}
          radio
        />
        <OptionalView
          name="showTotalLabel"
          label={Dictionary.rowTotal}
          view={
            <Field
              name="totalLabel"
              type="text"
              component={Input}
              label={Dictionary.rowTotalLabel}
              validate={[required]}
              required
            />
          }
        />
      </FormSection>
    );
  }
}

export default ResponseFormatTablePrincipal;
