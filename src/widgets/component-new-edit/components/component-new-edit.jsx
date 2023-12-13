import React, { useRef, useEffect, useState } from 'react';
import { formPropTypes, Field } from 'redux-form';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import { getQuestionnaireScope } from './variables/utils-loops';
import ResponseFormat from './response-format/response-format';
import Declaration from './declarations';
import Controls from './controls';
import Redirections from './redirections';
import CalculatedVariables from './variables/calculated-variables';
import ExternalVariables from './variables/external-variables';
import CollectedVariablesContainer from '../containers/variables/collected-variables-container';

import { Tabs, Tab } from '../../tabs';
import { AssociatedFields } from '../../associated-fields';

import { WIDGET_COMPONENT_NEW_EDIT } from '../../../constants/dom-constants';
import {
  COMPONENT_TYPE,
  TABS_PATHS,
  TargetMode,
} from '../../../constants/pogues-constants';
import Dictionary from '../../../utils/dictionary/dictionary';
import { updateNameField } from '../../../utils/utils';
import ListCheckboxes from '../../../forms/controls/list-checkboxes';
import GenericOption from '../../../forms/controls/generic-option';
import Input from '../../../forms/controls/input';
import Select from '../../../forms/controls/select';
import { InputWithVariableAutoCompletion } from '../../../forms/controls/control-with-suggestions';
import NestedFilter from './nestedFilter';
import { checkVariableNumberStart } from '../utils/component-new-edit-utils';

const { COMPONENT_CLASS, FOOTER, CANCEL, VALIDATE, FOOTERLOOP, DELETE } =
  WIDGET_COMPONENT_NEW_EDIT;
const {
  QUESTION,
  LOOP,
  SEQUENCE,
  SUBSEQUENCE,
  FILTER,
  NESTEDFILTRE,
  QUESTIONNAIRE,
  EXTERNAL_ELEMENT,
} = COMPONENT_TYPE;

export const propTypes = {
  ...formPropTypes,
  componentType: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  errorsIntegrityByTab: PropTypes.object,
  componentsStore: PropTypes.object,
  addSubformValidationErrors: PropTypes.func.isRequired,
  clearSubformValidationErrors: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  activeQuestionnaire: PropTypes.object.isRequired,
  updateComponent: PropTypes.func.isRequired,
  externalLoopsStore: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export const defaultProps = {
  errorsIntegrityByTab: {},
  componentsStore: {},
  deleteComponent: undefined,
};

const ComponentNewEdit = props => {
  const {
    componentType,
    componentId,
    addSubformValidationErrors,
    componentsStore,
    errorsIntegrityByTab,
    handleSubmit,
    submitting,
    form,
    onCancel,
    deleteComponent,
    onSubmit,
    filterImbriquer,
    activeQuestionnaire,
    clearSubformValidationErrors,
    externalLoopsStore,
    InitialMember,
    updateComponent,
  } = props;
  const [showNewNestedFilter, setShowNewNestedFilter] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [integerVariable, setIntegerVariable] = useState(false);
  const [formData, setFormData] = useState({});
  const [filterImbriquers, setFilterImbriquers] = useState(
    filterImbriquer?.length > 0 ? filterImbriquer : [],
  );
  const [disableValidation, setDisableValidation] = useState(false);
  const [filterId, setFilterId] = useState('');
  const buttonRef = useRef(null);

  const handleCloseNestedFilter = () => {
    setShowNewNestedFilter(false);
    setFilterId('');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIntegerVariable(false);
  };

  const handleValidate = () => {
    setShowPopup(false);
    onSubmit(formData);
  };

  const handleDisableValidation = isDisable => {
    setDisableValidation(isDisable);
  };

  const checkUnsavedChange = data => {
    setFormData({ ...data, filterImbriquer: filterImbriquers });
    if (
      componentType === QUESTION &&
      (data.collectedVariables.name ||
        data.calculatedVariables.name ||
        data.externalVariables.name ||
        data.redirections.label ||
        data.controls.label ||
        data.declarations.label ||
        data.responseFormat.SINGLE_CHOICE.CodesList['input-code']?.value ||
        data.responseFormat.MULTIPLE_CHOICE.PRIMARY.CodesList['input-code']
          ?.value ||
        data.responseFormat.MULTIPLE_CHOICE.MEASURE.CODES_LIST.CodesList[
          'input-code'
        ]?.value ||
        data.responseFormat.TABLE.PRIMARY.CODES_LIST.CodesList['input-code']
          ?.value ||
        data.responseFormat.TABLE.SECONDARY.CodesList['input-code']?.value ||
        data.responseFormat.TABLE.LIST_MEASURE.label)
    ) {
      setShowPopup(true);
    } else if (
      componentType === QUESTION &&
      data.collectedVariables.collectedVariables.length > 0 &&
      checkVariableNumberStart(data.collectedVariables.collectedVariables)
    ) {
      setShowPopup(true);
      setIntegerVariable(true);
    } else {
      onSubmit({ ...data, filterImbriquer: filterImbriquers });
    }
  };

  const handleDeleteNestedFilter = index => {
    let filters = [...filterImbriquers];
    filters = filters.filter(filt => filt !== index);
    setFilterImbriquers(filters);
    setFilterId('');
    handleCloseNestedFilter();
  };

  const handleSubmitImbriquer = value => {
    if (!filterImbriquers.includes(value) && value) {
      setFilterImbriquers([...filterImbriquers, value]);
    }
    handleCloseNestedFilter();
  };

  useEffect(() => {
    clearSubformValidationErrors();
  }, [clearSubformValidationErrors]);

  const renderPanels = () => {
    let panels = [
      <Tab
        label={Dictionary.declaration_tabTitle}
        path={TABS_PATHS.DECLARATIONS}
        key={TABS_PATHS.DECLARATIONS}
      >
        <Declaration
          showPosition={componentType === QUESTION}
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
    ];

    if (componentType === QUESTION) {
      panels = [
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
        ...panels,
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
        </Tab>,
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
      if (activeQuestionnaire.dynamiqueSpecified !== 'Filtres')
        panels.splice(
          3,
          0,
          <Tab
            label={Dictionary.goTo}
            path={TABS_PATHS.REDIRECTIONS}
            key={TABS_PATHS.REDIRECTIONS}
          >
            <Redirections
              errors={errorsIntegrityByTab[TABS_PATHS.REDIRECTIONS]}
              addErrors={addSubformValidationErrors}
              componentType={componentType}
              componentsStore={componentsStore}
              editingComponentId={componentId}
            />
          </Tab>,
        );
    }
    return panels;
  };

  const supImbriquer = (store, initial) => {
    let superieur = initial.weight;
    if (filterImbriquers.length > 0) {
      filterImbriquers.forEach(element => {
        if (
          store[store[element].finalMember].type === initial.type &&
          store[store[element].finalMember].weight > initial.weight
        ) {
          superieur = store[store[element].finalMember].weight;
        }
      });
    }
    return superieur;
  };

  const infImbriquer = (store, initial) => {
    const filters = Object.values(store).filter(
      component =>
        component.type === FILTER &&
        component.type === initial.type &&
        store[component.initialMember].weight < initial.weight &&
        store[component.finalMember].weight > initial.weight,
    );
    const inferieurComponent = filters
      ? filters.reduce(
          (min, p) =>
            store[p.initialMember].weight > store[min.initialMember].weight
              ? p
              : min,
          filters[0],
        )
      : undefined;
    const inferieur = inferieurComponent
      ? store[inferieurComponent.finalMember].weight
      : undefined;
    return inferieur;
  };

  const getFinalOptions = store => {
    const componentinitial = Object.values(store).filter(
      component => component.id === InitialMember,
    );
    if (!InitialMember || componentinitial.length === 0)
      return (
        <GenericOption key="emptyFinal" value="">
          empty
        </GenericOption>
      );
    if (infImbriquer(store, componentinitial[0])) {
      return Object.values(store)
        .filter(
          component =>
            component.type === componentinitial[0].type &&
            component.weight >= supImbriquer(store, componentinitial[0]) &&
            component.weight <= infImbriquer(store, componentinitial[0]) &&
            component.parent === componentinitial[0].parent &&
            component.id !== 'idendquest',
        )
        .map(element => {
          return (
            <GenericOption key={`final-'${element.id}`} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    }
    return Object.values(store)
      .filter(
        component =>
          (component.type === componentinitial[0].type ||
            (component.type === EXTERNAL_ELEMENT &&
              componentinitial[0].type === SEQUENCE) ||
            (component.type === SEQUENCE &&
              componentinitial[0].type === EXTERNAL_ELEMENT)) &&
          component.weight >= supImbriquer(store, componentinitial[0]) &&
          component.parent === componentinitial[0].parent &&
          component.id !== 'idendquest',
      )
      .map(element => {
        return (
          <GenericOption key={`final-'${element.id}`} value={element.id}>
            {element.name}
          </GenericOption>
        );
      });
  };

  const inferieur = () => {
    let inferieurFilter =
      componentsStore[componentsStore[filterImbriquers[0]].initialMember]
        ?.weight;

    filterImbriquers.forEach(filter => {
      if (
        inferieurFilter &&
        componentsStore[componentsStore[filter].initialMember].weight <
          inferieurFilter
      ) {
        inferieurFilter =
          componentsStore[componentsStore[filter].initialMember].weight;
      }
    });
    return inferieurFilter;
  };
  const optionsInitial = type => {
    if (type === LOOP) {
      return Object.values(componentsStore)
        .filter(
          component =>
            component.id !== 'idendquest' &&
            (component.type === SEQUENCE ||
              component.type === SUBSEQUENCE ||
              component.type === EXTERNAL_ELEMENT),
        )
        .map(element => {
          return (
            <GenericOption key={`initial-${element.id}`} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    }
    if (filterImbriquers?.length > 0) {
      return Object.values(componentsStore)
        .filter(
          component =>
            component.type !== LOOP &&
            component.type !== FILTER &&
            component.type !== NESTEDFILTRE &&
            component.type !== QUESTIONNAIRE &&
            component.id !== 'idendquest' &&
            component.type ===
              componentsStore[
                componentsStore[filterImbriquers[0]].initialMember
              ].type &&
            component.parent ===
              componentsStore[
                componentsStore[filterImbriquers[0]].initialMember
              ].parent &&
            component.weight <= inferieur(),
        )
        .map(element => {
          return (
            <GenericOption key={`initial-${element.id}`} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    }
    return Object.values(componentsStore)
      .filter(
        component =>
          component.type !== LOOP &&
          component.type !== FILTER &&
          component.type !== NESTEDFILTRE &&
          component.type !== QUESTIONNAIRE &&
          component.id !== 'idendquest',
      )
      .map(element => {
        return (
          <GenericOption key={`initial-${element.id}`} value={element.id}>
            {element.name}
          </GenericOption>
        );
      });
  };

  const scopes = [
    getQuestionnaireScope(componentsStore, externalLoopsStore).map(
      iteration => (
        <GenericOption key={`scope-${iteration.id}`} value={iteration.id}>
          {iteration.name}
        </GenericOption>
      ),
    ),
  ];

  const associatedFieldsProps = {
    formName: form,
    fieldOrigin: { name: 'label', label: Dictionary.label },
    fieldTarget: { name: 'name', label: Dictionary.name },
    action: updateNameField,
    focusOnInit: true,
    onEnter: () => {
      buttonRef.click();
    },
    handleDisableValidation,
  };
  return (
    <div className={COMPONENT_CLASS}>
      <form onSubmit={handleSubmit(data => checkUnsavedChange(data))}>
        {(componentType === LOOP || componentType === FILTER) && (
          <div>
            {componentsStore && componentType === LOOP ? (
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
                <Field
                  name="basedOn"
                  component={Select}
                  label={Dictionary.BasedOn}
                >
                  <GenericOption key="selectBasedOn" value="">
                    {Dictionary.selectBasedOn}
                  </GenericOption>
                  {scopes}
                </Field>
              </div>
            ) : (
              <Field
                name="description"
                type="text"
                component={Input}
                label={Dictionary.description}
              />
            )}
            <Field
              name="filter"
              type="text"
              focusOnInit
              component={InputWithVariableAutoCompletion}
              label={
                componentType === LOOP
                  ? Dictionary.Filter
                  : Dictionary.expression
              }
              required={componentType !== LOOP ? 'required' : false}
            />
            {componentsStore && (
              <>
                <Field
                  name="initialMember"
                  component={Select}
                  label={Dictionary.InitialMembre}
                  required
                >
                  <GenericOption key="selectInitialMember" value="">
                    {Dictionary.selectInitialMembre}
                  </GenericOption>
                  {optionsInitial(componentType)}
                </Field>
                <Field
                  name="finalMember"
                  component={Select}
                  label={Dictionary.FinalMembre}
                  disabled={!InitialMember}
                  required
                >
                  <GenericOption key="selectFinalMember" value="">
                    {Dictionary.selectFinalMembre}
                  </GenericOption>
                  {getFinalOptions(componentsStore)}
                </Field>
              </>
            )}
            {componentType === LOOP && (
              <Field
                name="addButtonLibel"
                type="text"
                component={Input}
                label={Dictionary.AddButton}
              />
            )}
          </div>
        )}
        {componentType !== LOOP && componentType !== FILTER && (
          <>
            <AssociatedFields
              {...associatedFieldsProps}
              targetIsRichTextarea={componentType === QUESTION}
              targetIsQuestion={componentType === QUESTION}
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
            <Tabs componentId={componentId}>{renderPanels()}</Tabs>
          </>
        )}
        <div
          className={
            componentType !== LOOP && componentType !== FILTER
              ? FOOTER
              : FOOTERLOOP
          }
        >
          <button
            className={VALIDATE}
            type="submit"
            disabled={submitting || disableValidation}
            ref={buttonRef}
          >
            {Dictionary.validate}
          </button>
          <button className={CANCEL} disabled={submitting} onClick={onCancel}>
            {Dictionary.cancel}
          </button>
          {componentType === LOOP && componentId && (
            <button
              className={DELETE}
              disabled={submitting}
              onClick={deleteComponent}
            >
              {Dictionary.remove}
            </button>
          )}
          {componentType === FILTER && componentId && (
            <button
              className={DELETE}
              disabled={submitting}
              onClick={() => deleteComponent(componentId)}
            >
              {Dictionary.remove}
            </button>
          )}
        </div>
      </form>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showNewNestedFilter}
        onRequestClose={handleCloseNestedFilter}
        contentLabel="FILTRE IMBRIQUE"
      >
        <div className="popup">
          <div className="popup-header">
            <h3>
              {filterId
                ? Dictionary.editFiltreImbriquer
                : Dictionary.filtreImbriquer}
            </h3>
            <button type="button" onClick={handleCloseNestedFilter}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <NestedFilter
              filterId={filterId}
              componentsStore={componentsStore}
              handleSubmitImbriquer={value => handleSubmitImbriquer(value)}
              handleCloseNestedFilter1={handleCloseNestedFilter}
              componentType={NESTEDFILTRE}
              handleDeleteNestedFilter={handleDeleteNestedFilter}
              updateComponent={updateComponent}
              initialMemberFilter={InitialMember}
            />
          </div>
        </div>
      </ReactModal>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showPopup}
        onRequestClose={handleClosePopup}
        contentLabel="Alert Save"
      >
        <div className="popup-notSaved">
          <div className="popup-header">
            <h3>{Dictionary.saveLowerTitle}</h3>
            <button type="button" onClick={handleClosePopup}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            {' '}
            {integerVariable ? Dictionary.IsNotLetter : Dictionary.saveLower}
            <div className="popup-notSaved-footer">
              <button
                className="popup-notSaved-footer-cancel"
                type="button"
                onClick={handleClosePopup}
              >
                {Dictionary.back}
              </button>
              <button
                className="popup-notSaved-footer-validate"
                onClick={handleValidate}
                type="button"
              >
                {Dictionary.validateEtat}
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

ComponentNewEdit.propTypes = propTypes;
ComponentNewEdit.defaultProps = defaultProps;

export default ComponentNewEdit;
