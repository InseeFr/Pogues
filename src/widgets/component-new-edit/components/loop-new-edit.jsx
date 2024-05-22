/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import {
  InputWithVariableAutoCompletion,
  TextareaWithVariableAutoCompletion,
} from '../../../forms/controls/control-with-suggestions';
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
  loopFilter,
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
      <Field name="basedOn" component={Select} label={Dictionary.BasedOn}>
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
      {componentType === ROUNDABOUT && loopFilter && (
        <Field
          name="excludedOccurrenceLabel"
          type="text"
          component={InputWithVariableAutoCompletion}
          label={Dictionary.ExcludedOccurrenceLabel}
          required={false}
        />
      )}
      {!loopBasedOn && componentType !== ROUNDABOUT && (
        <>
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
            name="startedPersonnalizedFormula"
            type="text"
            component={TextareaWithVariableAutoCompletion}
            label={Dictionary.startedPersonnalizedFormula}
          />
          <Field
            name="endedPersonnalizedFormula"
            type="text"
            component={TextareaWithVariableAutoCompletion}
            label={Dictionary.endedPersonnalizedFormula}
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
  loopFilter: PropTypes.string,
};

LoopNewEdit.defaultProps = {
  InitialMember: undefined,
  loopBasedOn: undefined,
  loopFilter: undefined,
};

// Container
const mapStateToProps = (state, { form }) => {
  const selector = formValueSelector(form);
  return {
    loopBasedOn: selector(state, 'basedOn'),
    loopFilter: selector(state, 'filter'),
  };
};

export default connect(mapStateToProps)(LoopNewEdit);
