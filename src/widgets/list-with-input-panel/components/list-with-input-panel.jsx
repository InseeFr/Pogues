import React, { Children, cloneElement, useEffect, useState } from 'react';

import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { FieldArray } from 'redux-form';

import {
  WIDGET_LIST_WITH_INPUT_PANEL,
  domSelectorForModal,
} from '../../../constants/dom-constants';
import { useReadonly } from '../../../hooks/useReadonly';
import Dictionary from '../../../utils/dictionary/dictionary';
import { getCurrentSelectorPath } from '../../../utils/widget-utils';
import { ErrorsPanel } from '../../errors-panel';
import ListWithInputPanelList from './list-with-input-panel-list';

const {
  WRAPPER_CLASS,
  COMPONENT_CLASS,
  PANEL_CLASS,
  LIST_CLASS,
  ACTIONS_CLASS,
  BUTTON_SUBMIT_CLASS,
  BUTTON_REMOVE_CLASS,
  BUTTON_DUPLICATE_CLASS,
  BUTTON_RESET_CLASS,
  BUTTON_NEW_CLASS,
} = WIDGET_LIST_WITH_INPUT_PANEL;

// Utils

function getFormValuesToValidate(formValues, item, selectorPath, name) {
  const formValuesToValidate = cloneDeep(formValues);
  let pointer = formValuesToValidate;
  const pathStack = selectorPath.split('.');

  while (pathStack.length > 1) {
    pointer = pointer[pathStack.shift()];
  }

  const deeperkey = pathStack.shift();

  pointer[deeperkey] = { ...item, [name]: pointer[deeperkey][name] };

  return formValuesToValidate;
}

// Component

const ListWithInputPanel = ({
  formValues,
  currentValues = {},
  arrayPush,
  arrayRemove,
  arrayInsert,
  formName,
  selectorPath,
  name,
  canAddNew,
  resetObject,
  change,
  errors,
  componentId,
  removeIntegrityError,
  children,
  canRemove,
  canDuplicate,
  validateForm,
  clearSubformValidationErrors,
  disableValidation,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(undefined);
  const [showPopup, setShowPopup] = useState(false);

  const isReadonly = useReadonly();

  useEffect(() => {
    // Generation items when another item is selected
    if (canAddNew && selectedItemIndex !== undefined) reset();
  }, [currentValues[name]]);

  useEffect(() => {
    if (selectedItemIndex !== undefined) {
      const path = getCurrentSelectorPath(selectorPath);
      const item = currentValues[name][selectedItemIndex];
      const formValuesToValidate = getFormValuesToValidate(
        formValues,
        item,
        selectorPath,
        name,
      );
      validate(formValuesToValidate);
      Object.keys(item).forEach((key) =>
        change(formName, `${path}${key}`, item[key]),
      );
    }
  }, [selectedItemIndex]);

  const handleClosePopup = () => setShowPopup(false);

  const validate = (values) => {
    clearAllErrors();
    return validateForm(values, { selectedItemIndex: selectedItemIndex });
  };

  const submit = () => {
    if (
      currentValues.SINGLE_CHOICE &&
      currentValues.SINGLE_CHOICE.CodesList &&
      currentValues.SINGLE_CHOICE.CodesList['input-code'] &&
      (currentValues.SINGLE_CHOICE.CodesList['input-code'].value ||
        currentValues.SINGLE_CHOICE.CodesList['input-code'].label)
    ) {
      setShowPopup(true);
    } else {
      // eslint-disable-next-line no-unused-vars
      const { [name]: items, ...values } = currentValues;
      const path = getCurrentSelectorPath(selectorPath);
      const canValidate = selectedItemIndex !== undefined || canAddNew;

      if (canValidate && validate(formValues)) {
        if (selectedItemIndex !== undefined) {
          arrayRemove(formName, `${path}${name}`, selectedItemIndex);
          arrayInsert(formName, `${path}${name}`, selectedItemIndex, values);
        } else if (canAddNew) {
          arrayPush(formName, `${path}${name}`, values);
        }
        removeErrorIntegrityIfExists(values);
        reset();
      }
    }
  };

  const remove = () => {
    const { [name]: items } = currentValues;
    const path = getCurrentSelectorPath(selectorPath);
    removeErrorIntegrityIfExists(items[selectedItemIndex]);
    arrayRemove(formName, `${path}${name}`, selectedItemIndex);
    reset();
  };

  const duplicate = () => {
    // eslint-disable-next-line no-unused-vars
    const { [name]: items, ...values } = currentValues;
    values.id = null;
    const path = getCurrentSelectorPath(selectorPath);
    if (validate(formValues)) {
      arrayPush(formName, `${path}${name}`, values);
      reset();
    }
  };

  const reset = () => {
    const path = getCurrentSelectorPath(selectorPath);
    setSelectedItemIndex(undefined);
    clearAllErrors();
    Object.keys(resetObject).forEach((key) =>
      change(formName, `${path}${key}`, resetObject[key]),
    );
  };

  const select = (index) => setSelectedItemIndex(index);

  const clearAllErrors = () => clearSubformValidationErrors();

  const removeErrorIntegrityIfExists = (values) => {
    const error = errors.filter((e) => e.itemListId === values.id);
    if (error.length > 0) {
      removeIntegrityError(componentId, error[0].type, error[0].itemListId);
    }
  };

  const childrenWithDisabledProp = Children.map(children, (child) => {
    return child
      ? cloneElement(child, {
          ...child.props,
          disabled:
            child.props.disabled ||
            (!canAddNew && selectedItemIndex === undefined),
        })
      : child;
  }).filter((child) => child);

  return (
    <div className={COMPONENT_CLASS}>
      <ErrorsPanel path={selectorPath} includeSubPaths />
      <div className={WRAPPER_CLASS}>
        <div className={LIST_CLASS}>
          <FieldArray
            name={name}
            rerenderOnEveryChange
            component={ListWithInputPanelList}
            errors={errors}
            select={select}
          />
        </div>
        <div className={PANEL_CLASS}>
          <div className={ACTIONS_CLASS}>
            {canAddNew && (
              <button
                type="button"
                className={BUTTON_NEW_CLASS}
                onClick={(event) => {
                  if (event.target.className === BUTTON_NEW_CLASS) {
                    event.preventDefault();
                    reset();
                  }
                }}
              >
                <span className="glyphicon glyphicon-plus" aria-hidden="true" />
                {Dictionary.reset}
              </button>
            )}
          </div>
          {childrenWithDisabledProp}
          <div className={ACTIONS_CLASS}>
            <button
              type="button"
              className={BUTTON_RESET_CLASS}
              onClick={(event) => {
                event.preventDefault();
                reset();
              }}
            >
              {Dictionary.cancel}
            </button>
            <button
              type="submit"
              className={BUTTON_SUBMIT_CLASS}
              onClick={(event) => {
                event.preventDefault();
                submit();
              }}
              disabled={isReadonly || disableValidation}
            >
              {Dictionary.validate}
            </button>
            {canDuplicate && (
              <button
                type="button"
                disabled={selectedItemIndex === undefined}
                className={BUTTON_DUPLICATE_CLASS}
                onClick={(event) => {
                  event.preventDefault();
                  duplicate();
                }}
              >
                <span className="glyphicon glyphicon-file" aria-hidden="true" />
                {Dictionary.duplicate}
              </button>
            )}
            {canRemove && (
              <button
                type="button"
                disabled={selectedItemIndex === undefined}
                className={BUTTON_REMOVE_CLASS}
                onClick={(event) => {
                  event.preventDefault();
                  remove();
                }}
              >
                <span
                  className="glyphicon glyphicon-trash"
                  aria-hidden="true"
                />
                {Dictionary.remove}
              </button>
            )}
          </div>
        </div>
      </div>
      <ReactModal
        parentSelector={domSelectorForModal}
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
          <div className="popup-body">{Dictionary.saveLower}</div>
        </div>
      </ReactModal>
    </div>
  );
};

// PropTypes and defaultProps

ListWithInputPanel.propTypes = {
  errors: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  formName: PropTypes.string.isRequired,
  selectorPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  canAddNew: PropTypes.bool,
  canRemove: PropTypes.bool,
  canDuplicate: PropTypes.bool,
  formValues: PropTypes.object.isRequired,
  currentValues: PropTypes.object.isRequired,
  resetObject: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  arrayRemove: PropTypes.func.isRequired,
  arrayPush: PropTypes.func.isRequired,
  arrayInsert: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  clearSubformValidationErrors: PropTypes.func.isRequired,
  removeIntegrityError: PropTypes.func.isRequired,
  disableValidation: PropTypes.bool,
};

ListWithInputPanel.defaultProps = {
  errors: [],
  canAddNew: true,
  canRemove: true,
  canDuplicate: true,
  componentsStore: {},
  disableValidation: false,
};

export default ListWithInputPanel;
