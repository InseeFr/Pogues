import { useCallback, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import GenericOption from '../../../forms/controls/generic-option';
import ListRadios from '../../../forms/controls/list-radios';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';
import { storeToArray } from '../../../utils/utils';
import { ErrorsPanel } from '../../errors-panel';
import CodesListsCodesContainer from '../containers/codes-lists-codes-container';
import { Precision } from './precision';

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
  codeValues: PropTypes.arrayOf(PropTypes.string),
  isPrecision: PropTypes.bool,
  clearSearchResult: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  arrayRemoveAll: PropTypes.func.isRequired,
  allowPrecision: PropTypes.bool,
  allowFilter: PropTypes.bool,
  precision: PropTypes.object,
  precisionLabel: PropTypes.string,
};

export const defaultProps = {
  currentId: '',
  codesListsStore: {},
  currentCodesListsStore: {},
  allowPrecision: false,
  allowFilter: false,
  codeValues: [],
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
  codeValues,
  clearSearchResult,
  change,
  arrayRemoveAll,
  allowPrecision = false,
  allowFilter = false,
  isPrecision,
  precision,
}) => {
  const refDiv = useRef(null);
  const [currentIdState, setCurrentIdState] = useState(currentId);

  useEffect(() => {
    clearSearchResult();
  }, [clearSearchResult]);

  const resetPrecision = useCallback(() => {
    change(formName, `${path}isPrecision`, false);
    change(formName, `${path}precisionId`, '');
    change(formName, `${path}precisionLabel`, 'Préciser :');
    change(formName, `${path}precisionSize`, 249);
    change(formName, `${path}precisionCodeValue`, '');
  }, [change, formName, path]);

  useEffect(() => {
    /* Initialize precision form */
    if (precision && isPrecision === undefined) {
      change(formName, `${path}isPrecision`, true);
    }
    change(formName, `${path}precisionId`, precision?.precisionId);
    change(
      formName,
      `${path}precisionLabel`,
      precision?.precisionLabel ?? 'Préciser :',
    );
    change(formName, `${path}precisionSize`, precision?.precisionSize ?? 249);
    change(formName, `${path}precisionCodeValue`, precision?.codeValue);
  }, [isPrecision, precision, change, formName, path]);

  useEffect(() => {
    /* Unselect codes list */
    if (currentIdState !== currentId && currentId === '') {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      change(formName, 'codeFilters', []);
      resetPrecision();
      arrayRemoveAll(formName, `${path}codes`);
      setCurrentIdState(currentId);
    }
  }, [
    currentId,
    arrayRemoveAll,
    change,
    currentIdState,
    formName,
    path,
    resetPrecision,
  ]);

  useEffect(() => {
    /* Select codes list */
    if (
      currentIdState !== currentId &&
      currentId !== '' &&
      codesListsStore[currentId]
    ) {
      const codesStore = codesListsStore[currentId].codes;
      // Update label and codes
      change(formName, `${path}label`, codesListsStore[currentId].label);
      change(
        formName,
        `${path}codes`,
        Object.keys(codesStore).map((key) => codesStore[key]),
      );

      // Reset codes filters
      change(formName, 'codeFilters', []);

      // Reset precision fields
      resetPrecision();

      setCurrentIdState(currentId);
    }
  }, [
    currentId,
    change,
    codesListsStore,
    currentIdState,
    formName,
    path,
    resetPrecision,
  ]);

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
            selectorPath={path}
            formName={formName}
            allowPrecision={allowPrecision}
            allowFilter={allowFilter}
          />
        </div>
      </div>

      {/* Precision selection */}
      <Field
        name="isPrecision"
        component={ListRadios}
        label={Dictionary.addCodePrecision}
        required
        // Convert string "true"/"false" to boolean true/false when storing in Redux form
        parse={(value) => value === 'true'}
        // Convert true/false/undefined to string "true"/"false" when displaying the form
        format={(value) => (value === true ? 'true' : 'false')}
      >
        <GenericOption value="true">{Dictionary.yes}</GenericOption>
        <GenericOption value="false">{Dictionary.no}</GenericOption>
      </Field>
      {isPrecision && <Precision codeValues={codeValues} />}
    </FormSection>
  );
};

CodesLists.propTypes = propTypes;

export default CodesLists;
