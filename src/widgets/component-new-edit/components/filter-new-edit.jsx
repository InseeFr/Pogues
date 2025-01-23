import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import { RichEditorWithVariable } from '../../../forms/controls/control-with-suggestions';
import Input from '../../../forms/controls/input';
import Dictionary from '../../../utils/dictionary/dictionary';
import { FilterLoopMembers } from './filter-loop-members';

export const FilterNewEdit = ({
  componentsStore,
  InitialMember,
  handleDisableValidation,
}) => {
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
        component={RichEditorWithVariable}
        label={Dictionary.expression}
        required
        focusOnInit={false}
        setDisableValidation={handleDisableValidation}
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
  handleDisableValidation: PropTypes.func.isRequired,
};

FilterNewEdit.defaultProps = {
  InitialMember: undefined,
};
