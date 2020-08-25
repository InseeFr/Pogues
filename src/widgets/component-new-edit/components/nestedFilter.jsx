import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedComponentId } from 'actions/app-state';
import { createComponent } from 'actions/components';
import { updateComponent, removeComponent } from 'actions/actionComponent';

import PropTypes from 'prop-types';
import {
  TABS_PATHS,
  DEFAULT_FORM_NAME,
  COMPONENT_TYPE,
} from 'constants/pogues-constants';
import { WIDGET_COMPONENT_NEW_EDIT } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { uuid, nameFromLabel } from 'utils/utils';
import * as rules from 'forms/validation-rules';

const {
  COMPONENT_CLASS,
  CANCEL,
  VALIDATE,
  FOOTERLOOP,
  DELETE,
  FILTRE_IMBRIQUER,
} = WIDGET_COMPONENT_NEW_EDIT;
const { LOOP, NYSTEDFILTRE } = COMPONENT_TYPE;

// Prop types and default props

export const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  errors: PropTypes.array,
  addErrors: PropTypes.func.isRequired,
  componentsStore: PropTypes.object.isRequired,
  removeComponent: PropTypes.func.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.CALCULATED_VARIABLES,
  errors: [],
};
const NestedFilter = props => {
  const {
    componentsStore,
    handleSubmitImbriquer,
    handleDeleteNestedFilter,
    componentType,
    filterId,
    removeComponent,
  } = props;
  const [showNewNestedFilter, setShowNewNestedFilter] = useState(false);
  const [error, setError] = useState({
    name: false,
    initialMember: false,
    finalMember: false,
    nameValid: '',
  });
  const [indexImbriquer, setIndexImbriquer] = useState(null);
  const [newNestedFilter, setNewNestedFilter] = useState({
    typeFilter: '',
    name: '',
    descriptionImbriquer: '',
    conditionImbriquer: '',
    initialMember: '',
    finalMember: '',
    filterImbriquer: [],
    type: '',
    id: '',
    TargetMode: [],
  });

  useEffect(() => {
    if (filterId !== null && filterId !== undefined) {
      setNewNestedFilter(componentsStore[filterId]);
    }
  }, [filterId]);

  const handleSubmitImbriquer1 = value => {
    const filters = newNestedFilter.filterImbriquer
      ? newNestedFilter.filterImbriquer
      : [];
    filters.push(value);
    setNewNestedFilter({ ...newNestedFilter, filterImbriquer: filters });

    handleCloseNestedFilter();
  };

  const handleChange = e => {
    setNewNestedFilter({
      ...newNestedFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseNestedFilter = () => {
    setShowNewNestedFilter(false);
    setIndexImbriquer(null);
  };

  const handleOpenNestedFilter = index => {
    if (index !== null || index !== undefined) {
      setIndexImbriquer(index);
    }
    setShowNewNestedFilter(true);
  };

  const handleDeleteNested = index => {
    const filters = [...newNestedFilter.filterImbriquer];
    filters.splice(index, 1);
    setNewNestedFilter({ ...newNestedFilter, filterImbriquer: filters });
    setIndexImbriquer(null);
    handleCloseNestedFilter();
  };

  const handleSubmit = () => {
    if (
      !newNestedFilter.name ||
      !newNestedFilter.initialMember ||
      !newNestedFilter.finalMember ||
      rules.name(newNestedFilter.name)
    ) {
      setError({
        ...error,
        name: !newNestedFilter.name,
        initialMember: !newNestedFilter.initialMember,
        finalMember: !newNestedFilter.finalMember,
        nameValid: rules.name(newNestedFilter.name),
      });
    } else {
      if (filterId === null || filterId === undefined) {
        newNestedFilter.type = componentType;
        newNestedFilter.TargetMode = [''];
        newNestedFilter.id = uuid();
        props.createComponent(newNestedFilter).then(result => {
          const {
            payload: { id },
          } = result;
          handleSubmitImbriquer(id);
        });
      } else {
        const conponentUpdated = {};
        conponentUpdated[filterId] = newNestedFilter;
        const updatedCalculatedVariablesStore = {};
        const updatedExternalVariablesStore = {};
        const updatedCollectedlVariablesStore = {};
        const updatedCodesListsStore = {};
        updateComponent(
          filterId,
          conponentUpdated,
          updatedCalculatedVariablesStore,
          updatedExternalVariablesStore,
          updatedCollectedlVariablesStore,
          updatedCodesListsStore,
        );
      }
    }
  };

  const handleDeleteComponent = () => {
    props.removeComponent(filterId);
    handleDeleteNestedFilter(filterId);
  };

  const showFiltersImbriquer = myfilters => {
    return myfilters && myfilters.length !== 0
      ? myfilters.map(filter => {
          return (
            <button
              className={FILTRE_IMBRIQUER}
              onClick={() => handleOpenNestedFilter(filter)}
            >
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
              {componentsStore[filter].name}
            </button>
          );
        })
      : false;
  };

  const supImbriquer = (store, initial) => {
    let superieur = initial.weight;
    if (
      newNestedFilter.filterImbriquer &&
      newNestedFilter.filterImbriquer.length > 0
    ) {
      newNestedFilter.filterImbriquer.forEach(element => {
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
    const filters = newNestedFilter.filterImbriquer.filter(
      nested =>
        store[nested.initialMember].weight < initial.weight &&
        store[nested.finalMember].weight > initial.weight,
    );
    const inferieurComponent = filters.reduce(
      (min, p) =>
        store[p.initialMember].weight > store[min.initialMember].weight
          ? p
          : min,
      filters[0],
    );
    const inferieur = inferieurComponent
      ? store[inferieurComponent.finalMember].weight
      : undefined;
    return inferieur;
  };

  const getFinalOptions = store => {
    let optionsFinal = <option key="" value="" />;
    const componentinitial = Object.values(store).filter(
      component => component.id === newNestedFilter.initialMember,
    );
    if (newNestedFilter.initialMember && componentinitial.length > 0) {
      if (
        newNestedFilter.filterImbriquer > 0 &&
        infImbriquer(store, componentinitial[0])
      ) {
        optionsFinal = Object.values(store)
          .filter(
            component =>
              component.type === componentinitial[0].type &&
              component.weight >= supImbriquer(store, componentinitial[0]) &&
              component.weight <= infImbriquer(store, componentinitial[0]) &&
              component.parent === componentinitial[0].parent,
          )
          .map(element => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          });
      } else {
        optionsFinal = Object.values(store)
          .filter(
            component =>
              component.type === componentinitial[0].type &&
              component.weight >= supImbriquer(store, componentinitial[0]) &&
              component.parent === componentinitial[0].parent,
          )
          .map(element => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          });
      }
      return optionsFinal;
    }
  };
  const optionsInitial = () => {
    let options = <option key="" value="" />;
    options = Object.values(componentsStore)
      .filter(component => component.type !== LOOP)
      .map(element => {
        return (
          <option key={element.id} value={element.id}>
            {element.name}
          </option>
        );
      });
    return options;
  };

  return (
    <div className={COMPONENT_CLASS}>
      <div className="ctrl-list-radios">
        <label>
          {Dictionary.TYPEFILTER}
          <span className="ctrl-required">*</span>
        </label>
        <div>
          <label
            htmlFor="input-nestedFilter.typeFilter"
            className="radio-inline"
          >
            <input
              type="radio"
              name="typeFilter"
              value="new"
              onChange={e => handleChange(e)}
              checked={
                newNestedFilter && newNestedFilter.typeFilter
                  ? newNestedFilter.typeFilter === 'new'
                  : false
              }
            />
            {Dictionary.NEW}
          </label>
          <label
            htmlFor="input-nestedFilter.typeFilter"
            className="radio-inline"
          >
            <input
              type="radio"
              name="typeFilter"
              value="exist"
              onChange={e => handleChange(e)}
              checked={
                newNestedFilter && newNestedFilter.typeFilter
                  ? newNestedFilter.typeFilter === 'exist'
                  : false
              }
            />
            {Dictionary.EXISTING}
          </label>
        </div>
      </div>
      <div className="ctrl-input ">
        <label htmlFor="input-nestedFilter.name">{Dictionary.name}</label>
        <div>
          <input
            name="name"
            type="text"
            value={newNestedFilter.name}
            onChange={e => handleChange(e)}
            required
          />
          {error && error.name ? (
            <span className="form-error">{Dictionary.mandatory}</span>
          ) : error && error.nameValid ? (
            <span className="form-error">{error.nameValid}</span>
          ) : (
            false
          )}
        </div>
      </div>
      <div className="ctrl-input ">
        <label htmlFor="input-nestedFilter.description">
          {Dictionary.description}
        </label>
        <div>
          <input
            name="descriptionImbriquer"
            type="text"
            value={newNestedFilter.descriptionImbriquer}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
      <div className="ctrl-input ">
        <label htmlFor="input-nestedFilter.condition">
          {Dictionary.condition}
        </label>
        <div>
          <input
            name="conditionImbriquer"
            type="text"
            value={newNestedFilter.conditionImbriquer}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
      <div className="ctrl-select">
        <label htmlFor="input-nestedFilter.InitialMembre">
          {Dictionary.InitialMembre}
        </label>
        <div>
          <select
            value={newNestedFilter.initialMember}
            name="initialMember"
            onChange={e => handleChange(e)}
          >
            <option key="" value="">
              {Dictionary.selectInitialMembre}
            </option>
            {optionsInitial()}
          </select>
          {error && error.initialMember ? (
            <span className="form-error">{Dictionary.mandatory}</span>
          ) : (
            false
          )}
        </div>
      </div>
      {showFiltersImbriquer(newNestedFilter.filterImbriquer)}
      <span
        className={FILTRE_IMBRIQUER}
        onClick={() => handleOpenNestedFilter(null)}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        {Dictionary.filtreImbriquer}
      </span>
      <div className="ctrl-select">
        <label htmlFor="input-nestedFilter.FinalMembre">
          {Dictionary.FinalMembre}
        </label>
        <div>
          <select
            value={newNestedFilter.finalMember}
            name="finalMember"
            disabled={!newNestedFilter.initialMember}
            onChange={e => handleChange(e)}
          >
            <option key="" value="">
              {Dictionary.selectFinalMembre}
            </option>
            {getFinalOptions(componentsStore)}
          </select>
          {error && error.finalMember ? (
            <span className="form-error">{Dictionary.mandatory}</span>
          ) : (
            false
          )}
        </div>
      </div>
      <div className={FOOTERLOOP}>
        <button
          className={VALIDATE}
          type="submit"
          onClick={() => handleSubmit()}
        >
          {Dictionary.validate}
        </button>
        <button className={CANCEL} onClick={() => handleCloseNestedFilter()}>
          {Dictionary.cancel}
        </button>
        {filterId !== null ? (
          <button
            className={DELETE}
            // disabled={submitting}
            onClick={handleDeleteComponent}
          >
            {Dictionary.remove}
          </button>
        ) : (
          false
        )}
      </div>
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
              {indexImbriquer !== null
                ? Dictionary.editFiltreImbriquer
                : Dictionary.filtreImbriquer}
            </h3>
            <button type="button" onClick={handleCloseNestedFilter}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <NestedFilter
              filterId={indexImbriquer}
              componentsStore={componentsStore}
              createComponent={props.createComponent}
              setSelectedComponentId={props.setSelectedComponentId}
              handleSubmitImbriquer={(value, index) =>
                handleSubmitImbriquer1(value, index)
              }
              handleCloseNestedFilter={handleCloseNestedFilter}
              componentType={NYSTEDFILTRE}
              handleDeleteNestedFilter={handleDeleteNested}
            />
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

NestedFilter.propTypes = propTypes;
NestedFilter.defaultProps = defaultProps;
const mapStateToProps = state => {};
const mapDispatchToProps = {
  removeComponent,
  createComponent,
  setSelectedComponentId,
  updateComponent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NestedFilter);
