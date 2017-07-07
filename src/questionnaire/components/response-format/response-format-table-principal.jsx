import React from 'react';
import { FormSection, Field } from 'redux-form';

import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import Dictionary from 'utils/dictionary/dictionary';
import CodesListNewEdit from 'layout/widget/codes-list-new-edit';
import Input from 'layout/forms/controls/input';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import OptionalView from 'layout/widget/optional-view';

const { TABLE } = QUESTION_TYPE_ENUM;

class CodesList extends FormSection {
  static defaultProps = {
    name: 'CODESLIST',
  };
  render() {
    return <CodesListNewEdit />;
  }
}

class List extends FormSection {
  static defaultProps = {
    name: 'LIST',
  };
  render() {
    return (
      <div>
        <Field name="numLinesMin" type="number" component={Input} label={Dictionary.minRowNb} />
        <Field name="numLinesMax" type="number" component={Input} label={Dictionary.maxRowNb} />
      </div>
    );
  }
}

class ResponseFormatTablePrincipal extends FormSection {
  static defaultProps = {
    name: 'AXISPRINCIPAL',
  };
  static selectorPath = `responseFormat.${TABLE}.AXISPRINCIPAL`;
  render() {
    const responseFormatTypes = [
      {
        id: `response-format-table-principal-list`,
        label: Dictionary.list,
        value: 'LIST',
        content: <List />,
      },
      {
        id: `response-format-table-principal-listcodes`,
        label: Dictionary.codeList,
        value: 'CODESLIST',
        content: <CodesList />,
      },
    ];

    return (
      <div>
        <ComponentSelectoryByTypeContainer
          label={Dictionary.primaryFormat}
          components={responseFormatTypes}
          selectorPath={ResponseFormatTablePrincipal.selectorPath}
          radio
        />
        <OptionalView
          name="showTotalLabel"
          label={Dictionary.rowTotal}
          view={<Field name="totalLabel" type="text" component={Input} label={Dictionary.rowTotalLabel} />}
        />
      </div>
    );
  }
}

export default ResponseFormatTablePrincipal;
