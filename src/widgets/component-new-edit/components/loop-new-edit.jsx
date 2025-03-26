import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import { InputWithVariableAutoCompletion } from '../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../forms/controls/generic-option';
import Input from '../../../forms/controls/input';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';
import { FilterLoopMembers } from './filter-loop-members';

const LoopNewEdit = ({
  componentsStore,
  componentType,
  InitialMember,
  scopes,
  loopBasedOn,
}) => {
  const { ROUNDABOUT } = COMPONENT_TYPE;

  return (
    <div>
      <Field
        name="nameLoop"
        type="text"
        component={Input}
        label={Dictionary.name}
        required
      />
      <Field
        name="basedOn"
        component={Select}
        label={Dictionary.BasedOn}
        required={componentType === ROUNDABOUT}
      >
        <GenericOption key="selectBasedOn" value="">
          {Dictionary.selectBasedOn}
        </GenericOption>
        {scopes}
      </Field>
      {(loopBasedOn || componentType === ROUNDABOUT) && (
        <Field
          name="filter"
          type="text"
          component={InputWithVariableAutoCompletion}
          label={Dictionary.Filter}
          required={false}
        />
      )}
      {!loopBasedOn && componentType !== ROUNDABOUT && (
        <>
          <div className="grid grid-cols-[25%_75%] text-red-500">
            <div className="col-start-2 px-3 pb-3">
              {Dictionary.loopMinMaxHouseholdContextWarning}
            </div>
          </div>
          <Field
            name="minimum"
            type="text"
            component={InputWithVariableAutoCompletion}
            label={Dictionary.minimum}
          />
          <Field
            name="maximum"
            type="text"
            component={InputWithVariableAutoCompletion}
            label={Dictionary.maximum}
          />
          <Field
            name="addButtonLibel"
            type="text"
            component={Input}
            label={Dictionary.AddButton}
          />
        </>
      )}
      <FilterLoopMembers
        componentsStore={componentsStore}
        componentType={componentType}
        InitialMember={InitialMember}
      />
      {componentType === ROUNDABOUT && (
        <>
          <Field
            name="occurrenceLabel"
            type="text"
            required
            component={InputWithVariableAutoCompletion}
            label={Dictionary.occurrenceLabel}
          />
          <Field
            name="occurrenceDescription"
            type="text"
            component={InputWithVariableAutoCompletion}
            label={Dictionary.occurrenceDescription}
          />
          <Field
            type="checkbox"
            name="locked"
            component={Input}
            label={Dictionary.isRoundaboutLocked}
          />
        </>
      )}
    </div>
  );
};

LoopNewEdit.propTypes = {
  componentsStore: PropTypes.object,
  componentType: PropTypes.string.isRequired,
  InitialMember: PropTypes.string,
  scopes: PropTypes.array.isRequired,
  loopBasedOn: PropTypes.string,
};

LoopNewEdit.defaultProps = {
  InitialMember: undefined,
  loopBasedOn: undefined,
};

// Container
const mapStateToProps = (state, { form }) => {
  const selector = formValueSelector(form);
  return {
    loopBasedOn: selector(state, 'basedOn'),
  };
};

export default connect(mapStateToProps)(LoopNewEdit);
