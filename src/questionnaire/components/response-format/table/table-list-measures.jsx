import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import InputMeasure from './input-measure';
import { DIMENSION_TYPE } from 'constants/pogues-constants';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultListMeasuresForm } from 'utils/transformation-entities/response-format-table';

const { LIST_MEASURE } = DIMENSION_TYPE;

function validationMeasure(values) {
  const { label, type, [type]: measureValues } = values;
  const errors = [];

  if (label === '') errors.push('Label is required');

  return errors;
}

class ResponseFormatTableListMeasures extends Component {
  static selectorPath = LIST_MEASURE;
  static propTypes = {
    onAddCodesList: PropTypes.func.isRequired,
    selectorPathParent: PropTypes.string,
  };
  static defaultProps = {
    selectorPathParent: undefined,
  };
  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${ResponseFormatTableListMeasures.selectorPath}`
      : ResponseFormatTableListMeasures.selectorPath;
  }
  render() {
    const { measures, ...initialInputValues } = defaultListMeasuresForm;
    const inputMeasureView = <InputMeasure selectorPath={this.selectorPathComposed} />;

    return (
      <FormSection name={ResponseFormatTableListMeasures.selectorPath}>
        <ListEntryFormContainer
          inputView={inputMeasureView}
          initialInputValues={initialInputValues}
          selectorPath={this.selectorPathComposed}
          validationInput={validationMeasure}
          onAddCodesList={this.props.onAddCodesList}
          listName="measures"
          submitLabel="addMeasure"
          noValueLabel="noMeasureYet"
        />
      </FormSection>
    );
  }
}

export default ResponseFormatTableListMeasures;
