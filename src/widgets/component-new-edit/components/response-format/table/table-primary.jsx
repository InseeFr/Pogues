import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { SelectorView, View } from 'widgets/selector-view';
import ResponseFormatTablePrincipalList from './table-primary-list';
import ResponseFormatTablePrincipalCodeslist from './table-primary-codeslist';
import Dictionary from 'utils/dictionary/dictionary';
import { DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';
import Input from 'forms/controls/input';
import { OptionalView } from 'widgets/optional-view';

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
    return (
      <FormSection name={ResponseFormatTablePrincipal.selectorPath}>
        <SelectorView
          label={Dictionary.primaryFormat}
          selectorPath={this.selectorPathComposed}
          radio
        >
          <View key={LIST} value={LIST} label={Dictionary.list}>
            <ResponseFormatTablePrincipalList
              selectorPathParent={this.selectorPathComposed}
            />
          </View>
          <View key={CODES_LIST} value={CODES_LIST} label={Dictionary.codeList}>
            <ResponseFormatTablePrincipalCodeslist
              selectorPathParent={this.selectorPathComposed}
            />
          </View>
        </SelectorView>
        {/*
  <OptionalView
    name="showTotalLabel"
    label={Dictionary.rowTotal}
    selectorPath={this.selectorPathComposed}
  >
    <Field
      name="totalLabel"
      type="text"
      component={Input}
      label={Dictionary.rowTotalLabel}
    />
  </OptionalView>
*/}
      </FormSection>
    );
  }
}

export default ResponseFormatTablePrincipal;
