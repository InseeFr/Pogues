import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection } from 'redux-form';

import CodesListsCodesContainer from '../containers/codes-lists-codes-container';

import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import {
  CODES_LIST_INPUT_ENUM,
  CODES_LISTS_PANELS,
  CODES_LISTS_PANELS_SEARCH_DISABLE,
} from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';
import ListRadios from 'forms/controls/list-radios';
import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';
import { storeToArray, uuid } from 'utils/utils';
import { InputWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';

import { SearchCodesLists } from 'widgets/search-codes-lists';
import { ErrorsPanel } from 'widgets/errors-panel';

const { COMPONENT_CLASS, PANEL_CLASS, PANEL_SELECTOR_CLASS } =
  WIDGET_CODES_LISTS;
const { NEW, REF, QUEST } = CODES_LIST_INPUT_ENUM;

// Utils

function getSelectorOptions(panels) {
  return panels.map(p => ({
    label: Dictionary[p.dictionary],
    value: p.value,
  }));
}

// PropTypes and defaultProps

export const propTypes = {
  selectorPath: PropTypes.string.isRequired,
  selectorPathParent: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  currentId: PropTypes.string,
  currentCodesListsStore: PropTypes.object,
  codesListsStore: PropTypes.object,
  isSearchDisable: PropTypes.bool.isRequired,
  activePanel: PropTypes.string,
  clearSearchResult: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  arrayRemoveAll: PropTypes.func.isRequired,
  allowPrecision: PropTypes.bool,
};

export const defaultProps = {
  activePanel: undefined,
  currentId: '',
  codesListsStore: {},
  currentCodesListsStore: {},
  allowPrecision: true,
};

const CodesLists = ({
  selectorPath,
  selectorPathParent,
  formName,
  path,
  currentId,
  currentCodesListsStore,
  codesListsStore,
  isSearchDisable,
  activePanel,
  clearSearchResult,
  change,
  arrayRemoveAll,
  allowPrecision,
}) => {
  const refDiv = useRef(null);
  const [currentIdState, setCurrentIdState] = useState(currentId);

  useEffect(() => {
    clearSearchResult();
  }, [clearSearchResult]);

  useEffect(() => {
    if (currentIdState !== currentId && currentId === '') {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      arrayRemoveAll(formName, `${path}codes`);
      setCurrentIdState(currentId);
    }

    if (
      currentIdState !== currentId &&
      currentId !== '' &&
      codesListsStore[currentId]
    ) {
      const codesStore = codesListsStore[currentId].codes;
      change(formName, `${path}label`, codesListsStore[currentId].label);
      change(
        formName,
        `${path}codes`,
        Object.keys(codesStore).map(key => codesStore[key]),
      );
      setCurrentIdState(currentId);
    }
  }, [
    currentId,
    arrayRemoveAll,
    change,
    codesListsStore,
    currentIdState,
    formName,
    path,
  ]);

  const handleCheck = () => {
    const id = uuid();
    if (currentId && codesListsStore[currentId]) {
      change(formName, `${path}label`, `${codesListsStore[currentId].label}_2`);
      change(formName, `${path}id`, id);
    }
  };

  return (
    <FormSection name={selectorPath} className={COMPONENT_CLASS}>
      {/* Selector panel */}
      <div className={PANEL_SELECTOR_CLASS}>
        <Field
          name="panel"
          component={ListRadios}
          label={Dictionary.selectCodesListType}
          required
        >
          {isSearchDisable
            ? getSelectorOptions(CODES_LISTS_PANELS_SEARCH_DISABLE).map(
                panel => (
                  <GenericOption key={panel.value} value={panel.value}>
                    {panel.label}
                  </GenericOption>
                ),
              )
            : getSelectorOptions(CODES_LISTS_PANELS).map(panel => (
                <GenericOption key={panel.value} value={panel.value}>
                  {panel.label}
                </GenericOption>
              ))}
        </Field>
      </div>

      {activePanel && (
        <div className={`${PANEL_CLASS} ${PANEL_CLASS}-${activePanel}`}>
          {activePanel === REF && <SearchCodesLists path={path} />}
          {activePanel === QUEST && (
            <Field
              name="id"
              component={Select}
              label={Dictionary.selectCodesListType}
              required
            >
              <GenericOption key="" value="">
                {Dictionary.selectCodesListType}
              </GenericOption>
              {storeToArray(currentCodesListsStore)
                .sort((cl1, cl2) => cl1.label.localeCompare(cl2.label))
                .filter(cl => cl.codes)
                .map(cl => (
                  <GenericOption key={cl.id} value={cl.id}>
                    {cl.label}
                  </GenericOption>
                ))}
            </Field>
          )}
          <div className="ctrl-checkbox" style={{ display: 'clock' }}>
            <label htmlFor="rf-single-duplicate">
              {Dictionary.duplicateCodeList}
            </label>
            <div>
              <input type="checkbox" onChange={() => handleCheck()} />
            </div>
          </div>
          {activePanel === NEW && (
            <div ref={refDiv}>
              <ErrorsPanel path={`${selectorPathParent}.${selectorPath}`} />
              <Field
                name="label"
                component={InputWithVariableAutoCompletion}
                type="text"
                label={Dictionary.newCl}
                focusOnInit
                required
                onEnter={e => {
                  e.preventDefault();
                  refDiv.querySelector('button').click();
                }}
              />
              <FieldArray
                name="codes"
                component={CodesListsCodesContainer}
                inputCodePath={`${path}input-code.`}
                formName={formName}
                allowPrecision={allowPrecision}
              />
            </div>
          )}
        </div>
      )}
    </FormSection>
  );
};

CodesLists.propTypes = propTypes;
CodesLists.defaultProps = defaultProps;

export default CodesLists;
