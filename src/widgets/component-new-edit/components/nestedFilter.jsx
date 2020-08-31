import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedComponentId } from 'actions/app-state';
import { createComponent } from 'actions/components';

import PropTypes from 'prop-types';
import { DEFAULT_FORM_NAME, COMPONENT_TYPE } from 'constants/pogues-constants';
import { WIDGET_COMPONENT_NEW_EDIT } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { uuid } from 'utils/utils';
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
  componentsStore: PropTypes.object.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
};
const NestedFilter = props => {
  const {
    componentsStore,
    handleSubmitImbriquer,
    handleDeleteNestedFilter,
    componentType,
    filterId,
    removeComponent,
    updateComponent,
  } = props;
  const [showNewNestedFilter, setShowNewNestedFilter] = useState(false);
  const [error, setError] = useState({
    name: false,
    initialMember: false,
    finalMember: false,
    nameValid: '',
  });
  const [indexImbriquer, setIndexImbriquer] = useState('');
  const [newNestedFilter, setNewNestedFilter] = useState({
    typeFilter: 'new',
    name: '',
    description: '',
    filter: '',
    initialMember: '',
    finalMember: '',
    filterImbriquer: [],
    type: '',
    id: '',
    TargetMode: [],
  });

  const [nestedSelectedFilter, setNestedSelectedFilter] = useState('');

  useEffect(() => {
    if (filterId) {
      setNewNestedFilter(componentsStore[filterId]);
    }
  }, [filterId]);

  const handleSubmitImbriquer1 = value => {
    const filters = newNestedFilter.filterImbriquer
      ? newNestedFilter.filterImbriquer
      : [];
    if (!filters.includes(value) && value) {
      filters.push(value);
    }
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
    setIndexImbriquer('');
  };

  const handleOpenNestedFilter = (e, index) => {
    e.preventDefault();
    if (index) {
      setIndexImbriquer(index);
    }
    setShowNewNestedFilter(true);
  };

  const handleDeleteNested = index => {
    let filters = [...newNestedFilter.filterImbriquer];
    filters = filters.filter(filt => filt !== index);
    setNewNestedFilter({ ...newNestedFilter, filterImbriquer: filters });
    setIndexImbriquer('');
    handleCloseNestedFilter();
  };

  const handleSubmit = () => {
    if (newNestedFilter.typeFilter === 'new') {
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
      } else if (!filterId) {
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
        updateComponent(filterId, conponentUpdated);
        handleSubmitImbriquer();
      }
    } else if (!nestedSelectedFilter) {
      setError({
        ...error,
        selectFilter: !nestedSelectedFilter,
      });
    } else {
      handleSubmitImbriquer(nestedSelectedFilter);
    }
  };

  const handleDeleteComponent = () => {
    removeComponent(filterId);
    handleDeleteNestedFilter(filterId);
  };

  const showFiltersImbriquer = myfilters => {
    return myfilters && myfilters.length !== 0
      ? myfilters.map(filter => {
          return (
            <button
              className={FILTRE_IMBRIQUER}
              onClick={e => handleOpenNestedFilter(e, filter)}
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

  const getNestedFilters = () => {
    const options = Object.values(componentsStore)
      .filter(component => component.type === NYSTEDFILTRE)
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
      {newNestedFilter && newNestedFilter.typeFilter === 'exist' ? (
        <div className="ctrl-select">
          <label htmlFor="input-selectNestedFilter">
            {Dictionary.selectNestedFilter}
          </label>
          <div>
            <select
              value={nestedSelectedFilter}
              name="nestedSelectedFilter"
              onChange={e => setNestedSelectedFilter(e.target.value)}
            >
              <option key="" value="">
                {Dictionary.selectNestedFilter}
              </option>
              {getNestedFilters()}
            </select>
            {error && error.selectFilter ? (
              <span className="form-error">{Dictionary.mandatory}</span>
            ) : (
              false
            )}
          </div>
        </div>
      ) : (
        <div>
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
                name="description"
                type="text"
                value={newNestedFilter.description}
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
                name="filter"
                type="text"
                value={newNestedFilter.filter}
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
          <button
            className={FILTRE_IMBRIQUER}
            onClick={e => handleOpenNestedFilter(e)}
          >
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            {Dictionary.filtreImbriquer}
          </button>
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
        </div>
      )}

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
        {filterId ? (
          <button className={DELETE} onClick={handleDeleteComponent}>
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
              {indexImbriquer
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
              removeComponent={removeComponent}
              updateComponent={updateComponent}
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
  createComponent,
  setSelectedComponentId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NestedFilter);
