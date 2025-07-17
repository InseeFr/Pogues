import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { InputWithVariableAutoCompletion } from '../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../forms/controls/generic-option';
import ListRadios from '../../../forms/controls/list-radios';
import Dictionary from '../../../utils/dictionary/dictionary';

/**
 * In a loop with fixed length, the user can specify the length.
 *
 * He can also specify to display all the iterations on the same page (default case),
 * or to display one page per iteration.
 */
export function LoopFixedLength({ shouldSplitIterations }) {
  return (
    <>
      <Field
        name="size"
        type="text"
        component={InputWithVariableAutoCompletion}
        label={Dictionary.loopSize}
        required
      />
      <Field
        name="shouldSplitIterations"
        component={ListRadios}
        label={Dictionary.loopSinglePage}
        required
        // Here we ask if the user wants to join iterations, but we store `shouldSplitIterations` that is the opposite
        // Convert string "true"/"false" to boolean true/false when storing in Redux form
        parse={(value) => value === 'false'}
        // Convert true/false/undefined to string "true"/"false" when displaying the form. If undefined we join iterations.
        format={(value) => (value === true ? 'false' : 'true')}
      >
        <GenericOption value="true">{Dictionary.yes}</GenericOption>
        <GenericOption value="false">{Dictionary.no}</GenericOption>
      </Field>
      {shouldSplitIterations && (
        <div className="grid grid-cols-[25%_75%] text-red-500">
          <div className="col-start-2 px-3 pb-3">
            {Dictionary.loopSinglePageBusinessContextWarning}
          </div>
        </div>
      )}
    </>
  );
}

LoopFixedLength.propTypes = {
  shouldSplitIterations: PropTypes.bool,
};
