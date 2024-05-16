/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import { InputWithVariableAutoCompletion } from '../../../forms/controls/control-with-suggestions';
import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';
import { FilterLoopMembers } from './filter-loop-members';

export const FilterNewEdit = ({ componentsStore, InitialMember }) => {
  const { FILTER } = COMPONENT_TYPE;
  return (
    <div>
      <Field
        name="description"
        type="text"
        component={Input}
        label={Dictionary.description}
      />
      <Field
        name="filter"
        type="text"
        component={InputWithVariableAutoCompletion}
        label={Dictionary.expression}
        required="required"
      />
      {componentsStore && (
        <FilterLoopMembers
          componentsStore={componentsStore}
          componentType={FILTER}
          InitialMember={InitialMember}
        />
      )}
    </div>
  );
};

FilterNewEdit.propTypes = {
  componentsStore: PropTypes.object,
  InitialMember: PropTypes.string,
};

FilterNewEdit.defaultProps = {
  InitialMember: undefined,
};
