import React, { useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, FormSection, Field } from 'redux-form';
import ReactModal from 'react-modal';

import PropTypes from 'prop-types';
import {
  TABS_PATHS,
  DEFAULT_FORM_NAME,
  COMPONENT_TYPE,
} from 'constants/pogues-constants';
import { WIDGET_COMPONENT_NEW_EDIT } from 'constants/dom-constants';

import Input from 'forms/controls/input';
import Dictionary from 'utils/dictionary/dictionary';

import GenericOption from 'forms/controls/generic-option';
import Select from 'forms/controls/select';

const { FILTRE_IMBRIQUER } = WIDGET_COMPONENT_NEW_EDIT;
const { FILTRE } = COMPONENT_TYPE;

// Prop types and default props

export const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  errors: PropTypes.array,
  addErrors: PropTypes.func.isRequired,
  componentsStore: PropTypes.object.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.CALCULATED_VARIABLES,
  errors: [],
};
const FilterNested = props => {
  const { selectorPath, componentsStore, editingComponentId } = props;

  const [showNewNestedFilter, setShowNewNestedFilter] = useState(false);

  const handleCloseNestedFilter = () => {
    setShowNewNestedFilter(false);
  };
  const handleOpenNestedFilter = () => {
    setShowNewNestedFilter(true);
  };

  const getFinalOptions = store => {
    let optionsFinal = <GenericOption key="" value="" />;
    const componentinitial = Object.values(store).filter(
      component => component.id === props.InitialMember,
    );
    if (props.InitialMember && componentinitial.length > 0) {
      optionsFinal = Object.values(store)
        .filter(
          component =>
            component.type === componentinitial[0].type &&
            component.weight >= componentinitial[0].weight &&
            component.parent === componentinitial[0].parent,
        )
        .map(element => {
          return (
            <GenericOption key={element.id} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    }
    return optionsFinal;
  };

  const optionsInitial = type => {
    let options = <GenericOption key="" value="" />;
    if (type === FILTRE) {
      options = Object.values(componentsStore).map(element => {
        return (
          <GenericOption key={element.id} value={element.id}>
            {element.name}
          </GenericOption>
        );
      });
    }
    return options;
  };
  console.log('componentsStore', componentsStore);
  console.log('editingComponentId', editingComponentId);

  return (
    <div>
      <h1>test</h1>
      <FormSection name={selectorPath}>
        <Field
          name="name"
          type="text"
          component={Input}
          label={Dictionary.name}
          required
        />
        <Field
          name="description"
          type="text"
          component={Input}
          label={Dictionary.description}
        />
        <Field
          name="condition"
          type="text"
          component={Input}
          label={Dictionary.condition}
        />
        {componentsStore ? (
          <Field
            name="initialMember"
            component={Select}
            label={Dictionary.InitialMembre}
          >
            <GenericOption key="" value="">
              {Dictionary.selectInitialMembre}
            </GenericOption>
            {optionsInitial(FILTRE)}
          </Field>
        ) : (
          false
        )}
        <button className={FILTRE_IMBRIQUER} onClick={handleOpenNestedFilter}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          {Dictionary.filtreImbriquer}
        </button>

        {componentsStore ? (
          <Field
            name="finalMember"
            component={Select}
            label={Dictionary.FinalMembre}
            disabled={!props.InitialMember}
          >
            <GenericOption key="" value="">
              {Dictionary.selectFinalMembre}
            </GenericOption>
            {getFinalOptions(componentsStore)}
          </Field>
        ) : (
          false
        )}
        {/* </ListWithInputPanel> */}
      </FormSection>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showNewNestedFilter}
        onRequestClose={handleCloseNestedFilter}
        contentLabel="FILTRE IMBRIQUE"
      >
        <div className="popup">
          <div className="popup-header">
            <h3>FILTRE IMBRIQUE</h3>
            <button type="button" onClick={handleCloseNestedFilter}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <FilterNested componentsStore={componentsStore} />
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

FilterNested.propTypes = propTypes;
FilterNested.defaultProps = defaultProps;

const mapStateToProps = state => {
  const selector = formValueSelector('component');
  return {
    InitialMember: selector(state, 'initialMember'),
  };
};

export default connect(mapStateToProps)(FilterNested);
