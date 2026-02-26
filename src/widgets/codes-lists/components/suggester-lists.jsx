import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

import { WIDGET_CODES_LISTS } from '../../../constants/dom-constants';
import GenericOption from '../../../forms/controls/generic-option';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';
import { useOidc } from '../../../utils/oidc';
import { ErrorsPanel } from '../../errors-panel';

const { COMPONENT_CLASS } = WIDGET_CODES_LISTS;

export function SuggesterLists({
  change,
  selectorPathParent,
  formName,
  path,
  loadNomenclaturesIfNeeded,
  loadNomenclature,
  nomenclatures,
  selectorPath,
  currentId,
  codesListsStore,
}) {
  const [currentIdState, setCurrentIdState] = useState(currentId);

  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;

  useEffect(() => {
    loadNomenclaturesIfNeeded(token);
  }, [token, loadNomenclaturesIfNeeded]);

  useEffect(() => {
    if (currentIdState !== currentId && currentId === '') {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      setCurrentIdState(currentId);
    }

    if (
      currentIdState !== currentId &&
      currentId !== '' &&
      codesListsStore[currentId]?.suggesterParameters
    ) {
      change(formName, `${path}label`, codesListsStore[currentId].label);
      change(
        formName,
        `${path}suggesterParameters`,
        codesListsStore[currentId].suggesterParameters,
      );
      change(formName, `${path}name`, codesListsStore[currentId].name);
      change(formName, `${path}urn`, codesListsStore[currentId].urn);
      setCurrentIdState(currentId);
    }

    if (
      currentIdState !== currentId &&
      currentId !== '' &&
      !codesListsStore[currentId]?.suggesterParameters &&
      nomenclatures[currentId].codes
    ) {
      change(formName, `${path}label`, nomenclatures[currentId].label);
      change(
        formName,
        `${path}suggesterParameters`,
        nomenclatures[currentId].suggesterParameters,
      );
      change(formName, `${path}name`, nomenclatures[currentId].name);
      change(formName, `${path}urn`, nomenclatures[currentId].urn);
      setCurrentIdState(currentId);
    }

    if (
      currentIdState !== currentId &&
      currentId !== '' &&
      !codesListsStore[currentId] &&
      !nomenclatures[currentId].codes
    )
      loadNomenclature(token, currentId, nomenclatures);
  }, [
    currentId,
    change,
    currentIdState,
    formName,
    path,
    nomenclatures,
    loadNomenclature,
    token,
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
  loadNomenclature: PropTypes.func.isRequired,
  nomenclatures: PropTypes.object,
  selectorPath: PropTypes.string.isRequired,
  currentId: PropTypes.string,
};

SuggesterLists.defaultProps = {
  currentId: '',
  codesListsStore: {},
  nomenclatures: {},
};
