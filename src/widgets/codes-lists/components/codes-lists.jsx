import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import GenericOption from '../../../forms/controls/generic-option';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';
import { storeToArray } from '../../../utils/utils';
import { ErrorsPanel } from '../../errors-panel';
import CodesListsCodesContainer from '../containers/codes-lists-codes-container';

const { COMPONENT_CLASS, PANEL_CLASS, PANEL_SELECTOR_CLASS } =
  WIDGET_CODES_LISTS;

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
  clearSearchResult: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  arrayRemoveAll: PropTypes.func.isRequired,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
};

export const defaultProps = {
  currentId: '',
  codesListsStore: {},
  currentCodesListsStore: {},
  allowPrecision: false,
  allowFilter: false,
};

/**
 * Allow to select a code list and display the related code list informations
 * (including precision and/or filter if `allowPrecision` and/or `allowFilter`
 * is `true`).
 */
const CodesLists = ({
  selectorPath,
  selectorPathParent,
  formName,
  path,
  currentId = '',
  currentCodesListsStore = {},
  codesListsStore = {},
  clearSearchResult,
  change,
  arrayRemoveAll,
  allowPrecision = false,
  allowFilter = false,
}) => {
  const refDiv = useRef(null);
  const [currentIdState, setCurrentIdState] = useState(currentId);

  useEffect(() => {
    clearSearchResult();
  }, [clearSearchResult]);

  useEffect(() => {
    /* Unselect codes list */
    if (currentIdState !== currentId && currentId === '') {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      change(formName, 'codeFilters', []);
      arrayRemoveAll(formName, `${path}codes`);
      setCurrentIdState(currentId);
    }
  }, [currentId, arrayRemoveAll, change, currentIdState, formName, path]);

  useEffect(() => {
    /* Select codes list */
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
        Object.keys(codesStore).map((key) => codesStore[key]),
      );
      change(formName, 'codeFilters', []);
      setCurrentIdState(currentId);
    }
  }, [currentId, change, codesListsStore, currentIdState, formName, path]);

  return (
    <FormSection name={selectorPath} className={COMPONENT_CLASS}>
      <div className={PANEL_SELECTOR_CLASS} />

      <div className={`${PANEL_CLASS} ${PANEL_CLASS}-QUEST`}>
        {/* Codes list selection */}
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
            .filter((cl) => cl.codes)
            .map((cl) => (
              <GenericOption key={cl.id} value={cl.id}>
                {cl.label}
              </GenericOption>
            ))}
        </Field>

        {/* Codes list display */}
        <div ref={refDiv}>
          <ErrorsPanel path={`${selectorPathParent}.${selectorPath}`} />
          <FieldArray
            name="codes"
            component={CodesListsCodesContainer}
            inputCodePath={`${path}input-code.`}
            formName={formName}
            allowPrecision={allowPrecision}
            allowFilter={allowFilter}
          />
        </div>
      </div>
    </FormSection>
  );
};

CodesLists.propTypes = propTypes;

export default CodesLists;
