/* eslint-disable react/react-in-jsx-scope */
import { InputWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';
import GenericOption from 'forms/controls/generic-option';
import Input from 'forms/controls/input';
import Select from 'forms/controls/select';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Dictionary from 'utils/dictionary/dictionary';
import { FilterLoopMembers } from './filter-loop-members';

export const LoopNewEdit = ({
  componentsStore,
  componentType,
  InitialMember,
  scopes,
}) => {
  return (
    <div>
      {componentsStore && (
        <div>
          <Field
            name="nameLoop"
            type="text"
            component={Input}
            label={Dictionary.name}
            required
          />
          <Field
            name="minimum"
            type="text"
            focusOnInit
            component={InputWithVariableAutoCompletion}
            label={Dictionary.minimum}
          />
          <Field
            name="maximum"
            type="text"
            focusOnInit
            component={InputWithVariableAutoCompletion}
            label={Dictionary.maximum}
          />
          <Field name="basedOn" component={Select} label={Dictionary.BasedOn}>
            <GenericOption key="selectBasedOn" value="">
              {Dictionary.selectBasedOn}
            </GenericOption>
            {scopes}
          </Field>
        </div>
      )}
      <Field
        name="filter"
        type="text"
        focusOnInit
        component={InputWithVariableAutoCompletion}
        label={Dictionary.Filter}
        required={false}
      />
      {componentsStore && (
        <FilterLoopMembers
          componentsStore={componentsStore}
          componentType={componentType}
          InitialMember={InitialMember}
        />
      )}
      <Field
        name="addButtonLibel"
        type="text"
        component={Input}
        label={Dictionary.AddButton}
      />
    </div>
  );
};

LoopNewEdit.propTypes = {
  componentsStore: PropTypes.object,
  componentType: PropTypes.string.isRequired,
  InitialMember: PropTypes.string,
  scopes: PropTypes.object.isRequired,
};

LoopNewEdit.defaultProps = {
  InitialMember: undefined,
};
