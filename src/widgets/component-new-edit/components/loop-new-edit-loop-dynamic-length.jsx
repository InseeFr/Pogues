import { Field } from 'redux-form';

import { InputWithVariableAutoCompletion } from '../../../forms/controls/control-with-suggestions';
import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';

/**
 * In a loop with dynamic length, the number of lines can be fixed or vary between a min
 * and a max.
 * Then the label of the button for adding an occurrence can be customed.
 */
export function LoopDynamicLength() {
  return (
    <>
      <div className="grid grid-cols-[25%_75%] text-red-500">
        <div className="col-start-2 px-3 pb-3">
          {Dictionary.loopMinMaxBusinessContextWarning}
        </div>
      </div>
      <Field
        name="minimum"
        type="text"
        component={InputWithVariableAutoCompletion}
        label={Dictionary.loopMinOccurrencesNb}
        required
      />
      <Field
        name="maximum"
        type="text"
        component={InputWithVariableAutoCompletion}
        label={Dictionary.loopMaxOccurrencesNb}
        required
      />
      <Field
        name="addButtonLibel"
        type="text"
        component={Input}
        label={Dictionary.AddButton}
      />
    </>
  );
}
