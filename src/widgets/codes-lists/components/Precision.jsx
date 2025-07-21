import { Field } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import { RichEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../forms/controls/generic-option';
import Input from '../../../forms/controls/input';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';

const { CODE_INPUT_CODE_CLASS_PRECISION } = WIDGET_CODES_LISTS;

export function Precision({ codeValues = [] }) {
  return (
    <>
      <Field
        name="precisionCodeValue"
        component={Select}
        label={Dictionary.setPrecisionCodeValue}
        required
      >
        <GenericOption key="" value="">
          {Dictionary.selectPrecisionCodeValue}
        </GenericOption>
        {codeValues.map((val) => (
          <GenericOption key={val} value={val}>
            {val}
          </GenericOption>
        ))}
      </Field>
      <Field
        className={CODE_INPUT_CODE_CLASS_PRECISION}
        name="precisionLabel"
        type="text"
        component={RichEditorWithVariable}
        label={Dictionary.label}
        required
      />
      <Field
        name="precisionSize"
        type="number"
        step="any"
        component={Input}
        label={Dictionary.maxLength}
        required
      />
    </>
  );
}
