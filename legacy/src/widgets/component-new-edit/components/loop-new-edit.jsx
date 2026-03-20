import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import { InputWithVariableAutoCompletion } from '../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../forms/controls/generic-option';
import Input from '../../../forms/controls/input';
import ListRadios from '../../../forms/controls/list-radios';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';
import { FilterLoopMembers } from './filter-loop-members';
import { LoopDynamicLength } from './loop-new-edit-loop-dynamic-length';
import { LoopFixedLength } from './loop-new-edit-loop-fixed-length';

const LoopNewEdit = ({
  componentsStore,
  componentType,
  InitialMember,
  scopes,
  loopBasedOn,
  isFixedLength,
  shouldSplitIterations,
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
          <Field
            name="isFixedLength"
            component={ListRadios}
            label={Dictionary.loopSameMinMax}
            required
            // Convert string "true"/"false" to boolean true/false when storing in Redux form
            parse={(value) => value === 'true'}
            // Convert true/false/undefined to string "true"/"false" when displaying the form
            format={(value) => (value === true ? 'true' : 'false')}
          >
            <GenericOption value="true">{Dictionary.yes}</GenericOption>
            <GenericOption value="false">{Dictionary.no}</GenericOption>
          </Field>
          {isFixedLength ? (
            <LoopFixedLength shouldSplitIterations={shouldSplitIterations} />
          ) : (
            <LoopDynamicLength />
          )}
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
  isFixedLength: PropTypes.bool,
  shouldSplitIterations: PropTypes.bool,
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
    isFixedLength: selector(state, 'isFixedLength'),
    shouldSplitIterations: selector(state, 'shouldSplitIterations'),
  };
};

export default connect(mapStateToProps)(LoopNewEdit);
