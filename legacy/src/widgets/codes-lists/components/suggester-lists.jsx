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

export function SuggesterLists({
  change,
  selectorPathParent,
  formName,
  path,
  loadNomenclaturesIfNeeded,
  nomenclatures,
  selectorPath,
  currentId,
  codesListsStore,
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
    // cas of empty -> new question for ex
    if (currentIdState !== currentId && currentId === '') {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      setCurrentIdState(currentId);
    }

    // Update id (selected by user) -> update value
    if (currentIdState !== currentId && currentId !== '') {
      change(formName, `${path}label`, nomenclatures[currentId].label);
      change(
        formName,
        `${path}suggesterParameters`,
        nomenclatures[currentId].suggesterParameters,
      );
      change(formName, `${path}urn`, nomenclatures[currentId].urn);
      change(formName, `${path}version`, nomenclatures[currentId].version);
      change(formName, `${path}theme`, nomenclatures[currentId].theme);
      change(
        formName,
        `${path}referenceYear`,
        nomenclatures[currentId].referenceYear,
      );
      setCurrentIdState(currentId);
    }
  }, [
    currentId,
    change,
    currentIdState,
    formName,
    path,
    nomenclatures,
    getAccessToken,
    codesListsStore,
  ]);

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
  codesListsStore: PropTypes.object,
  loadNomenclaturesIfNeeded: PropTypes.func.isRequired,
  nomenclatures: PropTypes.object,
  selectorPath: PropTypes.string.isRequired,
  currentId: PropTypes.string,
};

SuggesterLists.defaultProps = {
  currentId: '',
  codesListsStore: {},
  nomenclatures: {},
};
