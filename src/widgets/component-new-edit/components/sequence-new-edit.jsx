/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TABS_PATHS, TargetMode } from '../../../constants/pogues-constants';
import GenericOption from '../../../forms/controls/generic-option';
import ListCheckboxes from '../../../forms/controls/list-checkboxes';
import Dictionary from '../../../utils/dictionary/dictionary';
import { updateNameField } from '../../../utils/utils';
import { AssociatedFields } from '../../associated-fields';
import { Tab, Tabs } from '../../tabs';
import Controls from './controls';
import Declaration from './declarations';

export const SequenceNewEdit = ({
  form,
  componentId,
  errorsIntegrityByTab,
  addSubformValidationErrors,
  buttonRef,
  handleDisableValidation,
  activeQuestionnaire,
}) => {
  return (
    <>
      <AssociatedFields
        formName={form}
        fieldOrigin={{ name: 'label', label: Dictionary.label }}
        fieldTarget={{ name: 'name', label: Dictionary.name }}
        action={updateNameField}
        focusOnInit
        onEnter={() => {
          buttonRef.click();
        }}
        handleDisableValidation={handleDisableValidation}
        targetIsRichTextarea={false}
        targetIsQuestion={false}
      />
      <Field
        name="TargetMode"
        component={ListCheckboxes}
        label={Dictionary.collectionMode}
        inline
      >
        {TargetMode.map(s => (
          <GenericOption key={s.value} value={s.value}>
            {s.label}
          </GenericOption>
        ))}
      </Field>
      <Tabs componentId={componentId}>
        <Tab
          label={Dictionary.declaration_tabTitle}
          path={TABS_PATHS.DECLARATIONS}
          key={TABS_PATHS.DECLARATIONS}
        >
          <Declaration
            activeQuestionnaire={activeQuestionnaire}
            showPosition={false}
            errors={errorsIntegrityByTab[TABS_PATHS.DECLARATIONS]}
            addErrors={addSubformValidationErrors}
          />
        </Tab>
        <Tab
          label={Dictionary.controls}
          path={TABS_PATHS.CONTROLS}
          key={TABS_PATHS.CONTROLS}
        >
          <Controls
            errors={errorsIntegrityByTab[TABS_PATHS.CONTROLS]}
            addErrors={addSubformValidationErrors}
          />
        </Tab>
      </Tabs>
    </>
  );
};

SequenceNewEdit.propTypes = {
  componentId: PropTypes.string,
  errorsIntegrityByTab: PropTypes.object,
  addSubformValidationErrors: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
  handleDisableValidation: PropTypes.func.isRequired,
  activeQuestionnaire: PropTypes.object.isRequired,
  form: PropTypes.string,
};

SequenceNewEdit.defaultProps = {
  componentId: '',
  form: undefined,
};
