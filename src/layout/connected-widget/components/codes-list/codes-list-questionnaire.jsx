import React from 'react';
import { Field, FormSection } from 'redux-form';
import Select from 'layout/forms/controls/select';
import Dictionary from 'utils/dictionary/dictionary';
import PropTypes from 'prop-types';

class CodesListQuestionnaire extends FormSection {
  static propTypes = {
    codeLists: PropTypes.object.isRequired,
  };
  static defaultProps = {
    name: 'QUESTIONNAIRE',
  };

  render() {
    const { codeLists } = this.props;
    console.log(codeLists);
    const formattedCodeLists = Object.keys(codeLists).map(key => {
      return {
        value: key,
        label: codeLists[key].label,
      };
    });

    return (
      <Field
        component={Select}
        name="codeList"
        label={Dictionary.selectCodesList}
        options={formattedCodeLists}
        required
      />
    );
  }
}

export default CodesListQuestionnaire;
