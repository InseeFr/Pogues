import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  COMPONENT_TYPE,
  TABS_PATHS,
  TargetMode,
} from '../../../constants/pogues-constants';
import GenericOption from '../../../forms/controls/generic-option';
import ListCheckboxes from '../../../forms/controls/list-checkboxes';
import Dictionary from '../../../utils/dictionary/dictionary';
import { updateNameField } from '../../../utils/utils';
import { AssociatedFields } from '../../associated-fields';
import { Tab, Tabs } from '../../tabs';
import CollectedVariablesContainer from '../containers/variables/collected-variables-container';
import Controls from './controls';
import Declarations from './declarations';
import Redirections from './redirections';
import ResponseFormat from './response-format/response-format';

export const QuestionNewEdit = ({
  form,
  componentId,
  errorsIntegrityByTab,
  addSubformValidationErrors,
  buttonRef,
  handleDisableValidation,
  activeQuestionnaire,
  redirectionNeeded,
  componentsStore,
}) => {
  const { QUESTION } = COMPONENT_TYPE;

  const panels = [
    <Tab
      label={Dictionary.responsesEdition}
      path={TABS_PATHS.RESPONSE_FORMAT}
      key={TABS_PATHS.RESPONSE_FORMAT}
    >
      <ResponseFormat
        edit={componentId !== ''}
        addErrors={addSubformValidationErrors}
      />
    </Tab>,
    <Tab
      label={Dictionary.declaration_tabTitle}
      path={TABS_PATHS.DECLARATIONS}
      key={TABS_PATHS.DECLARATIONS}
    >
      <Declarations
        activeQuestionnaire={activeQuestionnaire}
        showPosition
        errors={errorsIntegrityByTab[TABS_PATHS.DECLARATIONS]}
        addErrors={addSubformValidationErrors}
      />
    </Tab>,
    <Tab
      label={Dictionary.controls}
      path={TABS_PATHS.CONTROLS}
      key={TABS_PATHS.CONTROLS}
    >
      <Controls
        errors={errorsIntegrityByTab[TABS_PATHS.CONTROLS]}
        addErrors={addSubformValidationErrors}
      />
    </Tab>,
    <Tab
      label={Dictionary.goTo}
      path={TABS_PATHS.REDIRECTIONS}
      key={TABS_PATHS.REDIRECTIONS}
    >
      <Redirections
        errors={errorsIntegrityByTab[TABS_PATHS.REDIRECTIONS]}
        addErrors={addSubformValidationErrors}
        componentType={QUESTION}
        componentsStore={componentsStore}
        editingComponentId={componentId}
      />
    </Tab>,
    <Tab
      label={Dictionary.collectedVariables}
      path={TABS_PATHS.COLLECTED_VARIABLES}
      key={TABS_PATHS.COLLECTED_VARIABLES}
    >
      <CollectedVariablesContainer
        errors={errorsIntegrityByTab[TABS_PATHS.COLLECTED_VARIABLES]}
        addErrors={addSubformValidationErrors}
      />
    </Tab>,
  ];

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
        targetIsRichTextarea
        targetIsQuestion
      />
      <Field
        name="TargetMode"
        component={ListCheckboxes}
        label={Dictionary.collectionMode}
        inline
      >
        {TargetMode.map((s) => (
          <GenericOption key={s.value} value={s.value}>
            {s.label}
          </GenericOption>
        ))}
      </Field>
      <Tabs componentId={componentId}>
        {redirectionNeeded
          ? panels
          : panels.filter((panel) => panel.key !== TABS_PATHS.REDIRECTIONS)}
      </Tabs>
    </>
  );
};

QuestionNewEdit.propTypes = {
  componentId: PropTypes.string.isRequired,
  errorsIntegrityByTab: PropTypes.object,
  addSubformValidationErrors: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
  handleDisableValidation: PropTypes.func.isRequired,
  activeQuestionnaire: PropTypes.object.isRequired,
  form: PropTypes.string,
  redirectionNeeded: PropTypes.bool,
  componentsStore: PropTypes.object,
};

QuestionNewEdit.defaultProps = {
  form: undefined,
  redirectionNeeded: false,
  componentsStore: {},
};
