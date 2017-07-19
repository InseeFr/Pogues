import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import ResponseFormatSimple from 'questionnaire/components/response-format/simple/response-format-simple';
import ResponseFormatSingle from 'questionnaire/components/response-format/single/response-format-single';
import Dictionary from 'utils/dictionary/dictionary';
import { required } from 'layout/forms/validation-rules';
import { DIMENSION_TYPE, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { MEASURE } = DIMENSION_TYPE;

function InputMeasure(props) {
  const { selectorPath } = props;
  const baseId = selectorPath.split('.').join('-');
  const responseFormatTypes = [
    {
      id: `${baseId}-${SIMPLE}`,
      label: Dictionary.responseFormatSimple,
      value: SIMPLE,
      content: <ResponseFormatSimple selectorPathParent={selectorPath} showMandatory={false} />,
    },
    {
      id: `${baseId}-${SINGLE_CHOICE}`,
      label: Dictionary.responseFormatSingle,
      value: SINGLE_CHOICE,
      content: <ResponseFormatSingle selectorPathParent={selectorPath} showMandatory={false} />,
    },
  ];
  return (
    <div>
      <Field
        name="label"
        type="text"
        component={Input}
        label="Libellé de l'information mesurée"
        validate={[required]}
        required
      />

      <ComponentSelectoryByTypeContainer
        label={Dictionary.responseFormats}
        components={responseFormatTypes}
        selectorPath={selectorPath}
      />
    </div>
  );
}

InputMeasure.propTypes = {
  selectorPath: PropTypes.string.isRequired,
};

class ResponseFormatTableMeasures extends Component {
  static selectorPath = MEASURE;
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
      ? `${selectorPathParent}.${ResponseFormatTableMeasures.selectorPath}`
      : ResponseFormatTableMeasures.selectorPath;
  }
  render() {
    const inputMeasureView = <InputMeasure selectorPath={this.selectorPathComposed} />;

    return (
      <FormSection name={ResponseFormatTableMeasures.selectorPath}>
        <ListEntryFormContainer
          inputView={inputMeasureView}
          selectorPath={this.selectorPathComposed}
          listName="measures"
          submitLabel="addMeasure"
          noValueLabel="noMeasureYet"
        />
      </FormSection>
    );
  }
}

export default ResponseFormatTableMeasures;
