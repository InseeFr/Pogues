import React, { Component } from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';
import { CodesLists } from 'widgets/codes-lists';
import {
  DATATYPE_VIS_HINT,
  DIMENSION_FORMATS,
} from 'constants/pogues-constants';
import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';

const { CHECKBOX, RADIO, DROPDOWN } = DATATYPE_VIS_HINT;
const { CODES_LIST } = DIMENSION_FORMATS;

class ResponseFormatMultipleMeasureCodeslist extends Component {
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
      ? `${selectorPathParent}.${ResponseFormatMultipleMeasureCodeslist.selectorPath}`
      : ResponseFormatMultipleMeasureCodeslist.selectorPath;
  }
  render() {
    return (
      <FormSection name={ResponseFormatMultipleMeasureCodeslist.selectorPath}>
        <CodesLists selectorPathParent={this.selectorPathComposed} />
        <Field
          name="visHint"
          component={Select}
          label={Dictionary.visHint}
          required
        >
          <GenericOption key={CHECKBOX} value={CHECKBOX}>
            {Dictionary.checkbox}
          </GenericOption>
          <GenericOption key={RADIO} value={RADIO}>
            {Dictionary.radio}
          </GenericOption>
          <GenericOption key={DROPDOWN} value={DROPDOWN}>
            {Dictionary.dropdown}
          </GenericOption>
        </Field>
      </FormSection>
    );
  }
}

export default ResponseFormatMultipleMeasureCodeslist;
