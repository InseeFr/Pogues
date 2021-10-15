import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, formPropTypes, Field } from 'redux-form';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import ResponseFormat from './response-format/response-format';
import Declaration from './declarations';
import Controls from './controls';
import Redirections from './redirections';
import CalculatedVariables from './variables/calculated-variables';
import ExternalVariables from './variables/external-variables';
import CollectedVariablesContainer from '../containers/variables/collected-variables-container';

import { Tabs, Tab } from 'widgets/tabs';
import { AssociatedFields } from 'widgets/associated-fields';

import { WIDGET_COMPONENT_NEW_EDIT } from 'constants/dom-constants';
import {
  COMPONENT_TYPE,
  TABS_PATHS,
  TargetMode,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
} from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { updateNameField } from 'utils/utils';
import ListCheckboxes from 'forms/controls/list-checkboxes';
import GenericOption from 'forms/controls/generic-option';
import Input from 'forms/controls/input';
import Select from 'forms/controls/select';
import { InputWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';
import NestedFilter from './nestedFilter';
import { checkVariableNumberStart } from '../utils/component-new-edit-utils';

const { COMPONENT_CLASS, FOOTER, CANCEL, VALIDATE, FOOTERLOOP, DELETE } =
  WIDGET_COMPONENT_NEW_EDIT;
const { QUESTION, LOOP, SEQUENCE, SUBSEQUENCE, FILTER, NESTEDFILTRE } =
  COMPONENT_TYPE;
const { LIST } = DIMENSION_FORMATS;
const { TABLE } = QUESTION_TYPE_ENUM;

export const propTypes = {
  ...formPropTypes,
  componentType: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,

  errorsIntegrityByTab: PropTypes.object,
  componentsStore: PropTypes.object,

  addSubformValidationErrors: PropTypes.func.isRequired,
  clearSubformValidationErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  errorsIntegrityByTab: {},
  submitErrors: {},
  componentsStore: {},
  codesListsStoreStore: {},
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
  } = props;
  const [showNewNestedFilter, setShowNewNestedFilter] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [integerVariable, setIntegerVariable] = useState(false);
  const [formData, setFormData] = useState({});
  const [filterImbriquers, setFilterImbriquers] = useState(
    filterImbriquer?.length > 0 ? filterImbriquer : [],
  );
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

  // const handleOpenFilter = (e, index) => {
  //   e.preventDefault();
  //   if (index) {
  //     setFilterId(index);
  //   }
  //   setShowNewNestedFilter(true);
  // };

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
            componentsStore={componentsStore}
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
            componentsStore={componentsStore}
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
    let optionsFinal = <GenericOption key="" value="" />;
    const componentinitial = Object.values(store).filter(
      component => component.id === props.InitialMember,
    );
    if (props.InitialMember && componentinitial.length > 0) {
      if (infImbriquer(store, componentinitial[0])) {
        optionsFinal = Object.values(store)
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
              <GenericOption key={element.id} value={element.id}>
                {element.name}
              </GenericOption>
            );
          });
      } else {
        optionsFinal = Object.values(store)
          .filter(
            component =>
              component.type === componentinitial[0].type &&
              component.weight >= supImbriquer(store, componentinitial[0]) &&
              component.parent === componentinitial[0].parent &&
              component.id !== 'idendquest',
          )
          .map(element => {
            return (
              <GenericOption key={element.id} value={element.id}>
                {element.name}
              </GenericOption>
            );
          });
      }
    }
    return optionsFinal;
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
    let options = <GenericOption key="" value="" />;
    if (type === LOOP) {
      options = Object.values(componentsStore)
        .filter(
          component =>
            component.id !== 'idendquest' &&
            (component.type === SEQUENCE || component.type === SUBSEQUENCE),
        )
        .map(element => {
          return (
            <GenericOption key={element.id} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    } else if (filterImbriquers?.length > 0) {
      options = Object.values(componentsStore)
        .filter(
          component =>
            component.type !== LOOP &&
            component.type !== FILTER &&
            component.type !== NESTEDFILTRE &&
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
            <GenericOption key={element.id} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    } else {
      options = Object.values(componentsStore)
        .filter(
          component =>
            component.type !== LOOP &&
            component.type !== FILTER &&
            component.type !== NESTEDFILTRE &&
            component.id !== 'idendquest',
        )
        .map(element => {
          return (
            <GenericOption key={element.id} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    }
    return options;
  };
  const optionsTable = Object.values(componentsStore)
    .filter(
      component =>
        (component.type === QUESTION &&
          component.responseFormat.type === TABLE &&
          component.responseFormat.TABLE.PRIMARY.type === LIST) ||
        (component.type === LOOP && !component.basedOn),
    )
    .map(element => {
      return (
        <GenericOption key={element.id} value={element.id}>
          {element.name || element.nameLoop}
        </GenericOption>
      );
    });
  const associatedFieldsProps = {
    formName: form,
    fieldOrigin: { name: 'label', label: Dictionary.label },
    fieldTarget: { name: 'name', label: Dictionary.name },
    action: updateNameField,
    focusOnInit: true,
    onEnter: () => {
      buttonRef.click();
    },
  };
  return (
    <div className={COMPONENT_CLASS}>
      <form onSubmit={handleSubmit(data => checkUnsavedChange(data))}>
        {componentType === QUESTION ? (
          <AssociatedFields
            {...associatedFieldsProps}
            targetIsRichTextarea
            targetIsQuestion
          />
        ) : componentType === LOOP || componentType === FILTER ? (
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
                  <GenericOption key="" value="">
                    {Dictionary.selectBasedOn}
                  </GenericOption>
                  {optionsTable}
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
            {componentsStore ? (
              <Field
                name="initialMember"
                component={Select}
                label={Dictionary.InitialMembre}
                required
              >
                <GenericOption key="" value="">
                  {Dictionary.selectInitialMembre}
                </GenericOption>
                {optionsInitial(componentType)}
              </Field>
            ) : (
              false
            )}
            {/* {componentType === FILTER
              ? showFiltersImbriquer(filterImbriquers)
              : false}
            {componentType === FILTER ? (
              <button
                className={FILTRE_IMBRIQUER}
                onClick={e => handleOpenFilter(e)}
              >
                <span className="glyphicon glyphicon-plus" aria-hidden="true" />
                {Dictionary.filtreImbriquer}
              </button>
            ) : (
              false
            )} */}
            {componentsStore ? (
              <Field
                name="finalMember"
                component={Select}
                label={Dictionary.FinalMembre}
                disabled={!props.InitialMember}
                required
              >
                <GenericOption key="" value="">
                  {Dictionary.selectFinalMembre}
                </GenericOption>
                {getFinalOptions(componentsStore)}
              </Field>
            ) : (
              false
            )}
            {componentType === LOOP ? (
              <Field
                name="addButtonLibel"
                type="text"
                component={Input}
                label={Dictionary.AddButton}
              />
            ) : (
              false
            )}
          </div>
        ) : (
          <AssociatedFields {...associatedFieldsProps} />
        )}
        {componentType !== LOOP && componentType !== FILTER ? (
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
        ) : (
          false
        )}
        {componentType !== LOOP && componentType !== FILTER ? (
          <Tabs componentId={componentId}>{renderPanels()}</Tabs>
        ) : (
          false
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
            disabled={submitting}
            ref={buttonRef}
          >
            {Dictionary.validate}
          </button>
          <button className={CANCEL} disabled={submitting} onClick={onCancel}>
            {Dictionary.cancel}
          </button>
          {componentType === LOOP && componentId ? (
            <button
              className={DELETE}
              disabled={submitting}
              onClick={deleteComponent}
            >
              {Dictionary.remove}
            </button>
          ) : (
            false
          )}
          {componentType === FILTER && componentId ? (
            <button
              className={DELETE}
              disabled={submitting}
              onClick={() => deleteComponent(componentId)}
            >
              {Dictionary.remove}
            </button>
          ) : (
            false
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
              updateComponent={props.updateComponent}
              initialMemberFilter={props.InitialMember}
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
const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    InitialMember: selector(state, 'initialMember'),
    filterImbriquer: selector(state, 'filterImbriquer'),
  };
};
export default connect(mapStateToProps)(ComponentNewEdit);
