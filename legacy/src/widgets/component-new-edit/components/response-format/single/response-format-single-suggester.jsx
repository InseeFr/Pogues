import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import ListRadios from '@/forms/controls/list-radios';

import GenericOption from '../../../../../forms/controls/generic-option';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import SuggesterLists from '../../../../codes-lists/containers/suggester-lists-container';

function ResponseFormatSingleSuggester({
  selectorPathParent,
  disableSetArbitrary,
}) {
  return (
    <>
      <SuggesterLists selectorPathParent={selectorPathParent} />
      <div className="ctrl-checkbox" style={{ display: 'block' }}>
        <label htmlFor="rf-single-mandatory">{Dictionary.mandatory}</label>
        <div>
          <Field
            name="mandatory"
            id="rf-single-mandatory"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      {!disableSetArbitrary && (
        <Field
          name="allowArbitraryResponse"
          component={ListRadios}
          label={Dictionary.allowArbitraryResponse}
          required
          // Convert string "true"/"false" to boolean true/false when storing in Redux form
          parse={(value) => value === 'true'}
          // Convert true/false/undefined to string "true"/"false" when displaying the form
          format={(value) => (value === true ? 'true' : 'false')}
        >
          <GenericOption value="true">{Dictionary.yes}</GenericOption>
          <GenericOption value="false">{Dictionary.no}</GenericOption>
        </Field>
      )}
    </>
  );
}

ResponseFormatSingleSuggester.propTypes = {
  selectorPathParent: PropTypes.string,
  disableSetArbitrary: PropTypes.bool,
  allowFilter: PropTypes.bool,
};

export default ResponseFormatSingleSuggester;
