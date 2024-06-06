/* eslint-disable react/react-in-jsx-scope */
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
import CalculatedVariables from './variables/calculated-variables';
import ExternalVariables from './variables/external-variables';

export const QuestionNewEdit = ({
  form,
  componentId,
  errorsIntegrityByTab,
  addSubformValidationErrors,
  buttonRef,
  handleDisableValidation,
  scopes,
  activeQuestionnaire,
  redirectionNeeded,
  componentsStore,
}) => {
  const { QUESTION } = COMPONENT_TYPE;

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
        {TargetMode.map(s => (
          <GenericOption key={s.value} value={s.value}>
            {s.label}
          </GenericOption>
        ))}
      </Field>
      <Tabs componentId={componentId}>
        <Tab
          label={Dictionary.responsesEdition}
          path={TABS_PATHS.RESPONSE_FORMAT}
          key={TABS_PATHS.RESPONSE_FORMAT}
        >
          <ResponseFormat
            edit={componentId !== ''}
            addErrors={addSubformValidationErrors}
          />
        </Tab>
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
        {redirectionNeeded && (
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
          </Tab>
        )}
        <Tab
          label={Dictionary.externalVariables}
          path={TABS_PATHS.EXTERNAL_VARIABLES}
          key={TABS_PATHS.EXTERNAL_VARIABLES}
        >
          <ExternalVariables
            errors={errorsIntegrityByTab[TABS_PATHS.EXTERNAL_VARIABLES]}
            addErrors={addSubformValidationErrors}
            scopes={scopes}
          />
        </Tab>
        <Tab
          label={Dictionary.calculatedVariables}
          path={TABS_PATHS.CALCULATED_VARIABLES}
          key={TABS_PATHS.CALCULATED_VARIABLES}
        >
          <CalculatedVariables
            errors={errorsIntegrityByTab[TABS_PATHS.CALCULATED_VARIABLES]}
            addErrors={addSubformValidationErrors}
            scopes={scopes}
          />
        </Tab>
        <Tab
          label={Dictionary.collectedVariables}
          path={TABS_PATHS.COLLECTED_VARIABLES}
          key={TABS_PATHS.COLLECTED_VARIABLES}
        >
          <CollectedVariablesContainer
            errors={errorsIntegrityByTab[TABS_PATHS.COLLECTED_VARIABLES]}
            addErrors={addSubformValidationErrors}
          />
        </Tab>
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
  scopes: PropTypes.array.isRequired,
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
