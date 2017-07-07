import React from 'react';
import { FormSection, Field } from 'redux-form';

import ComponentSelectoryByTypeContainer from 'layout/connected-widget/component-selector-by-type';
import Dictionary from 'utils/dictionary/dictionary';
import CodesList from 'layout/widget/codes-list/codes-list';
import Input from 'layout/forms/controls/input';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import OptionalView from 'layout/widget/optional-view';
import { required, minValue } from 'layout/forms/validation-rules';

const { TABLE } = QUESTION_TYPE_ENUM;

class PrincipalCodesList extends FormSection {
  static selectorPath = `responseFormat.${TABLE}.AXISPRINCIPAL.CODESLIST`;
  static defaultProps = {
    name: 'CODESLIST',
  };
  render() {
    return <CodesList selectorPath={PrincipalCodesList.selectorPath} />;
  }
}

class PrincipalList extends FormSection {
  static defaultProps = {
    name: 'LIST',
  };
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

class ResponseFormatTablePrincipal extends FormSection {
  static selectorPath = `responseFormat.${TABLE}.AXISPRINCIPAL`;
  static defaultProps = {
    name: 'AXISPRINCIPAL',
  };
  render() {
    const responseFormatTypes = [
      {
        id: `response-format-table-principal-list`,
        label: Dictionary.list,
        value: 'LIST',
        content: <PrincipalList />,
      },
      {
        id: `response-format-table-principal-listcodes`,
        label: Dictionary.codeList,
        value: 'CODESLIST',
        content: <PrincipalCodesList />,
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
      </div>
    );
  }
}

export default ResponseFormatTablePrincipal;
