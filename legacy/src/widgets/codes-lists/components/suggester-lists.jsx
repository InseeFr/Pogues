import React, { useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import { AuthContext } from '@/auth/context';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import GenericOption from '../../../forms/controls/generic-option';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';
import { ErrorsPanel } from '../../errors-panel';

const { COMPONENT_CLASS } = WIDGET_CODES_LISTS;

export const NOMENCLATURE_FIELDS = [
  'id',
  'label',
  'suggesterParameters',
  'urn',
  'version',
  'theme',
  'referenceYear',
];

export const clearFormFields = (change, formName, path) => {
  NOMENCLATURE_FIELDS.forEach((field) => {
    // keep id and label empty string for default value
    if (['id', 'label'].includes(field)) {
      change(formName, `${path}${field}`, '');
    } else {
      change(formName, `${path}${field}`, undefined);
    }
  });
};

export const updateFormFields = (change, formName, path, nomenclature) => {
  NOMENCLATURE_FIELDS.forEach((field) => {
    change(formName, `${path}${field}`, nomenclature[field]);
  });
};

export function SuggesterLists({
  change,
  selectorPathParent,
  formName,
  path,
  loadNomenclaturesIfNeeded,
  nomenclatures,
  selectorPath,
  currentId,
}) {
  const [currentIdState, setCurrentIdState] = useState(currentId);

  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      const accessToken = await getAccessToken();
      loadNomenclaturesIfNeeded(accessToken);
    };
    load();
  }, [getAccessToken, loadNomenclaturesIfNeeded]);

  useEffect(() => {
    // Selected value change
    if (currentIdState !== currentId) {
      // empty the selected value -> clear form
      if (currentId === '') {
        clearFormFields(change, formName, path);
        // else: user choose a new value
      } else if (nomenclatures[currentId]) {
        updateFormFields(change, formName, path, nomenclatures[currentId]);
      }
      setCurrentIdState(currentId);
    }
  }, [currentId, change, currentIdState, formName, path, nomenclatures]);

  return (
    <FormSection name={selectorPath} className={COMPONENT_CLASS}>
      <Field
        name="id"
        component={Select}
        label={Dictionary.selectNomenclature}
        required
      >
        <GenericOption key="noNomenclature" value="">
          {Dictionary.selectNomenclature}
        </GenericOption>
        {Object.values(nomenclatures).map((nomenclature) => (
          <GenericOption key={nomenclature.id} value={nomenclature.id}>
            {nomenclature.label}
          </GenericOption>
        ))}
      </Field>
      <ErrorsPanel path={`${selectorPathParent}.${selectorPath}`} />
    </FormSection>
  );
}

SuggesterLists.propTypes = {
  change: PropTypes.func.isRequired,
  selectorPathParent: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  loadNomenclaturesIfNeeded: PropTypes.func.isRequired,
  nomenclatures: PropTypes.object,
  selectorPath: PropTypes.string.isRequired,
  currentId: PropTypes.string,
};

SuggesterLists.defaultProps = {
  currentId: '',
  nomenclatures: {},
};
