import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatTablePrincipalCodeslist from './table-primary-codeslist';
import ResponseFormatTablePrincipalList from './table-primary-list';
import Dictionary from 'utils/dictionary/dictionary';
import { DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';
import Input from 'layout/forms/controls/input';
import OptionalViewContainer from 'layout/connected-widget/optional-view';

const { PRIMARY } = DIMENSION_TYPE;
const { CODES_LIST, LIST } = DIMENSION_FORMATS;

class ResponseFormatTablePrincipal extends Component {
  static selectorPath = PRIMARY;
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
        id: `response-format-table-primary-list`,
        label: Dictionary.list,
        value: LIST,
        content: <ResponseFormatTablePrincipalList selectorPathParent={this.selectorPathComposed} />,
      },
      {
        id: `response-format-table-primary-listcodes`,
        label: Dictionary.codeList,
        value: CODES_LIST,
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
        <OptionalViewContainer
          name="showTotalLabel"
          label={Dictionary.rowTotal}
          selectorPath={ResponseFormatTablePrincipal.selectorPath}
          view={<Field name="totalLabel" type="text" component={Input} label={Dictionary.rowTotalLabel} />}
        />
      </FormSection>
    );
  }
}

export default ResponseFormatTablePrincipal;
